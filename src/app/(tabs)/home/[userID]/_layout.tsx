import { View, StyleSheet } from 'react-native';
import {
  Tabs,
  withLayoutContext,
  useLocalSearchParams,
  Stack,
} from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserProfileTop from '@/src/components/UserProfileTop';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const ProfileNavigator = () => {
  const { userID } = useLocalSearchParams<{ userID: string }>();
  return (
    <View style={styles.container}>
      <TopTabs.Screen
        options={{
          title: `${userID}`,
        }}
      />
      <UserProfileTop userID={userID} />
      <TopTabs>
        <TopTabs.Screen name='index' options={{ title: 'Posts' }} />
      </TopTabs>
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
