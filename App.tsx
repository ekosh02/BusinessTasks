import Main from './src/Main';
import {DarkModeProvider, UserProvider, LanguageProvider} from './src/providers';

const App = () => (
  <UserProvider>
    <DarkModeProvider>
      <LanguageProvider>
        <Main />
      </LanguageProvider>
    </DarkModeProvider>
  </UserProvider>
);

export default App;
