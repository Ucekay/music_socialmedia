import { View, Text, Button } from 'react-native';
import React from 'react';
import { Link, useNavigation } from 'expo-router';

const discover = () => {
  const navigation = useNavigation();
  return (
    <Link href={'/today-song-modal'}>
      <View style={{ flex: 1 }}>
        <Text>discover</Text>
      </View>
    </Link>
  );
};

export default discover;
