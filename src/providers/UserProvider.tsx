import React, {createContext, useContext, useState, ReactNode} from 'react';
import {UserType} from '../@types';

type SettingsContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

const Settings = createContext<SettingsContextType>({
  user: null,
  setUser: () => {},
});

const useUser = (): SettingsContextType => {
  const value = useContext(Settings);
  return value;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <Settings.Provider value={{user, setUser}}>{children}</Settings.Provider>
  );
};

export {useUser, UserProvider};
