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
import {typography} from '../../utils';

interface TextButtonProps extends TouchableOpacityProps {
  title?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle> | undefined;
}

const TextButton = ({
  title = 'Press',
  style,
  loading = false,
  textStyle,
  ...props
}: TextButtonProps) => {
  const {colors, dark} = useTheme();

  const text = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({
      color: colors.font,
    }),
    [dark],
  );

  return (
    <TouchableOpacity
      style={[styles.buttonView, style]}
      disabled={loading}
      {...props}>
      {loading ? (
        <ActivityIndicator color={'#fff'} />
      ) : (
        <Text style={[styles.text, text, textStyle]}>{title}</Text>
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
  },
  text: {
    ...typography('rounded'),
  },
});

export default TextButton;
