// src/context/PokemonProvider.tsx
import { useEffect, useReducer } from "react";
import { PokemonContext } from "./PokemonContext";
import { pokemonReducer, initialPokemonState } from "./pokemonReducer";

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

  async function gainXp(name: string, xp: number) {
    const pokemon = state.myPokemons.find((p) => p.name === name);
    if (!pokemon) return;

    const previousLevel = pokemon.level;

    dispatch({ type: "GAIN_XP", payload: { name, xp } });

    const newXp = Math.min(pokemon.xp + xp, 100);
    const newLevel = Math.floor(newXp / 10);

    // Evolui a cada 3 levels
    if (newLevel > previousLevel && newLevel % 3 === 0) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`,
      );
      const data = await response.json();

      const evolvesTo = data.evolution_chain?.url;

      if (!evolvesTo) return;

      const chainResponse = await fetch(evolvesTo);
      const chainData = await chainResponse.json();

      const nextEvolution = chainData.chain.evolves_to?.[0]?.species?.name;

      if (nextEvolution) {
        dispatch({
          type: "EVOLVE_POKEMON",
          payload: { name, newName: nextEvolution },
        });
      }
    }
  }

  function gainPokeball(gain: number) {
    dispatch({ type: "GAIN_POKEBALL", payload: { gain } });
  }

  function usePokeball(lose: number) {
    dispatch({ type: "USE_POKEBALL", payload: { lose } });
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
        resetGame,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
