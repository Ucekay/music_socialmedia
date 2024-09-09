import { useState } from 'react';
import { Alert, AppState, StyleSheet, View } from 'react-native';

import { Button, Input } from '@rneui/themed';

import { supabase } from '../lib/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

//サインイン前の画面
export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  async function Sendemail() {
    try {
      const { error: sendEmailError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://localhost:3000/passwordReset/',
        });
      if (sendEmailError) {
        throw sendEmailError;
      }
      alert('パスワード設定メールを確認してください');
    } catch (error) {
      alert('エラーが発生しました');
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='email@address.com'
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder='Password'
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title='Sign in'
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title='Sign up'
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title='Forgot the password'
          disabled={loading}
          onPress={() => Sendemail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    alignSelf: 'stretch',
    paddingBottom: 4,
    paddingTop: 4,
  },
  mt20: {
    marginTop: 20,
  },
});
