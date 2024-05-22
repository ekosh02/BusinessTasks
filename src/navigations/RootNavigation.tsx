import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {ComponentType, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigationType} from '../@types';
import SplashScreen from '../screens/splash/SplashScreen';
import {BottomNavigation} from './index';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createStackNavigator<RootNavigationType>();

type RouteType = {
  name: keyof RootNavigationType;
  component: ComponentType<any>;
  options: StackNavigationOptions;
};

const RootNavigation = () => {
  const routes = useMemo<RouteType[]>(
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
        name: 'LoginScreen',
        component: LoginScreen,
        options: {headerShown: true},
      },
    ],
    [],
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {routes.map((route, index) => (
          <Stack.Screen key={index} {...route} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
