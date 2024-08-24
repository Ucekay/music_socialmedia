import { View, Text } from 'react-native';
import React from 'react';
import TrackSearchField from '@/src/components/TrackSearchField';

const discover = () => {
  const [search, setSearch] = React.useState('');
  return (
    <View style={{ flex: 1 }}>
      <Text>discover</Text>
      <TrackSearchField
        placeholder='test'
        trackName={search}
        setTrackName={setSearch}
      />
    </View>
  );
};

export default discover;
