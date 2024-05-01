import { View, StyleSheet, useColorScheme } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import UserProfileTop from '@/src/components/UserProfileTop';
import Colors from '@/src/constants/Colors';

export default function Profile() {
  const { userID } = useLocalSearchParams<{ userID: string }>();
  const colorScheme = useColorScheme();
  const themeContainerStyle = {
    backgroundColor: Colors[colorScheme ?? 'light'].background,
  };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <UserProfileTop userID={userID} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
