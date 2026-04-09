import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useCSSVariable } from 'uniwind';

export default function AddMenuModal({
  visible,
  onClose,
  onAdd,
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: ({ name, price }: { name: string; price: string }) => void;
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name || !price) return;

    onAdd({ name, price });
    setName('');
    setPrice('');
    Keyboard.dismiss();
  };

  const handleCancel = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='slide'
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        className='flex-1'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Pressable
          className='flex-1 justify-center items-center'
          onPress={Keyboard.dismiss}
        >
          <Pressable className='w-full absolute bottom-0 bg-foreground rounded-t-2xl p-5 shadow-lg'>
            <Text className='text-xl font-sans-bold text-gray-800 text-center mb-5'>
              Add New Menu Item
            </Text>

            <TextInput
              className='border border-gray-300 rounded-lg p-3.5 mb-4 text-base text-gray-800 bg-gray-50'
              placeholder='Menu Name'
              value={name}
              onChangeText={setName}
              placeholderTextColor={`${useCSSVariable('--color-background')}`}
            />

            <TextInput
              className='border border-gray-300 rounded-lg p-3.5 mb-6 text-base text-gray-800 bg-gray-50'
              placeholder='Price'
              value={price}
              onChangeText={setPrice}
              keyboardType='numeric'
              placeholderTextColor={`${useCSSVariable('--color-background')}`}
            />

            <View className='flex-row justify-between'>
              <Pressable
                className='flex-1 bg-gray-200 rounded-lg py-3.5 mx-1.5 items-center active:bg-gray-300'
                onPress={handleCancel}
              >
                <Text className='font-sans-semibold text-base text-gray-700'>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                className='flex-1 bg-primary rounded-lg py-3.5 mx-1.5 items-center active:bg-primary/80'
                onPress={handleAdd}
              >
                <Text className='font-sans-semibold text-base text-white'>
                  Add
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
