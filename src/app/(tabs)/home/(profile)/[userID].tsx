import { View, StyleSheet } from 'react-native';
import { withLayoutContext, useLocalSearchParams, Stack } from 'expo-router';
import { Tabs } from 'react-native-collapsible-tab-view';
import UserProfileTop from '@/src/components/UserProfileTop';
import userData from '@/src/assets/userData';

const ProfileNavigator = () => {
  const { userID } = useLocalSearchParams<{ userID: string }>();
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `${userID}`,
        }}
      />
    </View>
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
