import React, {createContext, useContext, useState, ReactNode} from 'react';

type SettingsContextType = {
  user: any;
  setUser: (user: any) => void;
  token: null | string;
  setToken: (token: string | null) => void;
};

const Settings = createContext<SettingsContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

const useUser = (): SettingsContextType => {
  const value = useContext(Settings);
  return value;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <Settings.Provider value={{user, setUser, token, setToken}}>
      {children}
    </Settings.Provider>
  );
};

export {useUser, UserProvider};
