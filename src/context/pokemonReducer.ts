// src/context/pokemonReducer.ts
import type { PokemonState, PokemonAction } from "./pokemonTypes";

export const initialPokemonState: PokemonState = {
  userStatus: { pokeball: 0 },
  myPokemons: [],
};

function calculateLevel(xp: number) {
  return Math.min(Math.floor(xp / 10), 10);
}

export function pokemonReducer(
  state: PokemonState,
  action: PokemonAction,
): PokemonState {
  switch (action.type) {
    case "CAPTURE_POKEMON":
      const alreadyCaptured = state.myPokemons.some(
        (p) => p.name === action.payload.name,
      );

      if (alreadyCaptured) {
        return state;
      }
      return {
        ...state,
        myPokemons: [
          ...state.myPokemons,
          {
            name: action.payload.name,
            type: action.payload.type,
            xp: 0,
            level: 0,
          },
        ],
      };

    case "GAIN_XP":
      return {
        ...state,
        myPokemons: state.myPokemons.map((p) => {
          if (p.name !== action.payload.name) return p;

          const newXp = Math.min(p.xp + action.payload.xp, 100);
          const newLevel = calculateLevel(newXp);

          return {
            ...p,
            xp: newXp,
            level: newLevel,
          };
        }),
      };

    case "GAIN_POKEBALL":
      return {
        ...state,
        userStatus: {
          pokeball: state.userStatus.pokeball + action.payload.gain,
        },
      };

    case "USE_POKEBALL":
      return {
        ...state,
        userStatus: {
          pokeball: state.userStatus.pokeball - action.payload.lose,
        },
      };

    case "EVOLVE_POKEMON":
      return {
        ...state,
        myPokemons: state.myPokemons.map((p) =>
          p.name === action.payload.name
            ? { ...p, name: action.payload.newName }
            : p,
        ),
      };

    case "RESET_GAME":
      return initialPokemonState;

    default:
      return state;
  }
}
