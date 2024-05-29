import Main from './src/Main';
import {DarkModeProvider, UserProvider} from './src/providers';

const App = () => (
  <UserProvider>
    <DarkModeProvider>
      <Main />
    </DarkModeProvider>
  </UserProvider>
);

export default App;
