import { View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import UserProfileTop from '@/src/components/UserProfileTop';

export default function Profile() {
  const { userID } = useLocalSearchParams<{ userID: string }>();
  return (
    <View>
      <Stack.Screen
        options={{
          title: `${userID}`,
        }}
      />
      <UserProfileTop userID={userID} />
    </View>
  );
}
