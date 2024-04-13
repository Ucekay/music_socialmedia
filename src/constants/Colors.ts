const slate = {
  50: '#fafbfe',
  400: '#b5b9ca',
  600: '#808393',
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

export const COLORS = {
  neutral900: '#1D222A',
  neutral700: '#435060',
  neutral500: '#5C6D85',
  neutral300: '#7A8BA3',
  neutral100: '#D9D9D9',
  neutral50: '#F2F4F6',
};
