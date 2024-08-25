import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import BgView from '../components/ThemedBgView';
import todaySongData from '@/src/assets/todaySongData';
import TodaySongCard from '@/src/components/TodaySongCard';

const TodaySongModal = () => {
  const { width } = useWindowDimensions();
  return (
    <BgView style={{ flex: 1 }}>
      <FlashList
        horizontal
        pagingEnabled
        data={todaySongData}
        renderItem={({ item }) => (
          <TodaySongCard
            currentSong={item}
            isEditing={false}
            isSongInfoVisible
          />
        )}
        estimatedItemSize={width}
        showsHorizontalScrollIndicator={false}
      />
    </BgView>
  );
};

export default TodaySongModal;
