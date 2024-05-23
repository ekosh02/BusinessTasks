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
  style?: StyleProp<ViewStyle> | undefined;
}

const Viewer = ({
  children,
  loading = false,
  scroll = false,
  safeArea = false,
  bounces = false,
  style,
  ...props
}: ViewerProps) => {
  const {colors, dark} = useTheme();

  const dynamicView = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      backgroundColor: colors.background,
    }),
    [dark],
  );

  const dynamicLoaderView = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      backgroundColor: colors.background,
    }),
    [dark],
  );

  if (loading) {
    return (
      <View style={[styles.loaderView, dynamicLoaderView, style]} {...props}>
        <ActivityIndicator color={colors.primary} size={'large'} />
      </View>
    );
  }

  if (scroll) {
    if (safeArea && Platform.OS === 'ios') {
      return (
        <SafeAreaView style={[styles.view, dynamicView, style]} {...props}>
          <KeyboardAwareScrollView bounces={bounces}>
            {children}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <View style={[styles.view, dynamicView, style]} {...props}>
          <KeyboardAwareScrollView bounces={bounces}>
            {children}
          </KeyboardAwareScrollView>
        </View>
      );
    }
  }

  return (
    <View style={[styles.view, dynamicView, style]} {...props}>
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
