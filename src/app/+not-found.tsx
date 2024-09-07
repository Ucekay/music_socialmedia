import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import BgView from '../components/ThemedBgView';
import Text from '../components/ThemedText';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <BgView style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href='/' style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </BgView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
