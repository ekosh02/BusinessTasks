import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Modal, Viewer} from '../../components';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme, useToggle} from '../../hooks';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../providers';
import {RootNavigationType, UserType} from '../../@types';
import {FirestoreCollection} from '../../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {convertUnixToDate, typography} from '../../utils';
import {strings} from '../../localization/localization';

type AllUsersType = NativeStackScreenProps<RootNavigationType, 'AllUsers'>;

const AllUsers = ({}: AllUsersType) => {
  const {user} = useUser();
  const {colors, dark} = useTheme();
  const [usersData, setUsersData] = useState<UserType[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(true);
  const [usersError, setUsersError] = useState<Error | null>(null);
  const [userDetailVisible, toggleUserDetail] = useToggle(false);
  const [userData, setUserData] = useState<UserType | null>(null);

  const getUsers = async () => {
    setUsersLoading(true);
    await firestore()
      .collection(FirestoreCollection.users)
      .get()
      .then(response => {
        const usersData = response.docs
          .map(doc => doc.data() as UserType)
          .filter(data => data.uid !== user?.uid);
        setUsersData(usersData);
      })
      .catch((error: Error) => {
        console.error('error', error);
        setUsersError(error);
      })
      .finally(() => setUsersLoading(false));
  };

  const handleUserDetail = (item: UserType) => {
    setUserData(item);
    toggleUserDetail();
  };

  const handleCloseUserModal = () => {
    setUserData(null);
    toggleUserDetail();
  };

  useEffect(() => {
    getUsers();
  }, []);

  const userItemView = useMemo<StyleProp<ViewStyle>>(
    () => ({
      backgroundColor: colors.card,
    }),
    [dark],
  );

  const userItemText = useMemo<StyleProp<TextStyle>>(
    () => ({
      color: colors.font.primary,
    }),
    [dark],
  );

  const renderUserItem = useCallback(
    ({item}: {item: UserType}) => (
      <TouchableOpacity
        style={[styles.userItemView, userItemView]}
        onPress={() => handleUserDetail(item)}>
        <Text style={[styles.userItemText, userItemText]}>
          {item.name} {item.surname}
        </Text>
        <Text style={[styles.userItemText, userItemText]}>{item.email}</Text>
      </TouchableOpacity>
    ),
    [usersLoading, dark],
  );

  const keyExtractor = useCallback(
    (item: UserType) => item?.uid?.toString() as string,
    [usersLoading],
  );

  return (
    <Viewer loading={usersLoading} error={usersError}>
      <FlatList
        data={usersData}
        renderItem={renderUserItem}
        keyExtractor={keyExtractor}
        refreshing={usersLoading}
        onRefresh={getUsers}
      />

      <Modal visible={userDetailVisible} onClose={handleCloseUserModal}>
        <View style={styles.userModalView}>
          <Text style={[styles.userItemText, userItemText]}>
            {strings['Полное имя']}
            {': '}
            {userData?.name} {userData?.surname}
          </Text>
          <Text style={[styles.userItemText, userItemText]}>
            {'Email: '}
            {userData?.email}
          </Text>
          <Text style={[styles.userItemText, userItemText]}>
            {strings['Дата создание']}
            {': '}
            {convertUnixToDate(userData?.accCreated as number)}
          </Text>
        </View>
      </Modal>
    </Viewer>
  );
};

const styles = StyleSheet.create({
  userItemView: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  userModalView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userItemText: {
    marginVertical: 1,
    ...typography('content'),
  },
});

export default AllUsers;
