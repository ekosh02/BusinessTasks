import {ReactNode, useMemo, useState} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../hooks';

interface InputProps extends TextInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  placeholder?: string;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  viewStyle?: StyleProp<ViewStyle> | undefined;
}

const Input = ({
  leftIcon = undefined,
  rightIcon = undefined,
  placeholder = 'Input',
  onPressLeftIcon,
  onPressRightIcon,
  viewStyle,
  ...props
}: InputProps) => {
  const {colors, dark} = useTheme();
  const [focus, setFocus] = useState(false);

  const rowView = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({
      backgroundColor: colors.input.background,
      borderColor: focus ? colors.primary : colors.input.border,
    }),
    [dark, focus],
  );

  const textInputView = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({
      color: colors.font,
    }),
    [dark],
  );

  return (
    <View style={[styles.rowView, rowView, viewStyle]}>
      <TouchableOpacity onPress={onPressLeftIcon}>{leftIcon}</TouchableOpacity>
      <TextInput
        style={[styles.textInputView, textInputView]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        selectionColor={colors.primary}
        placeholderTextColor={colors.placeholder}
        {...props}
      />
      <TouchableOpacity onPress={onPressRightIcon}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowView: {
    height: 48,
    marginHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  textInputView: {
    paddingHorizontal: 8,
    flex: 1,
  },
});

export default Input;
