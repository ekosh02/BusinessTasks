import React, {ReactNode, useMemo} from 'react';
import {
  View,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  StyleSheet,
  ViewProps,
  Text,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '../../hooks';

interface ViewerProps extends ViewProps, KeyboardAwareScrollViewProps {
  children?: ReactNode;
  loading?: boolean;
  scroll?: boolean;
  safeArea?: boolean;
  bounces?: boolean;
  error?: any;
  style?: StyleProp<ViewStyle> | undefined;
}

const Viewer = ({
  children,
  loading = false,
  scroll = false,
  safeArea = false,
  bounces = false,
  error,
  style,
  ...props
}: ViewerProps) => {
  const {colors, dark} = useTheme();

  const view = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      backgroundColor: colors.background,
    }),
    [dark],
  );

  if (error) {
    return (
      <View style={[styles.loaderView, view, style]} {...props}>
        <Text>Error</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.loaderView, view, style]} {...props}>
        <ActivityIndicator color={colors.primary} size={'large'} />
      </View>
    );
  }

  if (scroll) {
    if (safeArea && Platform.OS === 'ios') {
      return (
        <SafeAreaView style={[styles.view, view, style]} {...props}>
          <KeyboardAwareScrollView bounces={bounces}>
            {children}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={[styles.view, view, style]} {...props}>
          <KeyboardAwareScrollView bounces={bounces}>
            {children}
          </KeyboardAwareScrollView>
        </View>
      );
    }
  }

  return (
    <View style={[styles.view, view, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Viewer;
