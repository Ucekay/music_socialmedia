import { ProfileStateProvider } from '@/src/contexts/ProfileEditor';
import { Stack } from 'expo-router';
import React from 'react';

const App = () => {
  return (
    <ProfileStateProvider>
      <Stack>
        <Stack.Screen
          name='profile-editor-modal'
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
            presentation: 'modal',
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
          name='bio-editor-modal'
          options={{
            headerShown: false,
            presentation: 'modal',
            title: 'Bio Editor',
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
