import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ListHeading = ({ title }: { title: string }) => {
  return (
    <View className='flex-row items-center justify-between py-2'>
      <Text className='font-sans-bold text-xl'>{title}</Text>
      <TouchableOpacity className='rounded-full border border-border p-1'>
        <Text className='font-sans-semibold'>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListHeading;
