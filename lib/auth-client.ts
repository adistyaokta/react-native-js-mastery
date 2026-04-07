import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: process.env.SERVER_URL,
  plugins: [
    expoClient({
      scheme: 'reactnative1',
      storage: SecureStore,
    }),
  ],
});
