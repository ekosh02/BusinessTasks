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

  const handleCreateBoard = () => navigation.navigate('BoardDetailScreen');

  const routes = useMemo<RouteType[]>(
    () => [
      {
        name: 'BoardTabScreen',
        component: BoardTabScreen,
        options: {
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
            borderBottomWidth: 0.5,
            shadowColor: colors.background,
          },
          headerTintColor: colors.font.primary,
          headerPressColor: 'red',
          headerTitle: strings.Доски,
          headerRight: () => (
            <IconButton
              icon={<PlusIcon color={colors.icon} size="32" />}
              onPress={handleCreateBoard}
              style={styles.rightIconView}
            />
          ),
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
    [dark, strings.getLanguage()],
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
