import { RootNavigation } from './navigations';
import { DarkModeProvider } from './providers';


const Main = () => {
  return (
    <DarkModeProvider>
      <RootNavigation />
    </DarkModeProvider>
  );
};

export default Main;
