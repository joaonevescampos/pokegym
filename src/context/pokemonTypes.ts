export type Pokemon = {
  name: string;
  type: string;
  hp: number;
  level: number;
  checklist: Checklist[];
  tag: string;
  time_to_rest: null | number;
};

export type Checklist = {
  task: string;
  checked: boolean;
};

export type DayOfMonth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type MonthEntry = {
  [K in Month]?: DayOfMonth[];
};

export type DashboardYear = {
  year: number;
  months: MonthEntry[];
};

export type Dashboard = DashboardYear[];

export type UserStatus = {
  userName: string;
  gender : string
  pokeball: number;
  energy: number;
  diamond: number;
  dashboard: Dashboard;
  xp: number;
};

export type PokemonState = {
  userStatus: UserStatus;
  myPokemons: Pokemon[];
};

export type PokemonAction =
  | { type: "CAPTURE_POKEMON"; payload: { name: string; type: string } }
  | { type: "GAIN_HP"; payload: { name: string; hp: number } }
  | { type: "EVOLVE_POKEMON"; payload: { name: string; newName: string } }
  | { type: "GAIN_POKEBALL"; payload: { gain: number } }
  | { type: "USE_POKEBALL"; payload: { lose: number } }
  | { type: "GAIN_ENERGY"; payload: { gain: number } }
  | { type: "USE_ENERGY"; payload: { lose: number } }
  | { type: "GAIN_DIAMOND"; payload: { gain: number } }
  | { type: "USE_DIAMOND"; payload: { lose: number } }
  | { type: "GAIN_XP"; payload: { gain: number } }
  | { type: "SET_TAG"; payload: { name: string; tag: string } }
  | { type: "DELETE_TAG"; payload: { name: string } }
  | { type: "SET_GENDER"; payload: { gender: string } }
  | { type: "SET_USERNAME"; payload: { userName: string } }
  | {
      type: "ADD_CHECKLIST";
      payload: { name: string };
    }
  | {
      type: "SET_CHECKLIST";
      payload: { name: string; task: string; checked: boolean; index: number };
    }
  | {
      type: "DELETE_CHECKLIST";
      payload: { name: string; index: number };
    }
  | {
      type: "SET_TIME_TO_REST";
      payload: { name: string; time_to_rest: number };
    }
  | {
      type: "DELETE_TIME_TO_REST";
      payload: { name: string };
    }
  | {
      type: "REGISTER_MISSION";
      payload: {
        year: number;
        month: Month;
        day: DayOfMonth;
      };
    }
  | { type: "RESET_GAME" };
