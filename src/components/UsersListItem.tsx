import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../contexts/ColorThemeContext';

import Text from './ThemedText';

import type { UsersListItemProps } from '../types';

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
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  image: {
    width: 44,
    height: 44,
    borderCurve: 'continuous',
    borderRadius: 22,
  },
  userID: {
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    fontSize: 12,
  },
});
