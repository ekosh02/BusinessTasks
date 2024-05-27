import React, {useCallback, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {PrimaryButton, Viewer} from '../../components';

const BoardTabScreen = () => {
  const renderItem = useCallback(
    () => <TouchableOpacity></TouchableOpacity>,
    [],
  );

  return (
    <Viewer>
      {/* <PrimaryButton/> */}
      <FlatList data={[]} renderItem={renderItem} />
    </Viewer>
  );
};

const styles = StyleSheet.create({});

export default BoardTabScreen;
