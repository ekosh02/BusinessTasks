import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import React, {ComponentType} from 'react';
import {BottomNavigationType} from '../@types';
import TasksTabScreen from '../screens/bottomTabs/TasksTabScreen';
import ProfileTabScreen from '../screens/bottomTabs/ProfileTabScreen';
import {ProfileIcon, TaskIcon} from '../assets';

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
        tabBarIcon: ({focused}) => <TaskIcon active={focused} />,
      },
    },
    {
      name: 'ProfileTabScreen',
      component: ProfileTabScreen,
      options: {
        tabBarIcon: ({focused}) => <ProfileIcon active={focused} />,
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
