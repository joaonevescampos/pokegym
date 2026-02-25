export const CURRENT_VERSION = 2;

export function migrateV1toV2(state: any) {
  return {
    ...state,
    version: 2,
  };
}

export const migrations: Record<number, (state: any) => any> = {
  1: migrateV1toV2,
};
