import {RootNavigation} from './navigations';
import {DarkModeProvider, UserProvider} from './providers';

const Main = () => {
  return (
    <UserProvider>
      <DarkModeProvider>
        <RootNavigation />
      </DarkModeProvider>
    </UserProvider>
  );
};

export default Main;
