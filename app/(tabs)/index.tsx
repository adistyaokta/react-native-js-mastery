import ListHeading from '@/components/ListHeading';
import SubscriptionCard from '@/components/SubscriptionCard';
import UpcomingSubscriptionCard from '@/components/UpcomingSubscriptionCard';
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTION,
  HOME_USER,
  UPCOMING_SUBSCRIPTION,
} from '@/constants/data';
import '@/global.css';
import { formatIDR } from '@/lib/utils';
import dayjs from 'dayjs';
import { StatusBar } from 'expo-status-bar';
import { Plus } from 'lucide-react-native';
import { styled } from 'nativewind';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const SafeAreaView = styled(RNSafeAreaView);

export default function Index() {
  const [expandedSubId, setExpandedSubId] = useState<string | null>(null);

  return (
    <SafeAreaView className='flex-1 gap-4 bg-background p-5'>
      <StatusBar style={'dark'} />
      <FlatList
        ListHeaderComponent={() => (
          <View className='gap-2'>
            <View className='flex-row items-center gap-3 rounded-xl'>
              {/* Avatar */}
              <View className='w-12 h-12 rounded-full bg-white items-center justify-center border border-border'>
                <Text className='text-primary font-sans-bold text-lg'>OO</Text>
              </View>

              <View>
                <Text className='text-primary text-sm opacity-80 font-sans'>
                  Welcome back
                </Text>
                <Text className='text-primary text-lg font-sans-semibold'>
                  {HOME_USER.name}
                </Text>
              </View>
              <View className='ml-auto aspect-square rounded-full bg-white border border-border w-12 h-12 items-center justify-center'>
                <Plus />
              </View>
            </View>

            <View className='bg-accent p-5 rounded-4xl rounded-tl-none rounded-br-none gap-4'>
              {/* Balance Section */}
              <View>
                <Text className='text-white opacity-80 text-sm'>
                  Total Balance
                </Text>
                <Text className='text-white text-2xl font-bold mt-1'>
                  {formatIDR(HOME_BALANCE.amount)}
                </Text>
              </View>

              {/* Divider */}
              <View className='h-px bg-white/20' />

              {/* Renewal Section */}
              <View className='flex-row justify-between items-center'>
                <Text className='text-white opacity-80 text-sm'>
                  Next Renewal
                </Text>
                <Text className='text-white font-semibold'>
                  {dayjs(HOME_BALANCE.nextRenewalDate).format('DD/MM')}
                </Text>
              </View>
            </View>

            <View>
              <ListHeading title={'Upcoming'} />
              <FlatList
                data={UPCOMING_SUBSCRIPTION}
                renderItem={({ item }) => (
                  <UpcomingSubscriptionCard data={item} />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className='w-2' />}
                ListEmptyComponent={() => (
                  <Text className='text-md text-muted-foreground'>
                    No Upcoming Renewals.
                  </Text>
                )}
              />
            </View>

            <ListHeading title={'All Subscriptions'} />
          </View>
        )}
        data={HOME_SUBSCRIPTION}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            data={item}
            expanded={expandedSubId === item.id}
            onPress={() =>
              setExpandedSubId((currentId) =>
                currentId === item.id ? null : item.id,
              )
            }
          />
        )}
        extraData={expandedSubId}
        ItemSeparatorComponent={() => <View className='h-2' />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text className='text-md text-muted-foreground'>
            No Subscription.
          </Text>
        )}
        contentContainerClassName='pb-20'
      />
    </SafeAreaView>
  );
}
