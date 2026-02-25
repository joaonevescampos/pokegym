// src/context/PokemonContext.tsx
import { createContext } from "react";
import type { PokemonState } from "./pokemonTypes";

export type PokemonContextType = {
  state: PokemonState;
  capturePokemon: (name: string, type: string) => void;
  gainHp: (name: string, hp: number) => Promise<boolean>;
  gainPokeball: (gain: number) => void;
  usePokeball: (lose: number) => void;
  registerMission: (year: number, month: number, day: number) => void;
  gainEnergy: (gain: number) => void;
  useEnergy: (lose: number) => void;
  gainToken: (gain: number) => void;
  useToken: (lose: number) => void;
  gainDiamond: (gain: number) => void;
  useDiamond: (lose: number) => void;
  gainXp: (gain: number) => void;
  setUserName: (userName: string) => void;
  setGender: (gender: string) => void;
  setTag: (name: string, tag: string) => void;
  deleteTag: (name: string) => void;
  setNote: (note: string) => void;
  setPassword: (password: string) => void;
  activeNote: (status: boolean) => void;
  activeRandom: (status: boolean) => void;
  activePomodoro: (status: boolean) => void;
  addChecklist: (name: string) => void;
  setChecklist: (
    name: string,
    task: string,
    checked: boolean,
    index: number,
  ) => void;
  deleteChecklist: (name: string, index: number) => void;
  setTimeToRest: (name: string, time_to_rest: number) => void;
  deleteTimeToRest: (name: string) => void;
  setTimeToRestRocket: (time_to_rest_rocket: number | null) => void;
  resetGame: () => void;
};

export const PokemonContext = createContext<PokemonContextType | null>(null);
