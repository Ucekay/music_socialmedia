import { Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '../contexts/ColorThemeContext';

const FollowButton = ({ isMyAccount }: { isMyAccount: boolean }) => {
  const { colors } = useTheme();
  const backgroundColor = {
    backgroundColor: colors.followButtonBg,
  };
  const textColor = { color: colors.followButtonText };

  if (isMyAccount) {
    return (
      <Pressable style={styles.button}>
        <Text style={styles.text}>編集</Text>
      </Pressable>
    );
  }
  return (
    <Pressable style={[styles.button, backgroundColor]}>
      <Text style={[styles.text, textColor]}>フォロー</Text>
    </Pressable>
  );
};

export default FollowButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
