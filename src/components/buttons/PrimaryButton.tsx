import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../hooks';
import {useMemo} from 'react';
import {typography} from './../../utils';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  testStyle?: StyleProp<TextStyle> | undefined;
  loading?: boolean;
}

const PrimaryButton = ({
  title = 'Press',
  style,
  testStyle,
  loading = false,
  ...props
}: PrimaryButtonProps) => {
  const {colors, dark} = useTheme();

  const dynamicButtonView = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      backgroundColor: colors.primary,
    }),
    [dark],
  );

  return (
    <TouchableOpacity
      style={[dynamicButtonView, styles.buttonView, style]}
      disabled={loading}
      {...props}>
      {loading ? (
        <ActivityIndicator color={'#fff'} />
      ) : (
        <Text style={[styles.text, testStyle]}>{title}</Text>
      )}
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
    ...typography('rounded'),
  },
});

export default PrimaryButton;
