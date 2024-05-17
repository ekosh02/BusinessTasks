import {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from '../../hooks';
import {typography} from '../../utils';
import { RootNavigationType} from '../../@types';

type SplasScreenType = NativeStackScreenProps<
  RootNavigationType,
  'SplashScreen'
>;

const SplashScreen = ({navigation}: SplasScreenType) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {colors} = useTheme();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    setTimeout(() => navigation.replace('BottomNavigation'), 1500);
  }, []);

  return (
    <View style={styles.view}>
      <Animated.Text
        style={[styles.text, {opacity: fadeAnim, color: colors.font}]}>
        Business Tasks
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...typography('bigBold'),
  },
});

export default SplashScreen;
