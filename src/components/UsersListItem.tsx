import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';

import type { UsersListItemProps } from '../types';
import Text from './ThemedText';
import { useTheme } from '../contexts/ColorThemeContext';

const UsersListItem = ({ userAvatarUrl, userID, user }: UsersListItemProps) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Image source={userAvatarUrl} style={styles.image} />
      <View>
        <Text style={styles.userID}>{userID}</Text>
        <Text style={[styles.userName, { color: colors.secondaryText }]}>
          {user}
        </Text>
      </View>
    </View>
  );
};

export default UsersListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderCurve: 'continuous',
  },
  userID: {
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    fontSize: 12,
  },
});
