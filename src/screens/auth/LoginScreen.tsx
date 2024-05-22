import React, {useState} from 'react';
import {Input, PrimaryButton, Viewer} from '../../components';
import {strings} from '../../localization/localization';
import {Alert, StyleSheet} from 'react-native';
import {EyeIcon} from '../../assets';
import {useToggle} from '../../hooks';
import {emailValidator} from '../../utils/emailValidator';

const LoginScreen = () => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [loading, setLoading] = useState(false);

  const [dataSource, setDataSource] = useState({
    name: '',
    surname: '',
    login: '',
    password: '',
  });

  const isValidData = () => {
    const errors = [];

    dataSource.name.length < 3 &&
      errors.push(strings['Имя должно содержать как минимум 3 символа']);

    dataSource.surname.length < 3 &&
      errors.push(strings['Фамилия должна содержать как минимум 3 символа']);

    !emailValidator(dataSource.login) &&
      errors.push(strings['Некорректный адрес электронной почты']);

    dataSource.password.length < 7 &&
      errors.push(strings['Пароль должен содержать как минимум 6 символов']);

    if (errors.length > 0) {
      Alert.alert('', errors.join('\n'));
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    if (!isValidData()) return;
    console.log('sdcmsldkcmlks');
  };

  return (
    <Viewer scroll>
      <Input
        placeholder={strings['Введите имя']}
        viewStyle={styles.inputView}
        value={dataSource.name}
        onChangeText={text => setDataSource(prev => ({...prev, name: text}))}
      />
      <Input
        placeholder={strings['Введите фамилию']}
        viewStyle={styles.inputView}
        value={dataSource.surname}
        onChangeText={text => setDataSource(prev => ({...prev, surname: text}))}
      />
      <Input
        placeholder={strings['Введите логин']}
        viewStyle={styles.inputView}
        keyboardType="email-address"
        value={dataSource.login}
        onChangeText={text => setDataSource(prev => ({...prev, login: text}))}
      />
      <Input
        placeholder={strings['Введите пароль']}
        viewStyle={styles.inputView}
        value={dataSource.password}
        secureTextEntry={!showPassword}
        rightIcon={<EyeIcon open={showPassword} />}
        onPressRightIcon={toggleShowPassword}
        onChangeText={text =>
          setDataSource(prev => ({...prev, password: text}))
        }
      />
      <PrimaryButton
        style={styles.buttonView}
        title={strings.Авторизоваться}
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

export default LoginScreen;
