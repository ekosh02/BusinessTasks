import {DarkTheme, LightTheme} from '../constants';
import {useDarkMode} from '../providers';

const useTheme = () => {
  const {isDarkMode} = useDarkMode();

  return isDarkMode ? DarkTheme : LightTheme;
};

export default useTheme;
