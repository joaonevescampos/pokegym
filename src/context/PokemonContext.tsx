// src/context/PokemonContext.tsx
import { createContext } from "react";
import type { PokemonState } from "./pokemonTypes";

export type PokemonContextType = {
  state: PokemonState;
  capturePokemon: (name: string, type: string) => void;
  gainXp: (name: string, xp: number) => Promise<boolean>;
  gainPokeball: (gain: number) => void;
  usePokeball: (lose: number) => void;
  resetGame: () => void;
};

export const PokemonContext = createContext<PokemonContextType | null>(null);
