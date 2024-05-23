import palette from '@evilmartians/harmony/dist/base';
import chroma from 'chroma-js';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const tabBarGradientLight = ['rgba(256,256,256,0)', 'rgba(256,256,256,1)'];
const tabBarGradientDark = ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'];
const headerLight = 'rgba(250, 251, 254, 0.7)';
const headerDark = 'rgba(0, 0, 0, 0.7)';

const Colors = {
  light: {
    text: '#000',
    secondaryText: chroma(palette.zinc['800']).hex(),
    background: '#fff',
    secondaryBackground: chroma(palette.zinc['100']).hex(),
    tabBarGradient: tabBarGradientLight,
    headerBackground: headerLight,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    followButtonBg: chroma(palette.zinc['900']).hex(),
    followButtonText: 'white',
    menuBorder: chroma(palette.slate['100']).hex(),
    placeholder: chroma(palette.zinc['400']).hex(),
    appleMusicText: chroma(palette.rose['700']).hex(),
    appleMusicBg: chroma(palette.rose['200']).hex(),
  },
  dark: {
    text: '#fff',
    secondaryText: chroma(palette.zinc['200']).hex(),
    background: '#000',
    secondaryBackground: chroma(palette.zinc['900']).hex(),
    tabBarGradient: tabBarGradientDark,
    headerBackground: headerDark,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    followButtonBg: chroma(palette.zinc['100']).hex(),
    followButtonText: 'black',
    menuBorder: chroma(palette.zinc['700']).hex(),
    placeholder: chroma(palette.zinc['600']).hex(),
    appleMusicText: chroma(palette.rose['300']).hex(),
    appleMusicBg: chroma(palette.rose['800']).hex(),
  },
};

export default Colors;

export const TagsColors = {
  general: {
    light: {
      background: chroma(palette.purple['200']).hex(),
      text: chroma(palette.purple['700']).hex(),
    },
    dark: {
      background: chroma(palette.purple['800']).hex(),
      text: chroma(palette.purple['300']).hex(),
    },
    tint: chroma(palette.purple['500']).hex(),
  },
  review: {
    light: {
      background: chroma(palette.blue['200']).hex(),
      text: chroma(palette.blue['700']).hex(),
    },
    dark: {
      background: chroma(palette.blue['800']).hex(),
      text: chroma(palette.blue['300']).hex(),
    },
    tint: chroma(palette.blue['500']).hex(),
  },
  liveReport: {
    light: {
      background: chroma(palette.amber['200']).hex(),
      text: chroma(palette.amber['700']).hex(),
    },
    dark: {
      background: chroma(palette.amber['800']).hex(),
      text: chroma(palette.amber['300']).hex(),
    },
    tint: chroma(palette.amber['500']).hex(),
  },
  playlist: {
    light: {
      background: chroma(palette.rose['200']).hex(),
      text: chroma(palette.rose['700']).hex(),
    },
    dark: {
      background: chroma(palette.rose['800']).hex(),
      text: chroma(palette.rose['300']).hex(),
    },
    tint: chroma(palette.rose['500']).hex(),
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
