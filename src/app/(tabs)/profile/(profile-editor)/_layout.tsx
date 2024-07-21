import React from 'react';
import { Stack } from 'expo-router';
import { ProfileStateProvider } from '@/src/contexts/ProfileEditor';

const App = () => {
  return (
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
            presentation: 'modal',
            title: 'Peofile Editor',
            gestureEnabled: false,
        }}/>
        <Stack.Screen
          name='name-editor-modal'
          options={{
            headerShown: false,
            presentation: 'modal',
            title: 'Name Editor',
            gestureEnabled: true,
        }}/>
        <Stack.Screen
          name='id-editor-modal'
          options={{
            headerShown: false,
            presentation: 'modal',
            title: 'Id Editor',
            gestureEnabled: true,
        }}/>
        <Stack.Screen
          name='bio-editor-modal'
          options={{
            headerShown: false,
            presentation: 'modal',
            title: 'Bio Editor',
            gestureEnabled: true,
        }}/>
      </Stack>
  );
};

export default App;