import { DB } from "./db/setup";

export type Store = {
  db: DB | null;
};

export const store: Store = {
  db: null,
};

export function setDB(db: DB) {
  store.db = db;
}

export function getDB() {
  if (store.db === null) {
    throw new Error("db instance not found!");
  }

  return store.db;
}
