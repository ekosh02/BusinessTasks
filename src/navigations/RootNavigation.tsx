import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {ComponentType} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigationType} from '../@types';
import SplashScreen from '../screens/splash/SplashScreen';
import TasksScreen from '../screens/bottomTabs/TasksTabScreen';
import {BottomNavigation} from './index';

const Stack = createStackNavigator<RootNavigationType>();

type RouteType = {
  name: keyof RootNavigationType;
  component: ComponentType<any>;
  options: StackNavigationOptions;
};

const RootNavigation = () => {
  const routes: RouteType[] = [
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
      name: 'TasksScreen',
      component: TasksScreen,
      options: {headerShown: false},
    },
  ];

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
