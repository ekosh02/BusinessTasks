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

interface RichInputProps extends TextInputProps {
  placeholder?: string;
  height?: number;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  viewStyle?: StyleProp<ViewStyle> | undefined;
}

const RichInput = ({
  placeholder = 'Input',
  height = 200,
  onPressLeftIcon,
  onPressRightIcon,
  viewStyle,
  ...props
}: RichInputProps) => {
  const {colors, dark} = useTheme();
  const [focus, setFocus] = useState(false);

  const rowView = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({
      backgroundColor: colors.input.background,
      borderColor: focus ? colors.primary : colors.input.border,
      height: height,
    }),
    [dark, focus],
  );

  const textInputView = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({
      color: colors.font.primary,
    }),
    [dark, height],
  );

  return (
    <View style={[styles.rowView, rowView, viewStyle]}>
      <TextInput
        style={[styles.textInputView, textInputView]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        textAlignVertical="top"
        placeholder={placeholder}
        multiline
        selectionColor={colors.primary}
        placeholderTextColor={colors.placeholder}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowView: {
    paddingTop: 4,
    marginHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 13,
  },
  textInputView: {
    flex: 1,
    paddingHorizontal: 8,
  },
});

export default RichInput;
