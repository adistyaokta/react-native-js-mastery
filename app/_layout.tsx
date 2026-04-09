import { DATABASE_NAME, db, expoDb } from '@/db';
import migrations from '@/drizzle/migrations';
import '@/global.css';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

export default function RootLayout() {
  useDrizzleStudio(expoDb);
  const { success, error } = useMigrations(db, migrations);

  return (
    <Suspense fallback={<ActivityIndicator size='large' />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style='light' />
      </SQLiteProvider>
    </Suspense>
  );
}
