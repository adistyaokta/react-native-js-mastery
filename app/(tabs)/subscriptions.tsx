import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

const SafeAreaView = withUniwind(RNSafeAreaView);

const Subscription = () => {
  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      <Text>Subscription</Text>
    </SafeAreaView>
  );
};

export default Subscription;
