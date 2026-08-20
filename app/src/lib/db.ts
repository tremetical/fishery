/*
 * Thin promise wrapper over IndexedDB. IndexedDB (not localStorage) because
 * review history grows unbounded and must survive; paired with
 * navigator.storage.persist() and manual JSON backup (backup.ts).
 */

const DB_NAME = 'preflight';
const DB_VERSION = 1;

export const STORES = ['cards', 'log', 'kv', 'exams'] as const;
export type StoreName = (typeof STORES)[number];

let dbPromise: Promise<IDBDatabase> | null = null;

export function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('cards'))
        db.createObjectStore('cards', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('log')) {
        const log = db.createObjectStore('log', { autoIncrement: true });
        log.createIndex('ts', 'ts');
      }
      if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
      if (!db.objectStoreNames.contains('exams'))
        db.createObjectStore('exams', { autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function tx<T>(
  store: StoreName,
  mode: IDBTransactionMode,
  fn: (s: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(store, mode);
        const req = fn(t.objectStore(store));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }),
  );
}

export const idb = {
  get: <T>(store: StoreName, key: IDBValidKey): Promise<T | undefined> =>
    tx(store, 'readonly', (s) => s.get(key) as IDBRequest<T | undefined>),

  getAll: <T>(store: StoreName): Promise<T[]> =>
    tx(store, 'readonly', (s) => s.getAll() as IDBRequest<T[]>),

  put: (store: StoreName, value: unknown, key?: IDBValidKey): Promise<IDBValidKey> =>
    tx(store, 'readwrite', (s) => s.put(value, key)),

  add: (store: StoreName, value: unknown): Promise<IDBValidKey> =>
    tx(store, 'readwrite', (s) => s.add(value)),

  del: (store: StoreName, key: IDBValidKey): Promise<undefined> =>
    tx(store, 'readwrite', (s) => s.delete(key) as IDBRequest<undefined>),

  clear: (store: StoreName): Promise<undefined> =>
    tx(store, 'readwrite', (s) => s.clear() as IDBRequest<undefined>),

  bulkPut(store: StoreName, values: unknown[], keys?: IDBValidKey[]): Promise<void> {
    return openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const t = db.transaction(store, 'readwrite');
          const s = t.objectStore(store);
          values.forEach((v, i) => (keys ? s.put(v, keys[i]) : s.put(v)));
          t.oncomplete = () => resolve();
          t.onerror = () => reject(t.error);
        }),
    );
  },
};

/** Ask the browser not to evict our data under storage pressure. */
export async function requestPersistence(): Promise<boolean> {
  try {
    if (navigator.storage?.persist) {
      if (await navigator.storage.persisted()) return true;
      return await navigator.storage.persist();
    }
  } catch {
    /* unavailable */
  }
  return false;
}
