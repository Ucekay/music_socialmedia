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
