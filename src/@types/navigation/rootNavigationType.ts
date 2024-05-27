import {BoardType} from '../collections/BoardType';

type RootNavigationType = {
  SplashScreen: undefined;
  BottomNavigation: undefined;
  TasksScreen: undefined;
  RegistrationScreen: undefined;
  AuthScreen: undefined;
  BoardDetailScreen?: {boardData?: BoardType};
  BoardTabScreen: undefined;
  ProfileTabScreen: undefined
};

export default RootNavigationType;
