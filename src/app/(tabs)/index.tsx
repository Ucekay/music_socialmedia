import { supabase } from '@/src/backend/lib/supabase';
import BgView from '@/src/components/ThemedBgView';
import { router } from 'expo-router';
import { AppleMac, GoogleCircle } from 'iconoir-react-native';
import { useState } from 'react';
import {
  Alert,
  AppState,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function TabIndex() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const HandleGoogle = () => {
    router.replace('/(tabs)/(article)');
  };

  const HandleApple = () => {
    router.replace('/(tabs)/(article)');
  };

  async function HandleSignUp() {
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

  async function HandleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <BgView style={styles.screenContainer}>
      <Animated.View entering={FadeIn} style={[styles.container]}>
        <View style={styles.label}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>M</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>u</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>s</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>i</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>c</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>S</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>o</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>c</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>i</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>a</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>l</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>M</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>e</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>d</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>i</Text>
            </View>
            <View style={{ width: 30, height: 30, alignItems: 'center' }}>
              <Text style={styles.header}>a</Text>
            </View>
          </View>
        </View>
        <View>
          <Text>Email:</Text>
          <TextInput value={email} onChangeText={(text) => setEmail(text)} />
          <Text>Password:</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <Button title='Sign Up' onPress={HandleSignUp} />
          <Button title='Login' onPress={HandleLogin} />
        </View>
        <Pressable onPress={HandleGoogle}>
          <View style={styles.button}>
            <GoogleCircle style={styles.Icon} width={30} height={30} />
            <Animated.Text style={styles.text}>
              Googleでサインインする
            </Animated.Text>
          </View>
        </Pressable>
        <Pressable onPress={HandleApple}>
          <View style={styles.button}>
            <AppleMac style={styles.Icon} width={30} height={30} />
            <Animated.Text style={styles.text}>
              Appleでサインインする
            </Animated.Text>
          </View>
        </Pressable>
      </Animated.View>
    </BgView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 16,
    paddingBottom: 20,
    gap: 16,
    elevation: 5,
  },
  label: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    gap: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000000',
    borderRadius: 25,
    borderWidth: 0.3,
    height: 50,
  },
  Icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
    color: 'black',
  },
  text: {
    fontSize: 16,
    marginRight: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: '400',
  },
});
