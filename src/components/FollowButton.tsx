import { Text, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';

import Colors from '@/src/constants/Colors';

const FollowButton = ({ isMyAccount }: { isMyAccount: boolean }) => {
  const colorScheme = useColorScheme();
  const backgroundColor = {
    backgroundColor: Colors[colorScheme ?? 'light'].followButtonBg,
  };
  const textColor = { color: Colors[colorScheme ?? 'light'].followButtonText };

  if (isMyAccount) {
    return (
      <Pressable style={styles.button}>
        <Text style={styles.text}>編集</Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable style={[styles.button, backgroundColor]}>
        <Text style={[styles.text, textColor]}>フォロー</Text>
      </Pressable>
    );
  }
};

export default FollowButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
