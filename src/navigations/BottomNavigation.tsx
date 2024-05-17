import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import React, {ComponentType} from 'react';
import {BottomNavigationType} from '../@types';
import TasksTabScreen from '../screens/bottomTabs/TasksTabScreen';

const Tab = createBottomTabNavigator();

type RouteType = {
  name: keyof BottomNavigationType;
  component: ComponentType<any>;
  options: BottomTabNavigationOptions;
};

const BottomNavigation = () => {
  const routes: RouteType[] = [
    {
      name: 'TasksTabScreen',
      component: TasksTabScreen,
      options: {
        // tabBarIcon: ({ focused }) => <TasksIcon active={focused} />,
      },
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      {routes.map((route, index) => (
        <Tab.Screen key={index} {...route} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
