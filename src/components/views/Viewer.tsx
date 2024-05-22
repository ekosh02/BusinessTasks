import React, {ReactNode, useMemo} from 'react';
import {
  View,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '../../hooks';

type ViewerProps = {
  children?: ReactNode;
  loading?: boolean;
  scroll?: boolean;
  safeArea?: boolean;
  bounces?: boolean;
};

const Viewer = ({
  children,
  loading = false,
  scroll = false,
  safeArea = false,
  bounces = false,
}: ViewerProps) => {
  const {colors, dark} = useTheme();

  const buttonStyle = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      flex: 1,
      backgroundColor: colors.background,
    }),
    [dark],
  );

  const loaderStyle = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    }),
    [dark],
  );

  if (loading) {
    return (
      <View style={loaderStyle}>
        <ActivityIndicator color={colors.primary} size={'large'} />
      </View>
    );
  }

  if (scroll) {
    if (safeArea && Platform.OS === 'ios') {
      return (
        <SafeAreaView style={buttonStyle}>
          <KeyboardAwareScrollView bounces={bounces}>
            {children}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={buttonStyle}>
          <KeyboardAwareScrollView bounces={bounces}>
            {children}
          </KeyboardAwareScrollView>
        </View>
      );
    }
  }

  return <View style={buttonStyle}>{children}</View>;
};

export default Viewer;
