import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../contexts/ThemeContext';
import {EmptyMessage, EmptyTitle} from './styled';

type EmptyStateProps = {
  icon?: string;
  title: string;
  message: string;
};

export default function EmptyState({
  icon = 'account-balance-wallet',
  title,
  message,
}: EmptyStateProps) {
  const {colors, typography} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 48, paddingHorizontal: 24}}>
      <Icon
        name={icon}
        size={56}
        color={colors.textSecondary}
        style={{marginBottom: 16}}
      />
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyMessage>{message}</EmptyMessage>
    </View>
  );
}
