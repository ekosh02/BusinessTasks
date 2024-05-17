import { RootNavigation } from './navigations';
import { DarkModeProvider } from './provider';


const Main = () => {
  return (
    <DarkModeProvider>
      <RootNavigation />
    </DarkModeProvider>
  );
};

export default Main;
