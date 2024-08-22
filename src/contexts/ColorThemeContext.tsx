import React, { createContext, useContext } from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';
import Colors, { TagColors } from '@/src/constants/Colors';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  colors: typeof Colors.light | typeof Colors.dark;
  tagsColors: typeof TagColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const theme = getThemeFromColorScheme(colorScheme);
  const colors = theme === 'light' ? Colors.light : Colors.dark;

  const value = {
    theme,
    colors,
    tagsColors: TagColors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function getThemeFromColorScheme(colorScheme: ColorSchemeName): Theme {
  return colorScheme === 'dark' ? 'dark' : 'light';
}
