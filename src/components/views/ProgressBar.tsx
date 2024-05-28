import React, {useMemo, useEffect} from 'react';
import {View, StyleSheet, Animated, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from '../../hooks';

const ProgressBar = ({
  percentage = 0,
  placeholderColor,
  progressBarStyle,
}: {
  percentage: number;
  placeholderColor?: string;
  progressBarStyle?: StyleProp<ViewStyle>
}) => {
  const animation = useMemo(() => new Animated.Value(0), []);

  const {colors} = useTheme();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [animation, percentage]);

  const widthStyle = useMemo(
    () => ({
      width: animation.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      }),
    }),
    [animation],
  );
  
  const progressBar = useMemo<StyleProp<ViewStyle>>(
    () => ({
      backgroundColor: placeholderColor ? placeholderColor : colors.red,
      ...StyleSheet.flatten(progressBarStyle),
    }),
    [placeholderColor, progressBarStyle, percentage],
  );

  const progressIndicator = useMemo<StyleProp<ViewStyle>>(
    () => ({backgroundColor: colors.green}),
    [],
  );

  return (
    <View style={[styles.progressBar, progressBar]}>
      <Animated.View
        style={[styles.progressIndicator, progressIndicator, widthStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    marginTop: 10,
    height: 3,
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    borderRadius: 1.5,
  },
});

export default ProgressBar;
