import React from 'react';
import { Stack } from 'expo-router';
import { ProfileStateProvider } from '@/src/contexts/ProfileEditor';

const App = () => {
  return (
    <ProfileStateProvider>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
            presentation: 'modal',
            title: 'Profile Editor',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name='name-editor-modal'
          options={{
            headerShown: false,
            presentation: 'fullScreenModal',
            title: 'Name Editor',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name='id-editor-modal'
          options={{
            headerShown: false,
            presentation: 'modal',
            title: 'Id Editor',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name='help'
          options={{
            headerShown: false,
            title: 'help',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name='favoriteArtists-editor-modal'
          options={{
            headerShown: false,
            presentation: 'modal',
            title: 'Favorite Artists Editor',
            gestureEnabled: true,
          }}
        />
      </Stack>
    </ProfileStateProvider>
  );
};

export default App;
