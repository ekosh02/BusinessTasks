import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {ComponentType, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigationType} from '../@types';
import SplashScreen from '../screens/splash/SplashScreen';
import {BottomNavigation} from './index';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import {useUser} from '../providers';
import {useTheme} from '../hooks';
import {strings} from '../localization/localization';
import BoardDetailScreen from '../screens/board/BoardDetailScreen';

const Stack = createStackNavigator<RootNavigationType>();

type RouteType = {
  name: keyof RootNavigationType;
  component: ComponentType<any>;
  options?: StackNavigationOptions;
};

const RootNavigation = () => {
  const {user} = useUser();

  const {colors, dark} = useTheme();

  const publicRoutes = useMemo<RouteType[]>(
    () => [
      {
        name: 'SplashScreen',
        component: SplashScreen,
        options: {headerShown: false},
      },
      {
        name: 'RegistrationScreen',
        component: RegistrationScreen,
        options: {headerTitle: strings.Регистрация},
      },
      {
        name: 'AuthScreen',
        component: AuthScreen,
        options: {
          headerShown: true,
          headerLeft: () => null,
          headerTitle: strings.Авторизоваться,
        },
      },
    ],
    [strings.getLanguage()],
  );

  const privateRoutes = useMemo<RouteType[]>(
    () => [
      {
        name: 'SplashScreen',
        component: SplashScreen,
        options: {headerShown: false},
      },
      {
        name: 'BottomNavigation',
        component: BottomNavigation,
        options: {headerShown: false},
      },
      {
        name: 'BoardDetailScreen',
        component: BoardDetailScreen,
        options: {headerTitle: strings['Доска']},
      },
    ],
    [],
  );

  const routes = useMemo(
    () => (user?.uid ? privateRoutes : publicRoutes),
    [user?.uid],
  );

  const screenOptions: StackNavigationOptions = useMemo(
    () => ({
      headerTintColor: colors.font.primary,
      headerStyle: {
        backgroundColor: colors.background,
      },
    }),
    [dark],
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="SplashScreen">
        {routes.map(route => (
          <Stack.Screen key={route.name} {...route} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
