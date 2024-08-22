import { Pressable, View, Text, StyleSheet } from 'react-native';
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
    gap: 24,
    justifyContent: 'space-evenly',
    paddingHorizontal: 6,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
  },
  separator: {
    width: 1,
    marginVertical: 4,
  },
});
