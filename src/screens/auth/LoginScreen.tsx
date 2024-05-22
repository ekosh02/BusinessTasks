import React, {useState} from 'react';
import {Input, PrimaryButton, Viewer} from '../../components';
import {strings} from '../../localization/localization';
import {StyleSheet} from 'react-native';
import {EyeIcon} from '../../assets';
import {useToggle} from '../../hooks';

const LoginScreen = () => {
  const [showPassword, toggleShowPassword] = useToggle(false);

  const [dataSource, setDataSource] = useState({
    name: '',
    surname: '',
    login: '',
    password: '',
  });

  return (
    <Viewer>
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
      <PrimaryButton style={styles.buttonView} title={strings.Авторизоваться} />
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
