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

  async function gainHp(name: string, hp: number): Promise<boolean> {
    const pokemon = state.myPokemons.find((p) => p.name === name);

    if (!pokemon) return false;

    const previousLevel = pokemon.level;

    dispatch({ type: "GAIN_HP", payload: { name, hp } });

    const newXp = Math.min(pokemon!.hp + hp, 101);
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

  function gainEnergy(gain: number) {
    dispatch({ type: "GAIN_ENERGY", payload: { gain } });
  }

  function useEnergy(lose: number) {
    dispatch({ type: "USE_ENERGY", payload: { lose } });
  }

  function gainDiamond(gain: number) {
    dispatch({ type: "GAIN_DIAMOND", payload: { gain } });
  }

  function useDiamond(lose: number) {
    dispatch({ type: "USE_DIAMOND", payload: { lose } });
  }

  function gainXp(gain: number) {
    dispatch({ type: "GAIN_XP", payload: { gain } });
  }

  function setTag(name: string, tag: string) {
    dispatch({ type: "SET_TAG", payload: { name, tag } });
  }

  function deleteTag(name: string) {
    dispatch({ type: "DELETE_TAG", payload: { name } });
  }

  function setUserName(userName: string) {
    dispatch({ type: "SET_USERNAME", payload: { userName } });
  }

   function setGender(gender: string) {
    dispatch({ type: "SET_GENDER", payload: { gender } });
  }

  function addChecklist(name: string) {
    dispatch({ type: "ADD_CHECKLIST", payload: { name } });
  }

  function setChecklist(
    name: string,
    task: string,
    checked: boolean,
    index: number,
  ) {
    dispatch({
      type: "SET_CHECKLIST",
      payload: { name, task, checked, index },
    });
  }

  function deleteChecklist(name: string, index: number) {
    dispatch({ type: "DELETE_CHECKLIST", payload: { name, index } });
  }

  function setTimeToRest(name: string, time_to_rest: number) {
    dispatch({ type: "SET_TIME_TO_REST", payload: { name, time_to_rest } });
  }

  function deleteTimeToRest(name: string) {
    dispatch({ type: "DELETE_TIME_TO_REST", payload: { name } });
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
        gainHp,
        gainPokeball,
        usePokeball,
        registerMission,
        resetGame,
        deleteChecklist,
        addChecklist,
        setChecklist,
        gainEnergy,
        useEnergy,
        gainDiamond,
        useDiamond,
        gainXp,
        setUserName,
        setTag,
        deleteTag,
        setGender,
        setTimeToRest,
        deleteTimeToRest,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
