import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
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

  const dynamicButtonView = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      backgroundColor: colors.primary,
    }),
    [dark],
  );

  return (
    <TouchableOpacity
      style={[dynamicButtonView, styles.buttonView]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginHorizontal: 16,
    borderRadius: 24,
  },
  text: {
    color: '#fff',
    ...typography('headings'),
  },
});

export default PrimaryButton;
