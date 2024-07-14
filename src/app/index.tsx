import React, {useState} from "react";
import { View, StyleSheet, Pressable, Text, useWindowDimensions, useColorScheme, TextInput, Button } from 'react-native'
import { GoogleCircle, AppleMac } from 'iconoir-react-native'
import BgView from "../components/ThemedBgView";
import { router } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";

export default function TabIndex() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  const HandleGoogle = () => {
    router.replace('/(tabs)')
  }

  const HandleApple = () => {
    router.replace('/(tabs)')
  }

  const HandleSignUp = () => {

  }

  const HandleLogIn = () => {

  }

  return (
    <BgView style={styles.screenContainer}>
        <Animated.View
        entering={FadeIn} 
        style={[styles.container]}>
            <View style={styles.label}>
              <View style={{ flexDirection: 'row', marginBottom: 10}}>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>M</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>u</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>s</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>i</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>c</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10}}>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>S</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>o</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>c</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>i</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>a</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>l</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10}}>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>M</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>e</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>d</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>i</Text>
                </View>
                <View style={{width: 30, height: 30, alignItems: 'center'}}>
                  <Text style={styles.header}>a</Text>
                </View>
              </View>
           </View>
           <View>
             <Text>Email:</Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <Text>Password:</Text>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
              <Button title="SignUp" onPress={HandleSignUp} />
              <Button title="Login" onPress={HandleLogIn} />
           </View>
           <Pressable onPress={HandleGoogle}>
             <View style={styles.button}>
                <GoogleCircle style={styles.Icon} width={30} height={30} />
                <Animated.Text
                style={styles.text}>Googleでサインインする</Animated.Text>
             </View>
           </Pressable >
           <Pressable onPress={HandleApple}>
             <View style={styles.button}>
                <AppleMac style={styles.Icon} width={30} height={30} />
                <Animated.Text style={styles.text}>Appleでサインインする</Animated.Text>
             </View>
           </Pressable> 
        </Animated.View>
    </BgView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
      flex:1,
      justifyContent: 'center',
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
    height: 50
  },
  Icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
    color: 'black'
  },
  text: {
    fontSize: 16,
    marginRight: 16
  },
  header: {
    fontSize: 30,
    fontWeight: '400',
  }
})