import { DATABASE_NAME, expoDb } from '@/db';
import '@/global.css';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useUniwind } from 'uniwind';

export default function RootLayout() {
  useDrizzleStudio(expoDb);
  // const { success, error } = useMigrations(db, migrations);
  const { theme } = useUniwind();

  useEffect(() => {
    Font.loadAsync({
      'PlusJakartaSans-Regular': require('@/assets/fonts/PlusJakartaSans-Regular.ttf'),
      'PlusJakartaSans-Bold': require('@/assets/fonts/PlusJakartaSans-Bold.ttf'),
      'PlusJakartaSans-Light': require('@/assets/fonts/PlusJakartaSans-Light.ttf'),
      'PlusJakartaSans-SemiBold': require('@/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
      'PlusJakartaSans-ExtraBold': require('@/assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
      'PlusJakartaSans-Medium': require('@/assets/fonts/PlusJakartaSans-Medium.ttf'),
    }).then(() => {});
  }, []);

  return (
    <Suspense fallback={<ActivityIndicator size='large' />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
        </GestureHandlerRootView>
      </SQLiteProvider>
    </Suspense>
  );
}
