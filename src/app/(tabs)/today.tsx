import { Button, Pressable, View } from 'react-native';
import { useState } from 'react';

import Text from '@/src/components/ThemedText';
import BgView from '@/src/components/ThemedBgView';
import { Link } from 'expo-router';

const TodayScreen = () => {
  return (
    <BgView
      style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
    >
      <Pressable>
        <Link href='/today-song-modal'>
          <Text>open modal</Text>
        </Link>
      </Pressable>
    </BgView>
  );
};

export default TodayScreen;
