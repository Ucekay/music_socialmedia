import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { Stack, useNavigation } from 'expo-router';

export default function ModalScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title='Close'
              onPress={() => {
                // This will close the modal
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Text style={styles.title}>Modal</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <EditScreenInfo path='app/modal.tsx' />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
