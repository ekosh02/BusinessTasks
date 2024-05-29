import {useEffect, useState} from 'react';
import {UserType} from './@types';
import {RootNavigation} from './navigations';
import {useDarkMode, useUser} from './providers';
import {getStorage} from './utils';
import {Viewer} from './components';

const Main = () => {
  const {setUser} = useUser();
  const {setIsDarkMode} = useDarkMode();
  const [loading, setLoading] = useState(true);

  const getStorageData = async () => {
    try {
      const userData: UserType = await getStorage('userData');
      const isDarkMode = await getStorage('isDarkMode');
      setIsDarkMode(isDarkMode);
      userData && setUser(userData);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStorageData();
  }, []);

  return (
    <Viewer loading={loading}>
      <RootNavigation />
    </Viewer>
  );
};

export default Main;
