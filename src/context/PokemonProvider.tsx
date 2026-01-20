import { useEffect, useReducer } from "react";
import { PokemonContext } from "./PokemonContext";
import { pokemonReducer, initialPokemonState } from "./pokemonReducer";
import type { DayOfMonth, Month } from "./pokemonTypes";

const STORAGE_KEY = "pokemon_game";

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialPokemonState;
}

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(pokemonReducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function capturePokemon(name: string, type: string) {
    dispatch({ type: "CAPTURE_POKEMON", payload: { name, type } });
  }

  function findNextEvolution(chain: any, currentName: string): string | null {
    if (chain.species.name === currentName) {
      return chain.evolves_to?.[0]?.species?.name ?? null;
    }

    for (const evo of chain.evolves_to ?? []) {
      const result = findNextEvolution(evo, currentName);
      if (result) return result;
    }

    return null;
  }

  async function gainXp(name: string, xp: number): Promise<boolean> {
    const pokemon = state.myPokemons.find((p) => p.name === name);

    if (!pokemon) return false;

    const previousLevel = pokemon.level;

    dispatch({ type: "GAIN_XP", payload: { name, xp } });

    const newXp = Math.min(pokemon!.xp + xp, 100);
    const newLevel = Math.floor(newXp / 10);

    // Evolui a cada 3 levels
    if (newLevel > previousLevel && newLevel % 3 === 0) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon!.name}`,
      );
      const data = await response.json();

      const evolvesTo = data.evolution_chain?.url;

      if (!evolvesTo) return false;

      const chainResponse = await fetch(evolvesTo);
      const chainData = await chainResponse.json();

      const nextEvolution = findNextEvolution(chainData.chain, pokemon!.name);

      if (!nextEvolution) return false;

      dispatch({
        type: "EVOLVE_POKEMON",
        payload: { name, newName: nextEvolution },
      });

      return true;
    }

    return false;
  }

  function gainPokeball(gain: number) {
    dispatch({ type: "GAIN_POKEBALL", payload: { gain } });
  }

  function usePokeball(lose: number) {
    dispatch({ type: "USE_POKEBALL", payload: { lose } });
  }

  function registerMission() {
    const now = new Date();

    const currYear = now.getFullYear();
    const currMonth = now.getMonth() as Month; 
    const currDay = now.getDate() as DayOfMonth; 

    dispatch({
      type: "REGISTER_MISSION",
      payload: {
        year: currYear,
        month: currMonth,
        day: currDay,
      },
    });
  }

  function resetGame() {
    dispatch({ type: "RESET_GAME" });
  }

  return (
    <PokemonContext.Provider
      value={{
        state,
        capturePokemon,
        gainXp,
        gainPokeball,
        usePokeball,
        registerMission,
        resetGame,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
