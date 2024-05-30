import React, {useState} from 'react';
import {Input, PrimaryButton, Viewer} from '../../components';
import {strings} from '../../localization/localization';
import {Alert, StyleSheet} from 'react-native';
import {EyeIcon} from '../../assets';
import {useTheme, useToggle} from '../../hooks';
import {emailValidator} from '../../utils/emailValidator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../providers';
import {RootNavigationType, UserType} from '../../@types';
import {FirestoreCollection} from '../../constants';
import {setStorage} from '../../utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RegistrationScreenType = NativeStackScreenProps<
  RootNavigationType,
  'RegistrationScreen'
>;

const RegistrationScreen = ({navigation}: RegistrationScreenType) => {
  const {setUser} = useUser();
  const {colors} = useTheme();
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [loading, setLoading] = useState(false);

  const [dataSource, setDataSource] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const isValidData = () => {
    const errors = [];

    dataSource.name.length < 3 &&
      errors.push(strings['Имя должно содержать как минимум 3 символа']);

    dataSource.surname.length < 3 &&
      errors.push(strings['Фамилия должна содержать как минимум 3 символа']);

    !emailValidator(dataSource.email) &&
      errors.push(strings['Некорректный адрес электронной почты']);

    dataSource.password.length < 7 &&
      errors.push(strings['Пароль должен содержать как минимум 6 символов']);

    if (errors.length > 0) {
      Alert.alert('', errors.join('\n'));
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (isValidData()) {
      setLoading(true);
      await auth()
        .createUserWithEmailAndPassword(dataSource.email, dataSource.password)
        .then(async registrationResponse => {
          const uid = registrationResponse.user.uid;
          if (uid) {
            const userData: UserType = {
              uid: uid,
              name: dataSource.name,
              avatar: null,
              surname: dataSource.surname,
              accCreated: Date.now(),
              email: dataSource.email,
            };
            await firestore()
              .collection(FirestoreCollection.users)
              .doc(uid)
              .set(userData)
              .then(async () => {
                await firestore()
                  .collection(FirestoreCollection.users)
                  .doc(uid)
                  .get()
                  .then(async userDocResponse => {
                    const userData = userDocResponse.data();
                    if (userData) {
                      await setStorage('userData', userData);
                      setUser(userData as UserType);
                      navigation.replace('BottomNavigation');
                    }
                  })
                  .catch((error: Error) => {
                    Alert.alert('', error.message);
                  });
              })
              .catch((error: Error) => {
                Alert.alert('', error.message);
              });
          }
        })
        .catch((error: Error) => {
          Alert.alert('', error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Viewer scroll>
      <Input
        placeholder={strings['Введите имя']}
        viewStyle={styles.inputView}
        editable={!loading}
        value={dataSource.name}
        onChangeText={text => setDataSource(prev => ({...prev, name: text}))}
      />
      <Input
        placeholder={strings['Введите фамилию']}
        viewStyle={styles.inputView}
        editable={!loading}
        value={dataSource.surname}
        onChangeText={text => setDataSource(prev => ({...prev, surname: text}))}
      />
      <Input
        placeholder={strings['Введите email']}
        viewStyle={styles.inputView}
        keyboardType="email-address"
        editable={!loading}
        value={dataSource.email}
        onChangeText={text => setDataSource(prev => ({...prev, email: text}))}
      />
      <Input
        placeholder={strings['Введите пароль']}
        viewStyle={styles.inputView}
        value={dataSource.password}
        editable={!loading}
        secureTextEntry={!showPassword}
        rightIcon={<EyeIcon open={showPassword} color={colors.icon} />}
        onPressRightIcon={toggleShowPassword}
        onChangeText={text =>
          setDataSource(prev => ({...prev, password: text}))
        }
      />
      <PrimaryButton
        style={styles.buttonView}
        title={strings.Регистрация}
        loading={loading}
        onPress={handleLogin}
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

export default RegistrationScreen;
