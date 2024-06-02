import {
  Pressable,
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Colors from '../constants/Colors';

interface AddOrCancelButtonsProps {
  handleCancel: () => void;
  handleAdd: () => void;
}

const AddOrCancelButtons = ({
  handleCancel,
  handleAdd,
}: AddOrCancelButtonsProps) => {
  const colorScheme = useColorScheme();
  const secondaryTextColor = Colors[colorScheme ?? 'light'].secondaryText;
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={handleCancel} style={styles.button}>
        <Text style={{ color: Colors[colorScheme ?? 'light'].warnText }}>
          キャンセル
        </Text>
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
    width: '50%',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
  },
  separator: {
    width: 1,
    marginVertical: 4,
  },
});
