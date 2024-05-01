import { Text, StyleSheet, Pressable } from 'react-native';

const ButtonOnProfile = ({ isMyAccount }: { isMyAccount: string }) => {
  if (isMyAccount) {
    return (
      <Pressable style={styles.button}>
        <Text style={styles.text}>編集</Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable style={styles.button}>
        <Text style={styles.text}>フォロー</Text>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
