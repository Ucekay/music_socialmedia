import { useEffect } from 'react';

import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from '@/src/contexts/ColorThemeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <ActionSheetProvider>
          <BottomSheetModalProvider>
            <ThemeProvider>
              <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen
                  name='modal'
                  options={{ presentation: 'fullScreenModal' }}
                />
                <Stack.Screen
                  name='article-editor-modal'
                  options={{
                    title: 'Article Editor',
                    headerTransparent: true,
                    presentation: 'modal',
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen
                  name='post-editor-modal'
                  options={{
                    headerShown: false,
                    title: 'Post Editor',
                    presentation: 'modal',
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen
                  name='reply-editor-modal'
                  options={{
                    headerShown: false,
                    title: 'Reply Editor',
                    presentation: 'modal',
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen
                  name='today-song-editor-modal'
                  options={{
                    title: '今日の一曲を編集',
                    presentation: 'modal',
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen
                  name='today-song-modal'
                  options={{
                    title: 'Today',
                    presentation: 'fullScreenModal',
                    gestureEnabled: false,
                  }}
                />
              </Stack>
            </ThemeProvider>
          </BottomSheetModalProvider>
        </ActionSheetProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
