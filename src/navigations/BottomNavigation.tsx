import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import React, {ComponentType, useMemo} from 'react';
import {BottomNavigationType, RootNavigationType} from '../@types';
import BoardTabScreen from '../screens/bottomTabs/BoardTabScreen';
import ProfileTabScreen from '../screens/bottomTabs/ProfileTabScreen';
import {ProfileIcon, TaskIcon, PlusIcon} from '../assets';
import {useTheme} from '../hooks';
import {strings} from '../localization/localization';
import {IconButton} from '../components';
import {StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { useLanguage } from '../providers';

const Tab = createBottomTabNavigator();

type RouteType = {
  name: keyof BottomNavigationType;
  component: ComponentType<any>;
  options: BottomTabNavigationOptions;
};

type BottomNavigationProps = NativeStackScreenProps<
  RootNavigationType,
  'BottomNavigation'
>;

const BottomNavigation = ({navigation}: BottomNavigationProps) => {
  const {colors, dark} = useTheme();
  const {language} = useLanguage()

  const headerCommonStyle = useMemo<BottomTabNavigationOptions>(
    () => ({
      headerShown: true,
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

  const routes = useMemo<RouteType[]>(
    () => [
      {
        name: 'BoardTabScreen',
        component: BoardTabScreen,
        options: {
          ...headerCommonStyle,
          headerTitle: strings.Доски,
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
    [dark, language],
  );

  const screenOptions: BottomTabNavigationOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderTopWidth: 0.5,
      },
    }),
    [dark],
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {routes.map((route, index) => (
        <Tab.Screen key={index} {...route} />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  rightIconView: {
    padding: 10,
  },
});

export default BottomNavigation;
