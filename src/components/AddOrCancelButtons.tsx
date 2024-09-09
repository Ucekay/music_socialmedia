import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../contexts/ColorThemeContext';

interface AddOrCancelButtonsProps {
  handleCancel: () => void;
  handleAdd: () => void;
}

const AddOrCancelButtons = ({
  handleCancel,
  handleAdd,
}: AddOrCancelButtonsProps) => {
  const { colors } = useTheme();
  const secondaryTextColor = colors.secondaryText;
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={handleCancel} style={styles.button}>
        <Text style={{ color: colors.cancelText }}>キャンセル</Text>
      </Pressable>
      <View
        style={[styles.separator, { backgroundColor: secondaryTextColor }]}
      />
      <Pressable onPress={handleAdd} style={styles.button}>
        <Text style={{ color: secondaryTextColor }}>追加</Text>
      </Pressable>
    </View>
  );
};

export default AddOrCancelButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 6,
    gap: 24,
  },
  button: {
    alignItems: 'center',
    flex: 1,
    padding: 14,
    borderRadius: 12,
  },
  separator: {
    width: 1,
    marginVertical: 4,
  },
});
