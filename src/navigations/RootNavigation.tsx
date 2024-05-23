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

const Stack = createStackNavigator<RootNavigationType>();

type RouteType = {
  name: keyof RootNavigationType;
  component: ComponentType<any>;
  options: StackNavigationOptions;
};

const RootNavigation = () => {
  const {user} = useUser();

  const {colors} = useTheme();

  const privateRoutes = useMemo<RouteType[]>(
    () => [
      {
        name: 'SplashScreen',
        component: SplashScreen,
        options: {headerShown: false},
      },
      {
        name: 'RegistrationScreen',
        component: RegistrationScreen,
        options: {headerShown: true, headerTitle: strings.Регистрация},
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

  const publicRoutes = useMemo<RouteType[]>(
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
    ],
    [],
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.font,
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}>
        {user?.uid
          ? publicRoutes.map((route, index) => (
              <Stack.Screen key={index} {...route} />
            ))
          : privateRoutes.map((route, index) => (
              <Stack.Screen key={index} {...route} />
            ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
