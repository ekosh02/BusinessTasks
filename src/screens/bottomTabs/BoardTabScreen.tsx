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
  View,
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
    setBoardsLoadiing(true);
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

  const memberTextView = useMemo<StyleProp<ViewStyle>>(
    () => ({backgroundColor: colors.background}),
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
    [dark],
  );

  const renderItem = useCallback(
    ({item}: {item: BoardFirestoreType}) => {
      const value = item.data();

      const trueCount = value.checkboxes.filter(
        checkbox => checkbox.status,
      ).length;
      const totalCount = value.checkboxes.length;
      const percentage = (trueCount / totalCount) * 100;
      const percentageToFix = parseFloat(percentage.toFixed(2));

      const dateTextColor = dateDelay(value.expiresAt as number)
        ? colors.red
        : colors.placeholder;

      console.log('value', value.expiresAt);

      return (
        <TouchableOpacity
          style={[styles.itemView, itemView]}
          onPress={() => handleBoard(item)}>
          {value.name && (
            <Text numberOfLines={2} style={[styles.headings, textView]}>
              {value.name}
            </Text>
          )}
          {value.description && (
            <Text numberOfLines={6} style={[styles.content, textView]}>
              {value.description}
            </Text>
          )}
          <Text numberOfLines={2} style={[styles.content, textView]}>
            {strings.Создатель}
            {': '}
            {value.creater.name} {value.creater.surname}
          </Text>
          {value.members.length ? (
            <Text style={[styles.content, textView]}>
              {strings.Участники}:
            </Text>
          ) : null}
          <View style={styles.membRowersView}>
            {value.members.length
              ? value.members.map((member, index) => (
                  <View style={[styles.memberTextView, memberTextView]}>
                    <Text key={member.uid} style={[styles.content, textView]}>
                      {member.name} {member.surname}
                    </Text>
                  </View>
                ))
              : null}
          </View>
          {value.expiresAt && (
            <Text style={[styles.content, {color: dateTextColor}]}>
              {strings.Дата}: {convertUnixToDate(value?.expiresAt)}
            </Text>
          )}
          <ProgressBar percentage={percentageToFix} />
        </TouchableOpacity>
      );
    },
    [dark, boardsLoading],
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
        onRefresh={getBoards}
        refreshing={boardsLoading}
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
  rightIconView: {
    padding: 10,
  },
  memberTextView: {
    marginVertical: 3,
    marginLeft: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'red',
  },
  membRowersView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default BoardTabScreen;
