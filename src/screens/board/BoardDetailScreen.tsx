import {
  Alert,
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  IconButton,
  Input,
  PrimaryButton,
  RichInput,
  Viewer,
} from '../../components';
import {strings} from '../../localization/localization';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FirestoreCollection} from '../../constants';
import {CheckBoxesType, RootNavigationType} from '../../@types';
import {NativeStackNavigationOptions, NativeStackScreenProps} from '@react-navigation/native-stack';
import {useUser} from '../../providers';
import {UserPublicType, UserType} from '../../@types/collections/UserType';
import {convertUnixToDate, typography} from '../../utils';
import {useTheme, useToggle} from '../../hooks';
import {PlusIcon, RemoveIcon} from '../../assets';
import DatePicker from 'react-native-date-picker';
import { StackNavigationOptions } from '@react-navigation/stack';

const usersLoadingData = Array.from({length: 10}, (_, index) => ({id: index}));

type BoardDetailScreenType = NativeStackScreenProps<
  RootNavigationType,
  'BoardDetailScreen'
>;

const BoardDetailScreen = ({navigation, route}: BoardDetailScreenType) => {
  const boardData = route.params?.boardData;

  const {colors, dark} = useTheme();
  const {user} = useUser();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [checkboxes, setCheckboxes] = useState<CheckBoxesType[]>([]);

  const [dateModalVisible, toggleDateModalVisible] = useToggle(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const [selectedMembers, setSelectedMembers] = useState<UserPublicType[]>([]);
  const [createLoading, setCreateLoading] = useState(false);

  const [usersData, setUsersData] = useState<UserType[] | []>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const handleCreateBoard = async () => {
    const userData: UserPublicType = {
      uid: user?.uid,
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
    };
    setCreateLoading(true);
    await firestore()
      .collection(FirestoreCollection.boards)
      .add({
        name: name,
        description: description,
        createdAt: Date.now(),
        creater: userData,
        members: selectedMembers,
        checkboxes: checkboxes,
        expiresAt: expiresAt,
      })
      .then(() => {
        Alert.alert(strings.Успешно);
        navigation.navigate('BoardTabScreen', {reload: true})
      })
      .catch(error => {
        console.error('error', error);
        Alert.alert(strings['Какая-то ошибка']);
      })
      .finally(() => setCreateLoading(false));
  };

  const getUsers = async () => {
    await firestore()
      .collection(FirestoreCollection.users)
      .get()
      .then(response => {
        const usersData = response.docs
          .map(doc => doc.data() as UserType)
          .filter(data => data.uid !== user?.uid);
        setUsersData(usersData);
      })
      .catch((error: Error) => console.error('error', error))
      .finally(() => setUsersLoading(false));
  };

  const handleConfirmDeadline = (date: Date) => setExpiresAt(date.getTime());

  const handleCreateCheckbox = () => {
    setCheckboxes([...checkboxes, {name: '', status: false}]);
  };

  const handleDeleteCheckbox = (index: number) => {
    const newCheckboxes = checkboxes.filter((_, i) => i !== index);
    setCheckboxes(newCheckboxes);
  };

  const handleNameChange = (index: number, text: string) => {
    const newCheckboxes = checkboxes.map((checkbox, i) =>
      i === index ? {...checkbox, name: text} : checkbox,
    );
    setCheckboxes(newCheckboxes);
  };

  const handleSelectUser = (item: UserType) => {
    const userData: UserPublicType = {
      uid: item.uid,
      name: item.name,
      surname: item.surname,
      email: item.email,
    };

    const isSelected = selectedMembers.some(
      member => member.uid === userData.uid,
    );

    if (isSelected) {
      setSelectedMembers(prevMembers =>
        prevMembers.filter(member => member.uid !== userData.uid),
      );
    } else {
      setSelectedMembers(prevMembers => [...prevMembers, userData]);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useLayoutEffect(
    () =>
      navigation.setOptions({
        headerTitle: boardData ? strings.Доска : strings['Создать доску'],
        ...headerCommonStyle
      }),
    [],
  );

  const headerCommonStyle = useMemo<NativeStackNavigationOptions>(
    () => ({
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

  const fontColor = useMemo<StyleProp<TextStyle>>(
    () => ({color: colors.font.primary}),
    [dark],
  );

  const placeholderColor = useMemo<StyleProp<TextStyle>>(
    () => ({
      color: colors.placeholder,
    }),
    [dark],
  );

  const userItemLoadingView = useMemo<StyleProp<ViewStyle>>(
    () => ({backgroundColor: colors.card}),
    [dark],
  );

  const iconBorderColor = useMemo<StyleProp<ViewStyle>>(
    () => ({borderColor: colors.icon}),
    [dark],
  );

  const dateButtonView = useMemo<StyleProp<TextStyle>>(
    () => ({
      backgroundColor: colors.input.background,
      borderColor: dateModalVisible ? colors.primary : colors.input.border,
    }),
    [dark, dateModalVisible],
  );

  const iconColor = useMemo(() => colors.icon, [dark]);

  const renderUserItem = useCallback(
    ({item}: {item: UserType}) => {
      const isSelected = selectedMembers.some(
        member => member.uid === item.uid,
      );

      const userItemButtonView: StyleProp<ViewStyle> = {
        borderColor: isSelected ? colors.primary : colors.border,
      };

      return (
        <TouchableOpacity
          style={[styles.userItemButtonView, userItemButtonView]}
          onPress={() => handleSelectUser(item)}>
          <Text style={fontColor} numberOfLines={1}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [usersLoading, dark, selectedMembers],
  );

  const keyExtractor = useCallback(
    (item: UserType) => item?.uid?.toString() as string,
    [usersLoading],
  );

  return (
    <Viewer scroll>
      <Input
        placeholder={strings['Называние доски']}
        viewStyle={styles.view}
        value={name}
        editable={!createLoading}
        onChangeText={text => setName(text)}
      />
      <RichInput
        viewStyle={styles.view}
        placeholder={strings['Описание доски']}
        value={description}
        editable={!createLoading}
        onChangeText={text => setDescription(text)}
      />
      <TouchableOpacity
        style={[styles.dateButtonView, dateButtonView]}
        onPress={toggleDateModalVisible}>
        <Text style={placeholderColor}>
          {expiresAt
            ? convertUnixToDate(expiresAt)
            : strings['Выберите дедлайн']}
        </Text>
      </TouchableOpacity>

      <View style={styles.checkBoxRowView}>
        <Text style={[styles.checkBoxTitle, fontColor]}>{'Чекбоксы:'} </Text>
        <IconButton
          icon={<PlusIcon color={iconColor} size="24" strokeWidth="2" />}
          style={[styles.plusIconView, iconBorderColor]}
          onPress={handleCreateCheckbox}
        />
      </View>
      {checkboxes.map((_, index) => (
        <View key={index} style={styles.checkBoxView}>
          <Input
            viewStyle={styles.checkBoxInput}
            placeholder={`${strings.чекбокс} ${index + 1}`}
            rightIcon={<RemoveIcon color={iconColor} />}
            onPressRightIcon={() => handleDeleteCheckbox(index)}
            onChangeText={text => handleNameChange(index, text)}
          />
        </View>
      ))}

      <Text style={[styles.title, fontColor]}>{strings['Участники']}:</Text>
      <View style={styles.horizontList}>
        {usersLoading ? (
          <View style={styles.userItemLoadingWrapView}>
            {usersLoadingData.map(value => (
              <View
                style={[styles.userItemLoadingView, userItemLoadingView]}
                key={value.id}
              />
            ))}
          </View>
        ) : (
          <FlatList
            data={usersData}
            horizontal
            renderItem={renderUserItem}
            keyExtractor={keyExtractor}
          />
        )}
      </View>

      <PrimaryButton
        style={styles.createButtonView}
        title={strings.Создать}
        loading={createLoading}
        onPress={handleCreateBoard}
      />
      <DatePicker
        date={expiresAt ? new Date(expiresAt) : new Date()}
        open={dateModalVisible}
        onConfirm={handleConfirmDeadline}
        onCancel={toggleDateModalVisible}
        maximumDate={
          new Date(new Date().setFullYear(new Date().getFullYear() + 10))
        }
        minimumDate={new Date('1900-01-01')}
        mode={'date'}
        modal
        buttonColor={colors.primary}
        dividerColor={colors.border}
        theme={dark ? 'dark' : 'light'}
        confirmText={strings.Выбрать}
        cancelText={strings.Отмена}
        title={strings['Выберите дедлайн']}
        locale={strings.getLanguage()}
      />
    </Viewer>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 16,
    borderRadius: 10,
  },
  createButtonView: {
    marginVertical: 16,
    borderRadius: 10,
  },
  title: {
    marginTop: 16,
    marginHorizontal: 16,
    ...typography('content'),
  },
  checkBoxTitle: {
    marginHorizontal: 16,
    ...typography('content'),
  },
  horizontList: {
    marginTop: 10,
    paddingLeft: 16,
  },
  userItemButtonView: {
    marginRight: 8,
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  userItemLoadingView: {
    marginRight: 8,
    width: 72,
    height: 30,
    borderRadius: 10,
  },
  userItemLoadingWrapView: {
    flexDirection: 'row',
  },
  checkBoxView: {},
  checkBoxRowView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
  },
  checkBoxTextView: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconView: {borderWidth: 2, borderRadius: 6},
  checkIconView: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxInput: {
    marginTop: 10,
    borderRadius: 6,
    // height: 42,
  },
  dateButtonView: {
    marginTop: 16,
    height: 48,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
});

export default BoardDetailScreen;
