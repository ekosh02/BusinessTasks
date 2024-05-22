import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../hooks';
import {useMemo} from 'react';
import {typography} from './../../utils';

interface PrimaryButtonProps {
  title?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const PrimaryButton = ({title = 'Press', onPress}: PrimaryButtonProps) => {
  const {colors, dark} = useTheme();

  const buttonStyle = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
      marginHorizontal: 16,
      borderRadius: 24,
    }),
    [dark],
  );

  const textStyle = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({
      ...typography('headings'),
      color: '#fff',
    }),
    [dark],
  );

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
