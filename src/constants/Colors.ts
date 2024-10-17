import palette from '@evilmartians/harmony/dist/base';
import chroma from 'chroma-js';

import type { ColorScheme } from '@/src/types';

const tintColorLight = chroma(palette.blue['500']).hex();
const tintColorDark = chroma(palette.blue['400']).hex();
const tabBarGradientLight = ['rgba(256,256,256,0)', 'rgba(256,256,256,1)'];
const tabBarGradientDark = ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'];
const headerLight = 'rgba(250, 251, 254, 0.7)';
const headerDark = 'rgba(0, 0, 0, 0.7)';

const Colors: {
  light: ColorScheme;
  dark: ColorScheme;
} = {
  light: {
    text: '#000',
    secondaryText: chroma(palette.zinc['600']).hex(),
    background: '#fff',
    secondaryBackground: chroma(palette.zinc['100']).hex(),
    tabBarGradient: tabBarGradientLight as [string, string],
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
    buttonFilled: chroma(palette.blue['500']).hex(),
    buttonBezeled: chroma(palette.blue['200']).hex(),
    buttonBezeledGray: chroma(palette.zinc['100']).hex(),
    buttonBorderless: 'transparent',
    buttonText: 'white',
    buttonGhostText: chroma(palette.zinc['900']).hex(),
    buttonDisabled: chroma(palette.zinc['300']).hex(),
    buttonDisabledText: chroma(palette.zinc['100']).hex(),
    searchBar: chroma(palette.zinc['400']).alpha(0.25).hex(),
    editorHighlight: chroma(palette.blue['500']).alpha(0.3),
    playerObject1: chroma(palette.amber['300']).alpha(0.3).hex(),
    playerObject2: chroma(palette.lime['300']).hex(),
    playerObject3: chroma(palette.sky['300']).hex(),
  },
  dark: {
    text: '#fff',
    secondaryText: chroma(palette.zinc['400']).hex(),
    background: '#000',
    secondaryBackground: chroma(palette.zinc['900']).hex(),
    tabBarGradient: tabBarGradientDark as [string, string],
    headerBackground: headerDark,
    tint: tintColorDark,
    border: chroma(palette.zinc['700']).hex(),
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    followButtonBg: chroma(palette.zinc['200']).hex(),
    followButtonText: chroma(palette.zinc['900']).hex(),
    placeholder: chroma(palette.zinc['600']).hex(),
    appleMusicText: chroma(palette.rose['300']).hex(),
    appleMusicBg: chroma(palette.rose['800']).hex(),
    cancelBg: chroma(palette.red['800']).hex(),
    cancelText: chroma(palette.red['300']).hex(),
    buttonFilled: chroma(palette.blue['500']).hex(),
    buttonBezeled: chroma(palette.blue['800']).hex(),
    buttonBezeledGray: chroma(palette.zinc['900']).hex(),
    buttonBorderless: 'transparent',
    buttonText: 'white',
    buttonGhostText: chroma(palette.zinc['100']).hex(),
    buttonDisabled: chroma(palette.zinc['900']).hex(),
    buttonDisabledText: chroma(palette.zinc['600']).hex(),
    searchBar: chroma(palette.gray['700']).alpha(0.25).hex(),
    editorHighlight: chroma(palette.blue['500']).alpha(0.3),
    playerObject1: chroma(palette.amber['200']).hex(),
    playerObject2: chroma(palette.lime['200']).hex(),
    playerObject3: chroma(palette.sky['200']).hex(),
  },
};

export default Colors;

export const TagColors: {
  light: {
    [key: string]: {
      background: string;
      text: string;
      tint: string;
    };
  };
  dark: {
    [key: string]: {
      background: string;
      text: string;
      tint: string;
    };
  };
} = {
  light: {
    general: {
      background: chroma(palette.purple['200']).hex(),
      text: chroma(palette.purple['700']).hex(),
      tint: chroma(palette.purple['500']).hex(),
    },
    review: {
      background: chroma(palette.blue['200']).hex(),
      text: chroma(palette.blue['700']).hex(),
      tint: chroma(palette.blue['500']).hex(),
    },
    liveReport: {
      background: chroma(palette.amber['200']).hex(),
      text: chroma(palette.amber['700']).hex(),
      tint: chroma(palette.amber['500']).hex(),
    },
    playlist: {
      background: chroma(palette.rose['200']).hex(),
      text: chroma(palette.rose['700']).hex(),
      tint: chroma(palette.rose['500']).hex(),
    },
  },
  dark: {
    general: {
      background: chroma(palette.purple['800']).hex(),
      text: chroma(palette.purple['300']).hex(),
      tint: chroma(palette.purple['500']).hex(),
    },
    review: {
      background: chroma(palette.blue['800']).hex(),
      text: chroma(palette.blue['300']).hex(),
      tint: chroma(palette.blue['500']).hex(),
    },
    liveReport: {
      background: chroma(palette.amber['800']).hex(),
      text: chroma(palette.amber['300']).hex(),
      tint: chroma(palette.amber['500']).hex(),
    },
    playlist: {
      background: chroma(palette.rose['800']).hex(),
      text: chroma(palette.rose['300']).hex(),
      tint: chroma(palette.rose['500']).hex(),
    },
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
