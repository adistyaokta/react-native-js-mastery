import { addMenu, editMenu } from '@/db/queries/menus/menu';
import { Menu } from '@/db/schema';
import { useTheme } from '@/lib/colors';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type MenuItemModalProps = {
  visible: boolean;
  item: Partial<Menu> | null;
  onClose: () => void;
};

export default function MenuItemModal({
  visible,
  item,
  onClose,
}: MenuItemModalProps) {
  const colors = useTheme();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (visible) {
      setName(item?.name || '');
      setPrice(item?.price ? item.price.toString() : '');
    }
  }, [visible, item]);

  const handleSave = async () => {
    if (!name || !price) return;

    const numericPrice = Number(price);
    let result;

    if (item?.id) {
      result = await editMenu(String(item.id), { name, price: numericPrice });
    } else {
      result = await addMenu({ name, price: numericPrice });
    }

    if (result?.success) {
      handleCancel();
    } else {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleCancel = () => {
    Keyboard.dismiss();
    setName('');
    setPrice('');
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
        <TouchableWithoutFeedback onPress={handleCancel}>
          <View className='flex-1 justify-center items-center'>
            <Pressable className='w-full absolute bottom-0 bg-foreground rounded-t-2xl p-5 shadow-lg'>
              <Text className='text-xl font-sans-semibold text-background text-center mb-5'>
                {item?.id ? 'Update Menu' : 'Add New Menu'}
              </Text>

              <TextInput
                className='border border-gray-300 rounded-lg p-3 mb-4 text-base text-gray-800 bg-gray-50'
                placeholder='Menu Name'
                value={name}
                onChangeText={setName}
                placeholderTextColor={colors.primary}
              />

              <TextInput
                className='border border-gray-300 rounded-lg p-3 mb-6 text-base text-gray-800 bg-gray-50'
                placeholder='Price'
                value={price}
                onChangeText={(text) => {
                  const cleanText = text.replace(/[^0-9]/g, '');
                  setPrice(cleanText);
                }}
                keyboardType='numeric'
                placeholderTextColor={colors.primary}
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
                  onPress={handleSave}
                >
                  <Text className='font-sans-semibold text-base text-white'>
                    {item?.id ? 'Save Changes' : 'Add'}
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
