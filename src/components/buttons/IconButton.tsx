import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../hooks';

interface IconButtonProps extends TouchableOpacityProps {
  icon?: any;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  color?: string;
  loadingSize?: number,
  loadingColor?: string,
  loading?: boolean;
}

const IconButton = ({
  icon: Icon,
  style,
  loading = false,
  loadingSize,
  loadingColor,
  ...props
}: IconButtonProps) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.buttonView, style]}
      disabled={loading}
      {...props}>
      {loading ? (
        <ActivityIndicator
          color={loadingColor ? loadingColor : colors.icon}
          size={loadingSize}
        />
      ) : (
        Icon && Icon
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 6,
  },
});

export default IconButton;
