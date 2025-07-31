import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import * as SQLite from 'expo-sqlite';
import React, { createContext, useContext, useEffect, useState } from 'react';
import migrations from '../drizzle/migrations';

const expo = SQLite.openDatabaseSync('exp-track.db', { enableChangeListener: true });
const db = drizzle(expo);

type DatabaseContextType = {
  db: typeof db;
  isReady: boolean;
  error: Error | undefined;
};

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { success, error } = useMigrations(db, migrations);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (success) {
      setIsReady(true);
    }
  }, [success]);

  if (error) {
    console.error('Database migration error:', error);
  }

  return (
    <DatabaseContext.Provider value={{ db, isReady, error }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}