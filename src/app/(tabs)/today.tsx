import { Button, View } from 'react-native';

import TodaySongModal from '@/src/components/TodaySongModal';
import { useState } from 'react';

const TodayScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button onPress={() => setModalVisible(true)} title='Open Modal' />
      <TodaySongModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default TodayScreen;
