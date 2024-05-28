import {colorType} from '../@types';

const LightTheme: colorType = {
  dark: false,
  colors: {
    primary: '#0088cc',
    green: '#4BB34B',
    background: '#fff',
    font: {
      primary: '#000',
      gray: '#808080',
    },
    border: '#c4c4c4',
    placeholder: '#8897A5',
    red: '#FA7364',
    icon: '#808080',
    card: '#f5f5f5',
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
    green: '#4BB34B',
    background: '#1f1f1f',
    font: {
      primary: '#fff',
      gray: '#AAAEB3',
    },
    border: '#696969',
    placeholder: '#c7c7c7',
    red: '#FA7364',
    icon: '#ffffff',
    card: '#363636',
    input: {
      border: '#696969',
      background: '#363636',
    },
  },
};

export {LightTheme, DarkTheme};
