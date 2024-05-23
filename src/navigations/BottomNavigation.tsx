import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import React, {ComponentType, useCallback, useMemo} from 'react';
import {BottomNavigationType} from '../@types';
import TasksTabScreen from '../screens/bottomTabs/TasksTabScreen';
import ProfileTabScreen from '../screens/bottomTabs/ProfileTabScreen';
import {ProfileIcon, TaskIcon} from '../assets';
import {useTheme} from '../hooks';

const Tab = createBottomTabNavigator();

type RouteType = {
  name: keyof BottomNavigationType;
  component: ComponentType<any>;
  options: BottomTabNavigationOptions;
};

const BottomNavigation = () => {
  const {colors, dark} = useTheme();

  const routes = useMemo<RouteType[]>(
    () => [
      {
        name: 'TasksTabScreen',
        component: TasksTabScreen,
        options: {
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <TaskIcon
              active={focused}
              activeColor={colors.primary}
              passiveColor={colors.icon}
            />
          ),
        },
      },
      {
        name: 'ProfileTabScreen',
        component: ProfileTabScreen,
        options: {
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <ProfileIcon
              active={focused}
              activeColor={colors.primary}
              passiveColor={colors.icon}
            />
          ),
        },
      },
    ],
    [dark],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
      }}>
      {routes.map((route, index) => (
        <Tab.Screen key={index} {...route} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
