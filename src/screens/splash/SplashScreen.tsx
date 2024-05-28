import {useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from '../../hooks';
import {getStorage, typography} from '../../utils';
import {RootNavigationType, UserType} from '../../@types';
import {useDarkMode, useUser} from '../../providers';

type SplasScreenType = NativeStackScreenProps<
  RootNavigationType,
  'SplashScreen'
>;

const SplashScreen = ({navigation}: SplasScreenType) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {colors, dark} = useTheme();
  const {user, setUser} = useUser();
  const {setIsDarkMode} = useDarkMode();

  const setting = async () => {
    const userData: UserType = await getStorage('userData');
    const isDarkMode = await getStorage('isDarkMode');
    setIsDarkMode(isDarkMode);
    userData && setUser(userData);
    setTimeout(
      () => navigation.replace(userData ? 'BottomNavigation' : 'AuthScreen'),
      1500,
    );
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    setting();
  }, [user?.uid]);

  const view = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      backgroundColor: colors.background,
    }),
    [dark],
  );

  const text = useMemo<StyleProp<TextStyle> | undefined>(
    () => ({
      opacity: fadeAnim,
      color: colors.primary,
    }),
    [dark, fadeAnim],
  );

  return (
    <View style={[styles.view, view]}>
      <Animated.Text style={[styles.text, text]}>Business Tasks</Animated.Text>
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
