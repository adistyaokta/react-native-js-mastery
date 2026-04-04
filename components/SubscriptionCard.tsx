import { formatIDR } from '@/lib/utils';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';

const SubscriptionCard = ({
  data: {
    name,
    price,
    billing,
    plan,
    status,
    paymentMethod,
    renewalDate,
    icon: Icon,
    color,
    category,
    startDate,
  },
  onPress,
  expanded,
}: {
  data: any;
  expanded: any;
  onPress: (e: GestureResponderEvent) => void | null | undefined;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        'border border-border rounded-2xl p-4 shadow-sm ',
        // When collapsed, use brand color. When expanded, use neutral card bg.
        !expanded && color ? 'bg-transparent' : 'bg-card',
        // Optional: Add a subtle ring when expanded to indicate focus
        expanded && 'ring-1 ring-primary/20',
      )}
      // Dynamic background: Brand color when collapsed, Theme Card color when expanded
      style={!expanded && color ? { backgroundColor: color } : undefined}
    >
      {/* --- TOP ROW: Summary --- */}
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-3 flex-1'>
          {/* Icon Container */}
          <View
            className={clsx(
              'p-3 rounded-xl',
              // If collapsed with brand color, make icon bg white/transparent for contrast
              // If expanded, use muted background
              !expanded && color ? 'bg-white/20' : 'bg-muted',
            )}
          >
            <Icon
              size={22}
              // If collapsed and brand color is dark, force white icon, else default
              color={!expanded && color ? '#FFFFFF' : undefined}
            />
          </View>

          <View className='flex-1'>
            <Text
              numberOfLines={1}
              className={clsx(
                'text-base font-semibold',
                !expanded && color ? 'text-white' : 'text-foreground',
              )}
            >
              {name}
            </Text>

            <Text
              className={clsx(
                'text-xs mt-1',
                !expanded && color ? 'text-white/80' : 'text-muted-foreground',
              )}
            >
              {plan} • {billing}
            </Text>

            {/* Only show payment method in summary if collapsed to save space */}
            {!expanded && (
              <Text
                className={clsx(
                  'text-xs',
                  !expanded && color
                    ? 'text-white/70'
                    : 'text-muted-foreground',
                )}
              >
                {paymentMethod}
              </Text>
            )}
          </View>
        </View>

        <View className='items-end justify-between pl-3'>
          <Text
            className={clsx(
              'text-base font-bold',
              !expanded && color ? 'text-white' : 'text-foreground',
            )}
          >
            {formatIDR(price)}
          </Text>

          <Text
            className={clsx(
              'text-xs mt-1',
              !expanded && color ? 'text-white/80' : 'text-muted-foreground',
            )}
          >
            Renews {dayjs(renewalDate).format('D MMM')}
          </Text>

          {/* Status Badge */}
          <View
            className={clsx(
              'mt-2 px-2 py-1 rounded-full',
              status === 'active'
                ? !expanded && color
                  ? 'bg-white/20'
                  : 'bg-primary'
                : status === 'paused'
                  ? 'bg-yellow-500/10'
                  : 'bg-red-500/10',
            )}
          >
            <Text
              className={clsx(
                'text-[10px] font-medium uppercase tracking-wide',
                status === 'active'
                  ? !expanded && color
                    ? 'text-white'
                    : 'text-background'
                  : status === 'paused'
                    ? 'text-yellow-600'
                    : 'text-destructive',
              )}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>

      {/* --- BOTTOM SECTION: Expanded Details --- */}
      {expanded && (
        <View className='w-full pt-4 mt-4 border-t border-border'>
          <View className='flex-row flex-wrap gap-y-3 justify-between'>
            {/* Left Column Details */}
            <View className='flex-1 min-w-30'>
              <Text className='text-xs text-muted-foreground mb-1'>
                Category
              </Text>
              <Text className='text-sm font-medium text-foreground'>
                {category}
              </Text>
            </View>

            <View className='flex-1 min-w-30'>
              <Text className='text-xs text-muted-foreground mb-1'>
                Started On
              </Text>
              <Text className='text-sm font-medium text-foreground'>
                {dayjs(startDate).format('D MMMM YYYY')}
              </Text>
            </View>
          </View>

          <View className='flex-row flex-wrap gap-y-3 justify-between mt-3'>
            <View className='flex-1 min-w-30'>
              <Text className='text-xs text-muted-foreground mb-1'>
                Payment Method
              </Text>
              <Text className='text-sm font-medium text-foreground'>
                {paymentMethod}
              </Text>
            </View>

            <View className='flex-1 min-w-30'>
              <Text className='text-xs text-muted-foreground mb-1'>
                Next Billing
              </Text>
              <Text className='text-sm font-medium text-foreground'>
                {dayjs(renewalDate).format('D MMMM YYYY')}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className='flex-row gap-3 mt-5'>
            <Pressable className='flex-1 bg-primary rounded-lg py-2.5 items-center justify-center active:opacity-80'>
              <Text className='text-sm font-semibold text-background'>
                Manage Plan
              </Text>
            </Pressable>

            <Pressable className='flex-1 bg-muted rounded-lg py-2.5 items-center justify-center active:opacity-80'>
              <Text className='text-sm font-semibold text-muted-foreground'>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default SubscriptionCard;
