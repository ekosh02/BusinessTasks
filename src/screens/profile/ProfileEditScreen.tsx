import React, {useMemo, useState} from 'react';
import {Input, PrimaryButton, Viewer} from '../../components';
import {Alert, StyleProp, StyleSheet, TextStyle} from 'react-native';
import {useTheme} from '../../hooks';
import {useUser} from '../../providers';
import {RootNavigationType, UserEditType, UserType} from '../../@types';
import {FirestoreCollection} from '../../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {strings} from '../../localization/localization';
import {emailValidator} from '../../utils/emailValidator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type ProfileEditScreenType = NativeStackScreenProps<
  RootNavigationType,
  'ProfileEditScreen'
>;

const ProfileEditScreen = ({navigation}: ProfileEditScreenType) => {
  const {user, setUser} = useUser();
  const {colors, dark} = useTheme();

  const userEditDefaultData: UserEditType = {
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    avatar: undefined
  };
  const [userEditData, setUserEditData] =
    useState<UserEditType>(userEditDefaultData);
  const [userEditLoading, setUserEditLoading] = useState<boolean>(false);

  const userItemText = useMemo<StyleProp<TextStyle>>(
    () => ({
      color: colors.font.primary,
    }),
    [dark, colors.font.primary],
  );

  const isValidData = () => {
    const errors = [];

    if (userEditData.name.length < 3) {
      errors.push(strings['Имя должно содержать как минимум 3 символа']);
    }

    if (userEditData.surname.length < 3) {
      errors.push(strings['Фамилия должна содержать как минимум 3 символа']);
    }

    if (!emailValidator(userEditData.email)) {
      errors.push(strings['Некорректный адрес электронной почты']);
    }

    if (errors.length > 0) {
      Alert.alert('', errors.join('\n'));
      return false;
    }

    return true;
  };

  const handleEditProfile = async () => {
    if (isValidData()) {
      setUserEditLoading(true);
      try {
        const userDocRef = firestore().collection(FirestoreCollection.users).doc(user?.uid);

        // Обновление данных в Firebase Authentication
        const currentUser = auth().currentUser;
        if (currentUser) {
          await currentUser.updateProfile({
            displayName: `${userEditData.name} ${userEditData.surname}`,
          });

          if (currentUser.email !== userEditData.email) {
            await currentUser.updateEmail(userEditData.email);
          }
        }

        // Обновление данных в Firestore
        await userDocRef.update(userEditData);
        
        // Обновляем локальное состояние пользователя
        const updatedUser: UserType = {
          ...user,
          ...userEditData,
        } as UserType;
        setUser(updatedUser);
        Alert.alert('', strings['Профиль успешно обновлен']);
        navigation.goBack(); // Возвращаемся на предыдущий экран
      } catch (error) {
        console.log('error');
        

      } finally {
        setUserEditLoading(false);
      }
    }
  };

  return (
    <Viewer>
      <Input
        placeholder={strings['Введите имя']}
        viewStyle={styles.inputView}
        editable={!userEditLoading}
        value={userEditData.name}
        onChangeText={text => setUserEditData(prev => ({...prev, name: text}))}
      />
      <Input
        placeholder={strings['Введите фамилию']}
        viewStyle={styles.inputView}
        editable={!userEditLoading}
        value={userEditData.surname}
        onChangeText={text => setUserEditData(prev => ({...prev, surname: text}))}
      />
      <Input
        placeholder={strings['Введите email']}
        viewStyle={styles.inputView}
        keyboardType="email-address"
        editable={!userEditLoading}
        value={userEditData.email}
        onChangeText={text => setUserEditData(prev => ({...prev, email: text}))}
      />
      <PrimaryButton
        style={styles.buttonView}
        title={strings['Изменить профиль']}
        loading={userEditLoading}
        onPress={handleEditProfile}
      />
    </Viewer>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 16,
  },
  inputView: {
    marginTop: 13,
  },
});

export default ProfileEditScreen;
