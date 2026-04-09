import MenuItemList from '@/components/MenuItemList';
import MenuItemModal from '@/components/MenuModal';
import { getMenus } from '@/db/queries/menus/menu';
import { Menu } from '@/db/schema';
import { useTheme } from '@/lib/colors';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { Plus } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { FlatList, Pressable as RNPressable, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

const SafeAreaView = withUniwind(RNSafeAreaView);
const Pressable = withUniwind(RNPressable);

const Home = () => {
  const colors = useTheme();
  const { data, error } = useLiveQuery(getMenus());

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Partial<Menu> | null>(null);

  const handleOpenAdd = useCallback(() => {
    setSelectedItem(null);
    setShowModal(true);
  }, []);

  const handleOpenEdit = useCallback((item: Menu) => {
    setSelectedItem(item);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedItem(null);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Menu }) => (
      <MenuItemList item={item} onItemPressed={handleOpenEdit} />
    ),
    [handleOpenEdit],
  );

  const renderEmptyList = useCallback(
    () => (
      <Text className='text-foreground text-center mt-10'>
        No products found.
      </Text>
    ),
    [],
  );

  return (
    <SafeAreaView className='flex-1 bg-background gap-4 p-5'>
      <View className='flex flex-row items-center justify-between'>
        <Text className='text-foreground text-2xl font-sans-bold'>Menu</Text>
        <Pressable
          className='bg-foreground rounded-full aspect-square flex items-center justify-center size-10 active:opacity-80'
          onPress={handleOpenAdd}
        >
          <Plus color={colors.background} />
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        contentContainerClassName='flex flex-col gap-2'
        keyboardShouldPersistTaps='handled'
        ListEmptyComponent={renderEmptyList}
      />

      <MenuItemModal
        visible={showModal}
        item={selectedItem}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
};

export default Home;
