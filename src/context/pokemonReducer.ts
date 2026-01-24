// src/context/pokemonReducer.ts
import type {
  PokemonState,
  PokemonAction,
  MonthEntry,
  DashboardYear,
  Checklist,
  Pokemon,
} from "./pokemonTypes";
const date = new Date();
const currYear = date.getFullYear();

export const initialPokemonState: PokemonState = {
  userStatus: {
    pokeball: 3,
    energy: 1,
    dashboard: [
      {
        year: currYear,
        months: [
          { 0: [] },
          { 1: [] },
          { 2: [] },
          { 3: [] },
          { 4: [] },
          { 5: [] },
          { 6: [] },
          { 7: [] },
          { 8: [] },
          { 9: [] },
          { 10: [] },
          { 11: [] },
        ],
      },
    ],
  },
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
            checklist: [{ task: "crie sua tarefa aqui", checked: false }],
            tag: "",
            time_to_rest: null,
          },
        ],
      };

    case "GAIN_XP":
      return {
        ...state,
        myPokemons: state.myPokemons.map((p) => {
          if (p.name !== action.payload.name) return p;

          const newXp = Math.min(p.xp + action.payload.xp, 101);
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
          ...state.userStatus,
          pokeball: state.userStatus.pokeball + action.payload.gain,
        },
      };

    case "USE_POKEBALL":
      return {
        ...state,
        userStatus: {
          ...state.userStatus,
          pokeball: state.userStatus.pokeball - action.payload.lose,
        },
      };

    case "GAIN_ENERGY":
      return {
        ...state,
        userStatus: {
          ...state.userStatus,
          energy: state.userStatus.energy + action.payload.gain,
        },
      };

    case "USE_ENERGY":
      return {
        ...state,
        userStatus: {
          ...state.userStatus,
          energy: state.userStatus.energy - action.payload.lose,
        },
      };

    case "SET_TAG":
      return {
        ...state,
        myPokemons: state.myPokemons.map((pokemonObj) => {
          if (pokemonObj.name !== action.payload.name) return pokemonObj;

          const newTag = action.payload.tag;

          return {
            ...pokemonObj,
            tag: newTag,
          };
        }),
      };

    case "DELETE_TAG":
      return {
        ...state,
        myPokemons: state.myPokemons.map((pokemonObj) => {
          if (pokemonObj.name !== action.payload.name) return pokemonObj;

          return {
            ...pokemonObj,
            tag: "",
          };
        }),
      };

    case "ADD_CHECKLIST":
      return {
        ...state,
        myPokemons: state.myPokemons.map((pokemonObj: Pokemon) => {
          if (pokemonObj.name !== action.payload.name) return pokemonObj;

          const newChecklistItem = {task: "", checked: false}

          return {
            ...pokemonObj,
            checklist: [...pokemonObj.checklist, newChecklistItem],
          };
        }),
      };

    case "SET_CHECKLIST":
      return {
        ...state,
        myPokemons: state.myPokemons.map((pokemonObj: Pokemon) => {
          if (pokemonObj.name !== action.payload.name) return pokemonObj;

          const newChecklist = pokemonObj.checklist.map(
            (checklist: Checklist, index: number) => {
              if (index !== action.payload.index) return checklist;

              return {
                task: action.payload.task,
                checked: action.payload.checked,
              };
            },
          );

          return {
            ...pokemonObj,
            checklist: newChecklist,
          };
        }),
      };

    case "DELETE_CHECKLIST":
      return {
        ...state,
        myPokemons: state.myPokemons.map((pokemonObj) => {
          if (pokemonObj.name !== action.payload.name) return pokemonObj;

          return {
            ...pokemonObj,
            checklist: pokemonObj.checklist.filter(
              (_checklist, index) => index !== action.payload.index,
            ),
          };
        }),
      };

    case "SET_TIME_TO_REST":
      return {
        ...state,
        myPokemons: state.myPokemons.map((pokemonObj) => {
          if (pokemonObj.name !== action.payload.name) return pokemonObj;

          const newtime_to_rest = action.payload.time_to_rest;

          return {
            ...pokemonObj,
            time_to_rest: newtime_to_rest,
          };
        }),
      };

    case "DELETE_TIME_TO_REST":
      return {
        ...state,
        myPokemons: state.myPokemons.map((pokemonObj) => {
          if (pokemonObj.name !== action.payload.name) return pokemonObj;

          return {
            ...pokemonObj,
            time_to_rest: null,
          };
        }),
      };

    case "REGISTER_MISSION": {
      const { year, month, day } = action.payload;

      const dashboard = state.userStatus.dashboard;

      const yearIndex = dashboard.findIndex((y) => y.year === year);

      if (yearIndex === -1) {
        return {
          ...state,
          userStatus: {
            ...state.userStatus,
            dashboard: [
              ...dashboard,
              {
                year,
                months: [
                  {
                    [month]: [day],
                  },
                ],
              },
            ],
          },
        };
      }

      const yearEntry = dashboard[yearIndex];

      const monthIndex = yearEntry.months.findIndex(
        (m: any) => m[month] !== undefined,
      );

      // 2️⃣ Mês não existe nesse ano
      if (monthIndex === -1) {
        const updatedYear: DashboardYear = {
          ...yearEntry,
          months: [
            ...yearEntry.months,
            {
              [month]: [day],
            },
          ],
        };

        return {
          ...state,
          userStatus: {
            ...state.userStatus,
            dashboard: dashboard.map((y, i) =>
              i === yearIndex ? updatedYear : y,
            ),
          },
        };
      }

      const monthEntry = yearEntry.months[monthIndex];
      const days = monthEntry[month]!;

      // 3️⃣ Dia já registrado → não faz nada
      if (days.includes(day)) {
        return state;
      }

      // 4️⃣ Adiciona o dia ao mês existente
      const updatedMonth: MonthEntry = {
        ...monthEntry,
        [month]: [...days, day],
      };

      const updatedYear: DashboardYear = {
        ...yearEntry,
        months: yearEntry.months.map((m, i) =>
          i === monthIndex ? updatedMonth : m,
        ),
      };

      return {
        ...state,
        userStatus: {
          ...state.userStatus,
          dashboard: dashboard.map((y, i) =>
            i === yearIndex ? updatedYear : y,
          ),
        },
      };
    }

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
