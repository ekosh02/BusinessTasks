import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Viewer} from '../../components';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'; // Corrected import
import {FirestoreCollection} from '../../constants';
import {BoardType} from '../../@types';
import {width} from '../../utils/screenDimensions';
import {useTheme} from '../../hooks';
import {convertUnixToDate, typography} from '../../utils';
import {strings} from '../../localization/localization';

type BoardsFirestoreType =
  FirebaseFirestoreTypes.QuerySnapshot<BoardType> | null;

type BoardFirestoreType =
  FirebaseFirestoreTypes.QueryDocumentSnapshot<BoardType>;

const BoardTabScreen = () => {
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

  useEffect(() => {
    getBoards();
  }, []);

  const itemView = useMemo<StyleProp<ViewStyle>>(
    () => ({backgroundColor: colors.card}),
    [dark],
  );

  const textView = useMemo<StyleProp<TextStyle>>(
    () => ({color: colors.font.primary}),
    [dark],
  );

  const renderItem = useCallback(
    ({item}: {item: BoardFirestoreType}) => {
      const value = item.data();
      return (
        <TouchableOpacity style={[styles.itemView, itemView]}>
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
          <Text style={[styles.content, textView]}>
            {strings.Дата}: {convertUnixToDate(value?.expiresAt)}
          </Text>
        </TouchableOpacity>
      );
    },
    [dark],
  );

  return (
    <Viewer loading={boardsLoading} error={boardsError}>
      <FlatList data={boardsData?.docs} renderItem={renderItem} />
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
