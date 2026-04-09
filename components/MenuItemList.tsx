import { deleteMenu } from '@/db/queries/menus/menu';
import { Menu } from '@/db/schema';
import React, { useCallback } from 'react';
import { Alert, Pressable as RNPressable, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { withUniwind } from 'uniwind';

const Pressable = withUniwind(RNPressable);

type MenuItemListProps = {
  item: Menu;
  onItemPressed: (item: Menu) => void;
};

const MenuItemList = ({ item, onItemPressed }: MenuItemListProps) => {
  const confirmDelete = () => {
    Alert.alert(
      'Delete Menu',
      `Are you sure you want to delete ${item.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDelete },
      ],
    );
  };

  const handleDelete = async () => {
    const result = await deleteMenu(String(item.id));
    if (!result.success) {
      Alert.alert('Error', 'Failed to delete menu item.');
    }
  };

  const renderRightActions = useCallback(() => {
    return (
      <Pressable
        onPress={confirmDelete}
        className='w-20 bg-destructive/90 rounded-lg justify-center items-center ml-2 active:bg-destructive'
      >
        <Text className='text-destructive-foreground font-bold'>Delete</Text>
      </Pressable>
    );
  }, [item]);

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <Pressable
        onPress={() => onItemPressed(item)}
        className='p-4 bg-muted rounded-lg shadow-sm flex-row justify-between active:opacity-70'
      >
        <Text className='text-foreground font-bold'>{item.name}</Text>
        <Text className='text-foreground'>
          {item.price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2,
          })}
        </Text>
      </Pressable>
    </Swipeable>
  );
};

export default MenuItemList;
