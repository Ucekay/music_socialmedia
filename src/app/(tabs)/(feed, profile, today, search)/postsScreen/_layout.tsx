import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Stack } from 'expo-router';

import { useTheme } from '@/src/contexts/ColorThemeContext';

const PostStack = () => {
  const { colors } = useTheme();
  const themeContainerStyle = { backgroundColor: colors.headerBackground };

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Posts',
          headerTransparent: true,
          headerStyle: { ...themeContainerStyle },
          headerBackground: () => (
            <BlurView tint='regular' style={StyleSheet.absoluteFill} />
          ),
        }}
      />
    </Stack>
  );
};

export default PostStack;
