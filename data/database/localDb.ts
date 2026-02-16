import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';

const DB_NAME = 'sdaSongs.db';
const LYRICS_TABLE = 'LyricsContents';

interface DbRow {
  id: string;
  value: string;
}

let db: SQLite.SQLiteDatabase | null = null;
let initPromise: Promise<void> | null = null;
let isSaving = false;

/**
 * Safe DB getter (never null)
 */
const getDb = (): SQLite.SQLiteDatabase => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

/**
 * Initialize database safely (runs once)
 */
export const initializeDatabase = async (): Promise<void> => {
  if (db) return;

  if (!initPromise) {
    initPromise = (async () => {
      db = await SQLite.openDatabaseAsync(DB_NAME);

      const database = getDb();

      await database.withTransactionAsync(async () => {
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS \`${LYRICS_TABLE}\` (
            id TEXT PRIMARY KEY,
            value TEXT NOT NULL
          );
        `);
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS sync_meta (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            lastSyncedAt TEXT
          );
        `);
      });

      console.log('Database initialized successfully.');
    })();
  }

  await initPromise;
};

/**
 * Save data to local DB
 */
export const saveToLocalDB = async (
  data: any[],
  table = LYRICS_TABLE
): Promise<void> => {
  if (isSaving) return;
  isSaving = true;

  try {
    await initializeDatabase();

    const database = getDb();

    await database.withTransactionAsync(async () => {
      for (const item of data) {
        await database.runAsync(
          `INSERT OR REPLACE INTO \`${table}\` (id, value) VALUES (?, ?)`,
          [String(item.Id), JSON.stringify(item)]
        );
      }
    });
  } finally {
    isSaving = false;
  }
};

/**
 * Read helpers
 */
export const getFromLocalDB = async (table = LYRICS_TABLE): Promise<any[]> => {
  await initializeDatabase();
  const database = getDb();

  const rows = (await database.getAllAsync(
    `SELECT * FROM \`${table}\``
  )) as DbRow[];

  return rows.map(r => JSON.parse(r.value)).filter(song =>!song?.deletedAt);
};

export const getItemById = async (
  id: string,
  table = LYRICS_TABLE
): Promise<any | null> => {
  await initializeDatabase();
  const database = getDb();

  const row = (await database.getFirstAsync(
    `SELECT * FROM \`${table}\` WHERE id = ?`,
    [String(id)]
  )) as DbRow | null;

  return row ? JSON.parse(row.value) : null;
};

/**
 * Sync meta
 */
export const getLastSyncedAt = async (): Promise<string | null> => {
  await initializeDatabase();
  const database = getDb();

  const row = (await database.getFirstAsync(
    'SELECT lastSyncedAt FROM sync_meta WHERE id = 1'
  )) as { lastSyncedAt: string } | null;

  return row?.lastSyncedAt ?? null;
};

export const saveLastSyncedAt = async (date: string): Promise<void> => {
  await initializeDatabase();
  const database = getDb();

  await database.runAsync(
    'INSERT OR REPLACE INTO sync_meta (id, lastSyncedAt) VALUES (1, ?)',
    [date]
  );
};

export const hasPendingUpdates = async (): Promise<boolean> => {
  await initializeDatabase();
  const database = getDb();

  const row = (await database.getFirstAsync(
    'SELECT lastSyncedAt FROM sync_meta WHERE id = 1'
  )) as { lastSyncedAt: string } | null;

  return !row?.lastSyncedAt;
};

export const markUpdatesSynced = async (date: string): Promise<void> => {
  await saveLastSyncedAt(date);
};

/**
 * Delete helpers
 */
export const deleteRowById = async (
  id: string | number,
  table = LYRICS_TABLE
): Promise<void> => {
  await initializeDatabase();
  const database = getDb();

  await database.runAsync(
    `DELETE FROM \`${table}\` WHERE id = ?`,
    [String(id)]
  );
};

export const clearTable = async (
  table = LYRICS_TABLE
): Promise<void> => {
  await initializeDatabase();
  const database = getDb();

  console.log('Local data cleared');
  await database.runAsync(`DELETE FROM \`${table}\``);
};
// const logAllLocalSongs = async()=>{
//   const rows  = await getFromLocalDB();
//   console.log("All Rows in SQLITE", rows)
// }
// useEffect (() =>{
// logAllLocalSongs()
// }, [])