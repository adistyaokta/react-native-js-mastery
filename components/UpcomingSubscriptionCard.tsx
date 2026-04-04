import { formatIDR } from '@/lib/utils';
import React from 'react';
import { Text, View } from 'react-native';

const UpcomingSubscriptionCard = ({
  data: { name, price, daysLeft, icon: Icon },
}: {
  data: any;
}) => {
  return (
    <View className='w-44 rounded-2xl border border-border bg-card p-4'>
      {/* Top Section */}
      <View className='flex-row items-center justify-between'>
        {/* Icon */}
        <View className='bg-muted p-3 rounded-xl'>
          <Icon size={22} />
        </View>

        {/* Days Left Badge */}
        <View className='bg-teal-500/10 px-2 py-1 rounded-full'>
          <Text className='text-xs font-medium text-'>
            {daysLeft > 1 ? `${daysLeft} days` : 'Last day'}
          </Text>
        </View>
      </View>

      {/* Middle Section */}
      <View className='mt-4'>
        <Text
          numberOfLines={1}
          className='text-base font-semibold text-foreground'
        >
          {name}
        </Text>
      </View>

      {/* Bottom Section */}
      <View className='mt-4'>
        <Text className='text-lg font-bold text-foreground'>
          {formatIDR(price)}
        </Text>
      </View>
    </View>
  );
};

export default UpcomingSubscriptionCard;
