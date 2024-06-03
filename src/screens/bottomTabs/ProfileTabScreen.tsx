import React, {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Switch,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  FlatList,
  Linking,
} from 'react-native';
import {Modal, Viewer} from '../../components';
import {useDarkMode, useLanguage, useUser} from '../../providers';
import {setStorage, typography} from '../../utils';
import {useTheme, useToggle} from '../../hooks';
import TextButton from '../../components/buttons/TextButton';
import {strings} from '../../localization/localization';
import {ArrowMiniRightIcon} from '../../assets';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigationType, availableLanguagesType} from '../../@types';

type ProfileTabScreenType = NativeStackScreenProps<
  RootNavigationType,
  'ProfileTabScreen'
>;

const availableLanguages: availableLanguagesType[] = ['kk', 'ru', 'en'];

const ProfileTabScreen = ({navigation}: ProfileTabScreenType) => {
  const {user, setUser} = useUser();
  const {colors, dark} = useTheme();
  const {setlanguage, language} = useLanguage();
  const [languageVisible, toggleLanguageVisible] = useToggle(false);

  const {isDarkMode, setIsDarkMode} = useDarkMode();

  const handleLogout = async () => {
    setUser(null);
    await setStorage('userData', null);
  };

  const handleDarkMode = async () => {
    await setStorage('isDarkMode', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = async (language: availableLanguagesType) => {
    strings.setLanguage(language);
    await setStorage('language', language);
    setlanguage(language);
  };

  const handleAllUsers = () => navigation.navigate('AllUsers');

  const handleEdit = () => navigation.navigate('ProfileEditScreen');
  const handleSupport = async () =>
    await Linking.openURL('https://t.me/Aidos0451');

  const sections = useMemo(
    () => [
      {
        id: 1,
        title: strings.Язык,
        onPress: toggleLanguageVisible,
        rightView: <ArrowMiniRightIcon color={colors.icon} />,
        show: true,
      },
      {
        id: 2,
        title: strings['Темный режим'],
        onPress: handleDarkMode,
        rightView: (
          <Switch
            trackColor={{true: colors.primary}}
            thumbColor={colors.icon}
            onValueChange={handleDarkMode}
            value={isDarkMode}
          />
        ),
        show: true,
      },
      {
        id: 3,
        title: strings['Все пользователи'],
        onPress: handleAllUsers,
        rightView: <ArrowMiniRightIcon color={colors.icon} />,
        show: true,
      },
      {
        id: 4,
        title: strings.Поддержка,
        onPress: handleSupport,
        rightView: <ArrowMiniRightIcon color={colors.icon} />,
        show: true,
      },
    ],
    [isDarkMode, language],
  );

  const profilePosterView = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({backgroundColor: colors.placeholder}),
    [dark],
  );

  const profileText = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({color: colors.font.primary}),
    [dark],
  );

  const logoutText = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({color: colors.red}),
    [dark],
  );

  const sectionView = useMemo<StyleProp<ViewStyle>>(
    () => ({borderBottomColor: colors.border, backgroundColor: colors.card}),
    [dark],
  );

  const sectionText = useMemo<StyleProp<TextStyle>>(
    () => ({color: colors.font.primary}),
    [dark],
  );

  const languageText = useMemo<StyleProp<TextStyle>>(
    () => ({color: colors.icon}),
    [dark, languageVisible],
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
        <TextButton
          title={strings['Изменить профиль']}
          textStyle={sectionText}
          onPress={handleEdit}
        />
      </View>
      {sections.map(
        section =>
          section.show && (
            <TouchableOpacity
              key={section.id}
              style={[styles.sectionView, sectionView]}
              onPress={section.onPress}>
              <Text style={sectionText}>{section.title}</Text>
              {section.rightView}
            </TouchableOpacity>
          ),
      )}
      <TextButton
        title={strings.Выйти}
        onPress={handleLogout}
        textStyle={logoutText}
      />
      <Modal visible={languageVisible} onClose={toggleLanguageVisible}>
        <FlatList
          data={availableLanguages}
          keyExtractor={item => item}
          contentContainerStyle={styles.languageModalView}
          renderItem={({item}: {item: availableLanguagesType}) => (
            <TouchableOpacity
              onPress={() => handleLanguageChange(item)}
              style={[
                styles.languageItemView,
                {
                  backgroundColor:
                    item === language ? colors.primary : colors.card,
                },
              ]}>
              <Text style={[styles.languageText, languageText]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </Modal>
    </Viewer>
  );
};

const styles = StyleSheet.create({
  view: {},
  profileView: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  profilePosterView: {width: 120, height: 120, borderRadius: 60},
  profileNameText: {
    marginTop: 8,
    ...typography('headings'),
  },
  profileEmailText: {
    marginTop: 4,
    ...typography('content'),
  },
  sectionView: {
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  languageItemView: {
    height: 42,
    marginBottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderRadius: 6,
  },
  languageModalView: {
    marginTop: 10,
  },
  languageText: {
    ...typography('headings'),
    // color: '#fff'
    // textAlign: 'center',
    // textAlignVertical: 'center',
  },
});

export default ProfileTabScreen;
