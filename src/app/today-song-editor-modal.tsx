import { View, Text, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const TodaySongModal = () => {
  return (
    <View>
      <Text>TodaySongModal</Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default TodaySongModal;
