// src/context/pokemonReducer.ts
import type { PokemonState, PokemonAction, MonthEntry, DashboardYear } from "./pokemonTypes";
const date = new Date();
const currYear = date.getFullYear();

export const initialPokemonState: PokemonState = {
  userStatus: {
    pokeball: 0,
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
          ...state.userStatus,
          pokeball: state.userStatus.pokeball + action.payload.gain,
        },
      };

    case "REGISTER_MISSION": {
  const { year, month, day } = action.payload;

  const dashboard = state.userStatus.dashboard;

  const yearIndex = dashboard.findIndex((y) => y.year === year);

  // 1️⃣ Ano não existe ainda
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
    (m : any) => m[month] !== undefined,
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


    case "USE_POKEBALL":
      return {
        ...state,
        userStatus: {
          ...state.userStatus,
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
