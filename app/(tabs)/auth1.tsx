import { authClient } from '@/lib/auth-client';
import { Button, Text } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

const SafeAreaView = withUniwind(RNSafeAreaView);

export default function AuthScreen() {
  const { data: session, isPending } = authClient.useSession();

  const handleSignIn = async () => {
    await authClient.signIn.email({
      email: 'agaresking@gmail.com',
      password: 'Agares123',
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  if (session)
    return (
      <SafeAreaView className='flex-1 bg-background p-5'>
        <Text>Welcome, {session.user.email}</Text>

        <Button title='Sign Out' onPress={handleSignOut} />
      </SafeAreaView>
    );

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      <Button title='Sign In' onPress={handleSignIn} />
    </SafeAreaView>
  );
}
