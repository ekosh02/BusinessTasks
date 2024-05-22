import {ReactNode, useMemo, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import {useTheme} from '../../hooks';

interface InputProps extends TextInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  placeholder?: string;
}

const Input = ({
  leftIcon = undefined,
  rightIcon = undefined,
  placeholder = 'Input',
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
      {leftIcon}
      <TextInput
        style={styles.textInputView}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        {...props}
      />
      {rightIcon}
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
