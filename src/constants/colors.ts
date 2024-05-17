import {colorType} from '../@types';

const LightTheme: colorType = {
  dark: false,
  colors: {
    primary: '#0088cc',
    background: '#fff',
    font: '#000',
    border: '#c4c4c4',
  },
};

const DarkTheme: colorType = {
  dark: true,
  colors: {
    primary: '#0088cc',
    background: '#000',
    font: '#fff',
    border: '#696969',
  },
};

export {LightTheme, DarkTheme};
