import React, {createContext, useContext, useState, ReactNode} from 'react';
import { availableLanguagesType } from '../@types';


type SettingsContextType = {
  language: availableLanguagesType;
  setlanguage: (language: availableLanguagesType) => void;
};

const Settings = createContext<SettingsContextType>({
  language: 'ru',
  setlanguage: () => {},
});

const useLanguage = (): SettingsContextType => {
  const value = useContext(Settings);
  return value;
};

type LanguageProviderProps = {
  children: ReactNode;
};

const LanguageProvider = ({children}: LanguageProviderProps) => {
  const [language, setlanguage] = useState<availableLanguagesType>('ru');

  return (
    <Settings.Provider value={{language, setlanguage}}>
      {children}
    </Settings.Provider>
  );
};

export {useLanguage, LanguageProvider};
