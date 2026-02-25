

export const CURRENT_VERSION = 3;

export function migrateV1toV2(state: any) {
  return {
    ...state,
    version: 2,
  };
}

export function migrateV2toV3(state: any) {
   return {
    ...state,
    myPokemons: state.myPokemons.map((pokemon: any) => ({
      ...pokemon,
      rarity: 2
    })),
    version: 3
  };
}

export const migrations: Record<number, (state: any) => any> = {
  1: migrateV1toV2,
  2: migrateV2toV3
};
