import {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from '../../hooks';
import {getStorage, typography} from '../../utils';
import {RootNavigationType, UserType} from '../../@types';
import {useUser} from '../../providers';

type SplasScreenType = NativeStackScreenProps<
  RootNavigationType,
  'SplashScreen'
>;

const SplashScreen = ({navigation}: SplasScreenType) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {colors} = useTheme();
  const {setUser} = useUser();

  const setting = async () => {
    const userData: UserType = await getStorage('userData');
    if (userData) {
      setUser(userData);
      setTimeout(
        () =>
          navigation.navigate(userData ? 'BottomNavigation' : 'LoginScreen'),
        1500,
      );
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    setting();
  }, []);

  return (
    <View style={styles.view}>
      <Animated.Text
        style={[styles.text, {opacity: fadeAnim, color: colors.primary}]}>
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
