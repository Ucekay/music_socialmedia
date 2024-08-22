import palette from '@evilmartians/harmony/dist/base';
import chroma from 'chroma-js';
import type { ColorScheme } from '@/src/types';

const tintColorLight = chroma(palette.sky['500']).hex();
const tintColorDark = chroma(palette.sky['500']).hex();
const tabBarGradientLight = ['rgba(256,256,256,0)', 'rgba(256,256,256,1)'];
const tabBarGradientDark = ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'];
const headerLight = 'rgba(250, 251, 254, 0.7)';
const headerDark = 'rgba(0, 0, 0, 0.7)';

const Colors: {
  light: ColorScheme;
  dark: ColorScheme;
} = {
  light: {
    text: chroma(palette.zinc['900']).hex(),
    secondaryText: chroma(palette.zinc['600']).hex(),
    background: '#fff',
    secondaryBackground: chroma(palette.zinc['100']).hex(),
    tabBarGradient: tabBarGradientLight,
    headerBackground: headerLight,
    tint: tintColorLight,
    border: chroma(palette.zinc['300']).hex(),
    tabIconDefault: chroma(palette.zinc['400']).hex(),
    tabIconSelected: tintColorLight,
    followButtonBg: chroma(palette.zinc['800']).hex(),
    followButtonText: chroma(palette.zinc['100']).hex(),
    placeholder: chroma(palette.zinc['400']).hex(),
    appleMusicText: chroma(palette.rose['700']).hex(),
    appleMusicBg: chroma(palette.rose['100']).hex(),
    cancelBg: chroma(palette.red['100']).hex(),
    cancelText: chroma(palette.red['700']).hex(),
    buttonSolid: palette.zinc['900'],
    buttonGhost: 'transparent',
    buttonOutline: 'transparent',
    buttonOutlineBorder: palette.zinc['900'],
    buttonText: palette.zinc['100'],
    buttonGhostText: palette.zinc['900'],
    buttonDisabled: palette.zinc['300'],
    buttonDisabledText: palette.zinc['500'],
  },
  dark: {
    text: '#fff',
    secondaryText: chroma(palette.zinc['200']).hex(),
    background: '#000',
    secondaryBackground: chroma(palette.zinc['900']).hex(),
    tabBarGradient: tabBarGradientDark,
    headerBackground: headerDark,
    tint: tintColorDark,
    border: chroma(palette.zinc['700']).hex(),
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    followButtonBg: chroma(palette.zinc['100']).hex(),
    followButtonText: 'black',
    placeholder: chroma(palette.zinc['600']).hex(),
    appleMusicText: chroma(palette.rose['300']).hex(),
    appleMusicBg: chroma(palette.rose['800']).hex(),
    cancelBg: chroma(palette.red['800']).hex(),
    cancelText: chroma(palette.red['300']).hex(),
    buttonSolid: palette.zinc['100'],
    buttonGhost: 'transparent',
    buttonOutline: 'transparent',
    buttonOutlineBorder: palette.zinc['100'],
    buttonText: palette.zinc['900'],
    buttonGhostText: palette.zinc['100'],
    buttonDisabled: palette.zinc['700'],
    buttonDisabledText: palette.zinc['500'],
  },
};

export default Colors;

export const TagColors = {
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

export const heartIconColors = {
  default: {},
};

export const COLORS = {
  neutral900: '#1D222A',
  neutral700: '#435060',
  neutral500: '#5C6D85',
  neutral300: '#7A8BA3',
  neutral100: '#D9D9D9',
  neutral50: '#F2F4F6',
};
