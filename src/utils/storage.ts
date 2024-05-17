import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../constants';

type KeysType = keyof typeof StorageKeys;

const getStorage = async (key: KeysType) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('getStorage', key, error);
  }
};

const setStorage = async (key: KeysType, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log('setStorage', key, error);
  }
};

const removeStorage = async (key: KeysType) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('removeStorage', key, error);
  }
};

export {getStorage, setStorage, removeStorage};
