const amber = {
  200: '#f8e0c8',
  300: '#f4c79a',
  700: '#975b03',
  800: '#6c4002',
};

const blue = {
  200: '#cbe8fd',
  300: '#9fd5fc',
  700: '#0a6fa3',
  800: '#054f75',
};

const rose = {
  200: '#ffdbe5',
  300: '#febdd0',
  700: '#a24d6a',
  800: '#74364b',
};

const slate = {
  50: '#fafbfe',
  200: '#dfe3f4',
  300: '#cacedf',
  400: '#b5b9ca',
  600: '#808393',
  700: '#666978',
  800: '#474a58',
  900: '#2b2e3b',
  950: '#11141f',
};

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const tabBarGradientLight = ['rgba(256,256,256,0)', 'rgba(256,256,256,1)'];
const tabBarGradientDark = ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'];
const headerLight = 'rgba(256, 256, 256, 0.7)';
const headerDark = 'rgba(0, 0, 0, 0.7)';

export default {
  light: {
    text: '#000',
    secondlyText: slate[600],
    background: '#fff',
    secondlyBackground: slate[50],
    tabBarGradient: tabBarGradientLight,
    headerBackground: headerLight,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    secondlyText: slate[400],
    background: '#000',
    secondlyBackground: slate[900],
    tabBarGradient: tabBarGradientDark,
    headerBackground: headerDark,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const TagsColors = {
  general: {
    light: {
      background: slate[200],
      text: slate[700],
    },
    dark: {
      background: slate[800],
      text: slate[300],
    },
  },
  review: {
    light: {
      background: blue[200],
      text: blue[700],
    },
    dark: {
      background: blue[800],
      text: blue[300],
    },
  },
  liveReport: {
    light: {
      background: amber[200],
      text: amber[700],
    },
    dark: {
      background: amber[800],
      text: amber[300],
    },
  },
  playlist: {
    light: {
      background: rose[200],
      text: rose[700],
    },
    dark: {
      background: rose[800],
      text: rose[300],
    },
  },
};

export const COLORS = {
  neutral900: '#1D222A',
  neutral700: '#435060',
  neutral500: '#5C6D85',
  neutral300: '#7A8BA3',
  neutral100: '#D9D9D9',
  neutral50: '#F2F4F6',
};
