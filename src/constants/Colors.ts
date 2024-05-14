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
    secondlyText: chroma(palette.slate['600']).hex(),
    background: '#fff',
    secondlyBackground: chroma(palette.slate['50']).hex(),
    tabBarGradient: tabBarGradientLight,
    headerBackground: headerLight,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    followButtonBg: chroma(palette.slate['900']).hex(),
    followButtonText: 'white',
  },
  dark: {
    text: '#fff',
    secondlyText: chroma(palette.slate['400']).hex(),
    background: '#000',
    secondlyBackground: chroma(palette.slate['900']).hex(),
    tabBarGradient: tabBarGradientDark,
    headerBackground: headerDark,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    followButtonBg: chroma(palette.slate['100']).hex(),
    followButtonText: 'black',
  },
};

export default Colors;

export const TagsColors = {
  general: {
    light: {
      background: chroma(palette.slate['200']).hex(),
      text: chroma(palette.slate['700']).hex(),
    },
    dark: {
      background: chroma(palette.slate['800']).hex(),
      text: chroma(palette.slate['300']).hex(),
    },
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
  },
  playlist: {
    light: {
      background: chroma(palette.purple['200']).hex(),
      text: chroma(palette.purple['700']).hex(),
    },
    dark: {
      background: chroma(palette.purple['800']).hex(),
      text: chroma(palette.purple['300']).hex(),
    },
  },
};

export const iconColors = {
  waveform: chroma(palette.rose['500']).hex(),
  musicMic: chroma(palette.rose['500']).hex(),
  location: chroma(palette.teal['500']).hex(),
  listBullet: chroma(palette.amber['500']).hex(),
};

export const COLORS = {
  neutral900: '#1D222A',
  neutral700: '#435060',
  neutral500: '#5C6D85',
  neutral300: '#7A8BA3',
  neutral100: '#D9D9D9',
  neutral50: '#F2F4F6',
};
