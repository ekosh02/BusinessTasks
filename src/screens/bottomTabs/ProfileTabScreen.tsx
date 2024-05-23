import React, {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Viewer} from '../../components';
import {useUser} from '../../providers';
import {typography} from '../../utils';
import {useTheme} from '../../hooks';

const ProfileTabScreen = () => {
  const {user} = useUser();
  const {colors, dark} = useTheme();

  const profilePosterView = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({backgroundColor: colors.placeholder}),
    [dark],
  );
  const profileText = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({color: colors.font}),
    [dark],
  );

  return (
    <Viewer scroll style={styles.view}>
      <View style={styles.profileView}>
        <View style={[styles.profilePosterView, profilePosterView]} />
        <Text style={[styles.profileNameText, profileText]}>
          {user?.name} {user?.surname}
        </Text>
        <Text style={[styles.profileEmailText, profileText]}>
          {user?.email}
        </Text>
      </View>
    </Viewer>
  );
};

const styles = StyleSheet.create({
  view: {paddingHorizontal: 16},
  profileView: {
    alignItems: 'center',
  },
  profilePosterView: {width: 120, height: 120, borderRadius: 60, marginTop: 24},
  profileNameText: {
    marginTop: 8,
    ...typography('headings'),
  },
  profileEmailText: {
    marginTop: 4,
    ...typography('content'),
  },
});

export default ProfileTabScreen;
