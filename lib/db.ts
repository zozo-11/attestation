import { openDB } from 'idb'

const DB_NAME = 'attestation'
const STORE = 'form'

async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE)
    }
  })
}

export async function saveField(key: string, value: string | number) {
  const db = await getDb()
  return db.put(STORE, value, key)
}

export async function getField<T = string>(key: string): Promise<T | undefined> {
  const db = await getDb()
  return db.get(STORE, key)
}
