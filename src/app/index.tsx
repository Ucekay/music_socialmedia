import React from "react";
import { View, StyleSheet, Pressable, Text, useWindowDimensions, useColorScheme } from 'react-native'
import { GoogleCircle, AppleMac } from 'iconoir-react-native'
import BgView from "../components/ThemedBgView";
import Colors from '../constants/Colors';
import { router } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";

export default function TabIndex() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;
  const containerWidth = width - 32;
  const shadowColor = colorScheme === 'dark' ? '#fff' : '#000';


  const HandleGoogle = () => {
    router.replace('/(tabs)')
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
           <Pressable onPress={HandleGoogle}>
             <View style={styles.button}>
                <GoogleCircle style={styles.Icon} width={30} height={30} />
                <Animated.Text
                style={styles.text}>Googleでサインインする</Animated.Text>
             </View>
           </Pressable>
           <Pressable>
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
      paddingTop: 200,
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