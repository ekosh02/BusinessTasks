import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {IconButton, ProgressBar, Viewer} from '../../components';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {FirestoreCollection} from '../../constants';
import {BoardType, RootNavigationType} from '../../@types';
import {width} from '../../utils/screenDimensions';
import {useTheme} from '../../hooks';
import {convertUnixToDate, dateDelay, typography} from '../../utils';
import {strings} from '../../localization/localization';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PlusIcon} from '../../assets';

type BoardsFirestoreType =
  FirebaseFirestoreTypes.QuerySnapshot<BoardType> | null;

type BoardFirestoreType =
  FirebaseFirestoreTypes.QueryDocumentSnapshot<BoardType>;

type BoardTabScreenType = NativeStackScreenProps<
  RootNavigationType,
  'BoardTabScreen'
>;

const BoardTabScreen = ({route, navigation}: BoardTabScreenType) => {
  const reload = route?.params?.reload;

  const {colors, dark} = useTheme();

  const [boardsData, setBoardsData] = useState<BoardsFirestoreType>(null);
  const [boardsLoading, setBoardsLoadiing] = useState(true);
  const [boardsError, setBoardsError] = useState<Error | null>(null);

  const getBoards = async () => {
    await firestore()
      .collection(FirestoreCollection.boards)
      .get()
      .then(response => setBoardsData(response as BoardsFirestoreType))
      .catch(error => {
        console.log('error', FirestoreCollection.boards, error);
        setBoardsError(error);
      })
      .finally(() => setBoardsLoadiing(false));
  };

  const handleCreateBoard = () => {
    navigation.setParams({reload: false});
    navigation.navigate('BoardDetailScreen');
  };

  const handleBoard = (item: BoardFirestoreType) =>
    navigation.navigate('BoardDetailScreen', {boardData: item.data()});

  useEffect(() => {
    getBoards();
  }, []);

  useEffect(() => {
    if (reload) {
      getBoards();
      navigation.setParams({reload: false});
    }
  }, [reload]);

  const itemView = useMemo<StyleProp<ViewStyle>>(
    () => ({backgroundColor: colors.card}),
    [dark],
  );

  const textView = useMemo<StyleProp<TextStyle>>(
    () => ({color: colors.font.primary}),
    [dark],
  );

  const removeButtonView = useMemo<StyleProp<TextStyle>>(
    () => ({backgroundColor: `${colors.red}55`}),
    [dark],
  );

  useLayoutEffect(
    () =>
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            icon={<PlusIcon color={colors.icon} size="32" />}
            onPress={handleCreateBoard}
            style={styles.rightIconView}
          />
        ),
      }),
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: BoardFirestoreType}) => {
      const value = item.data();

      const trueCount = value.checkboxes.filter(
        checkbox => checkbox.status,
      ).length;
      const totalCount = value.checkboxes.length;
      const percentage = (trueCount / totalCount) * 100;
      const percentageToFix = percentage.toFixed(2);

      const dateTextColor = dateDelay(value.expiresAt as number)
        ? colors.red
        : colors.placeholder;

      return (
        <TouchableOpacity
          style={[styles.itemView, itemView]}
          onPress={() => handleBoard(item)}>
          <Text numberOfLines={2} style={[styles.headings, textView]}>
            {value.name}
          </Text>
          <Text numberOfLines={6} style={[styles.content, textView]}>
            {value.description}
          </Text>
          <Text numberOfLines={2} style={[styles.content, textView]}>
            {strings.Создатель} {value.creater.name} {value.creater.surname}
          </Text>
          <Text style={[styles.content, textView]}>
            {strings['Кол-во участников']}: {value.members.length}
          </Text>
          <Text style={[styles.content, {color: dateTextColor}]}>
            {strings.Дата}: {convertUnixToDate(value?.expiresAt)}
          </Text>
          <ProgressBar percentage={parseFloat(percentageToFix)} />
        </TouchableOpacity>
      );
    },
    [dark],
  );

  const keyExtractor = useCallback(
    (item: BoardFirestoreType) => item.data().id,
    [boardsLoading],
  );

  return (
    <Viewer loading={boardsLoading} error={boardsError}>
      <FlatList
        data={boardsData?.docs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Viewer>
  );
};

const styles = StyleSheet.create({
  itemView: {
    width: width - 32,
    marginHorizontal: 16,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  headings: {
    ...typography('headings'),
  },
  content: {
    ...typography('content'),
  },
});

export default BoardTabScreen;
