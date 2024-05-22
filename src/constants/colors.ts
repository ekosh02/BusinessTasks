import {colorType} from '../@types';

const LightTheme: colorType = {
  dark: false,
  colors: {
    primary: '#0088cc',
    background: '#fff',
    font: '#000',
    border: '#c4c4c4',
    input: {
      border: '#e8e8e8',
      background: '#f5f5f5',
    },
  },
};

const DarkTheme: colorType = {
  dark: true,
  colors: {
    primary: '#0088cc',
    background: '#000',
    font: '#fff',
    border: '#696969',
    input: {
      border: '#696969',
      background: '#363636',
    },
  },
};

export {LightTheme, DarkTheme};
