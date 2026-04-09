import AddMenuModal from '@/components/AddMenuModal';
import { db } from '@/db';
import { Menu, menus } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Plus } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

const SafeAreaView = withUniwind(RNSafeAreaView);

const Home = () => {
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadMenus = async () => {
      setIsLoading(true);
      try {
        const data = await db.select().from(menus).orderBy(desc(menus.id));

        setMenuList(data);
      } catch (error) {
        console.error('Failed to load menus', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenus();
  }, []);

  const renderProduct = ({ item }: { item: Menu }) => (
    <View className='mb-3 p-4 bg-muted rounded-lg shadow-sm flex-row justify-between'>
      <Text className='text-foreground font-bold'>{item.name}</Text>
      <Text className='text-foreground'>
        {item.price.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 2,
        })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className='flex-1 bg-background gap-4 p-5'>
      <View className='flex flex-row items-center justify-between'>
        <Text className='text-foreground text-2xl font-sans-bold'>Menu</Text>
        <TouchableOpacity
          className='bg-foreground rounded-full aspect-square flex items-center justify-center size-10'
          onPress={() => {
            setShowModal(true);
          }}
        >
          <Plus />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size='large' className='mt-10' />
      ) : (
        <FlatList
          data={menuList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text className='text-foreground text-center mt-10'>
              No products found.
            </Text>
          }
        />
      )}

      <AddMenuModal
        onAdd={({ name, price }) => {
          console.log(name, price);
        }}
        onClose={() => setShowModal(false)}
        visible={showModal}
      />
    </SafeAreaView>
  );
};

export default Home;
