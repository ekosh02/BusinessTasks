import {DarkTheme, LightTheme} from '../constants';
import {useDarkMode} from '../provider';

const useTheme = () => {
  const {isDarkMode} = useDarkMode();

  return isDarkMode ? DarkTheme : LightTheme;
};

export default useTheme;
