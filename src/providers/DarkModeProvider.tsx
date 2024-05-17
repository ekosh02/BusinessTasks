import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {StatusBar} from 'react-native';

type SettingsContextType = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
};

const Settings = createContext<SettingsContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});

const useDarkMode = (): SettingsContextType => {
  const value = useContext(Settings);
  return value;
};

type DarkModeProviderProps = {
  children: ReactNode;
};

const DarkModeProvider = ({children}: DarkModeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  return (
    <Settings.Provider value={{isDarkMode, setIsDarkMode}}>
      {children}
    </Settings.Provider>
  );
};

export {useDarkMode, DarkModeProvider};
