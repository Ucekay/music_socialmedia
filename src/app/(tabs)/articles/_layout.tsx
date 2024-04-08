import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { BlurView } from 'expo-blur';

export default function ArticleStack() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Articles',
          headerTransparent: true,
          headerStyle: { backgroundColor: 'rgba(256, 256, 256, 0.7)' },
          headerBackground: () => (
            <BlurView
              tint='light'
              intensity={60}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
    </Stack>
  );
}
