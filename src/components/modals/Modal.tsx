import React, {ReactNode, useMemo} from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {XIcon} from '../../assets';
import {useTheme} from '../../hooks';
import {width} from '../../utils/screenDimensions';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({visible, onClose, children}: ModalProps) => {
  const {colors, dark} = useTheme();

  const modalContainer = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      backgroundColor: colors.background,
    }),
    [dark],
  );

  const closeButtonView = useMemo<StyleProp<ViewStyle> | undefined>(
    () => ({
      backgroundColor: colors.card,
    }),
    [dark],
  );

  return (
    <RNModal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, modalContainer]}>
          <View style={styles.closeButtonOutsideView}>
            <TouchableOpacity
              style={[styles.closeButtonView, closeButtonView]}
              onPress={onClose}>
              <XIcon color={colors.icon} />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width - 32,
    marginHorizontal: 16,
    padding: 13,
    borderRadius: 10,
  },
  closeButtonOutsideView: {
    alignItems: 'flex-end',
  },
  closeButtonView: {
    backgroundColor: 'red',
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Modal;
