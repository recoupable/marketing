export type SessionStore = Pick<Storage, "getItem" | "setItem">;

export const acquisitionStorageKey = "recoup:acquisition:v1";
