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
} from 'react-native';
import {useTheme} from '../../hooks';

interface InputProps extends TextInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  placeholder?: string;
  onPressLeftIcon?: ((event: GestureResponderEvent) => void) | undefined;
  onPressRightIcon?: ((event: GestureResponderEvent) => void) | undefined;
}

const Input = ({
  leftIcon = undefined,
  rightIcon = undefined,
  placeholder = 'Input',
  onPressLeftIcon,
  onPressRightIcon,
  ...props
}: InputProps) => {
  const {colors, dark} = useTheme();
  const [focus, setFocus] = useState(false);

  const dynamicRowView = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({
      backgroundColor: colors.input.background,
      borderColor: focus ? colors.primary : colors.input.border,
    }),
    [dark, focus],
  );

  return (
    <View style={[styles.rowView, dynamicRowView]}>
      <TouchableOpacity onPress={onPressLeftIcon}>{leftIcon}</TouchableOpacity>
      <TextInput
        style={styles.textInputView}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
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