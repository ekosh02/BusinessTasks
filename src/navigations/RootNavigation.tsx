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
import {useLanguage, useUser} from '../providers';
import {useTheme} from '../hooks';
import {strings} from '../localization/localization';
import BoardDetailScreen from '../screens/board/BoardDetailScreen';
import AllUsers from '../screens/profile/AllUsers';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';

const Stack = createStackNavigator<RootNavigationType>();

type RouteType = {
  name: keyof RootNavigationType;
  component: ComponentType<any>;
  options?: StackNavigationOptions;
};

const RootNavigation = () => {
  const {language} = useLanguage();

  const {user} = useUser();

  const {colors, dark} = useTheme();

  const headerCommonStyle = useMemo<StackNavigationOptions>(
    () => ({
      headerStyle: {
        backgroundColor: colors.background,
        borderBottomColor: colors.border,
        borderBottomWidth: 0.5,
        shadowColor: colors.background,
      },
      headerTintColor: colors.font.primary,
    }),
    [dark],
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
        options: {headerTitle: strings.Регистрация, ...headerCommonStyle},
      },
      {
        name: 'AuthScreen',
        component: AuthScreen,
        options: {
          headerTitle: strings.Авторизоваться,
          ...headerCommonStyle,
          headerLeft: () => null,
        },
      },
    ],
    [language, dark],
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
        options: {
          headerTitle: strings['Доска'],
          headerShown: true,
          ...headerCommonStyle,
        },
      },
      {
        name: 'AllUsers',
        component: AllUsers,
        options: {
          headerTitle: strings['Все пользователи'],
          ...headerCommonStyle,
        },
      },
      {
        name: 'ProfileEditScreen',
        component: ProfileEditScreen,
        options: {
          headerTitle: strings['Изменить профиль'],
          ...headerCommonStyle,
        },
      },
    ],
    [language, dark],
  );

  const routes = useMemo(
    () => (user?.uid ? privateRoutes : publicRoutes),
    [user?.uid],
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
