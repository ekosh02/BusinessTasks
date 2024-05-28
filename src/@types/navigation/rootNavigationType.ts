import {BoardType} from '../collections/BoardType';

type RootNavigationType = {
  SplashScreen: undefined;
  BottomNavigation: undefined;
  TasksScreen: undefined;
  RegistrationScreen: undefined;
  AuthScreen: undefined;
  BoardDetailScreen?: {boardData?: BoardType};
  BoardTabScreen: {reload?: boolean};
  ProfileTabScreen: undefined
};

export default RootNavigationType;
