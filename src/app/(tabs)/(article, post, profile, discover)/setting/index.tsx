// SettingsScreen.tsx
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, usePathname} from 'expo-router';
import { parse } from 'expo-linking'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BgView from '@/src/components/ThemedBgView';
import Color from '@/src/constants/Colors';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from 'react-native';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';


const SettingsScreen = () => { 
  const router = useRouter();
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;
  const shadowColor = colorScheme === 'dark' ? '#fff' : '#000';
  const textColor = Color[colorScheme ?? 'light'].text;
  const secondaryTextColor = Color[colorScheme ?? 'light'].secondaryText;
  const [loading, setLoading] = useState(false);
  const BOTTOM_TAB_HEIGHT = 96.7;
  const insets = useSafeAreaInsets();
  

  return (
    <BgView style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: BOTTOM_TAB_HEIGHT }}
      >
        <View style={styles.header}>
          <Text style={[styles.headertitle, { color: textColor }]}>
            設定
          </Text>
        </View>
        <Modal animationType="fade" transparent={true} visible={loading}>
          <View style={styles.dialog}>
            <BlurView tint={'systemMaterial'} style={styles.dialogInner}>
              <Text style={styles.text}>画像を読み込んでいます</Text>
              <ActivityIndicator />
            </BlurView>
          </View>
        </Modal>
        <View style={{ marginHorizontal: 16, marginTop: 50 }}>
        <View style={styles.settingItems}>
        <Link href="/(discover)/setting/help" asChild>
          <Pressable>
            <View style={styles.itemContainer}>
              <View style={styles.iconTitle}>
                <Ionicons name={"help-circle-outline"} size={24} color={textColor} />
                <Text style={[styles.titleText, {color:textColor}]}>{"ヘルプ"}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={24} color={textColor} />
            </View>
          </Pressable>
        </Link>
        <Pressable onPress={() => router.push("./help")}>
          <View style={styles.itemContainer}>
            <View style={styles.iconTitle}>
              <Ionicons name={"heart-outline"} size={24} color={textColor} />
              <Text style={[styles.titleText, {color:textColor}]}>{"いいねの記録"}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color={textColor} />
          </View>
        </Pressable>
        <Pressable onPress={() => router.push("./help")}>
          <View style={styles.itemContainer}>
            <View style={styles.iconTitle}>
              <Ionicons name={"moon-outline"} size={24} color={textColor} />
              <Text style={[styles.titleText, {color:textColor}]}>{"ダークモード"}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color={textColor} />
          </View>
        </Pressable>
          </View>
        </View>
      </ScrollView>
      <BgView
        style={[
          styles.bottomButtonWrapper,
          {
            paddingBottom: insets.bottom,
            paddingTop: 12,
          },
        ]}
      >
        <View
          style={[
            styles.bottomButtonContainer,
            { borderTopColor: secondaryTextColor },
          ]}
        >
          <Pressable onPress={() => router.back()}>
            <View style={styles.buttonContainer}>
              <Ionicons name="chevron-back-outline" size={16} color={textColor} />
              <Text style={{ color: textColor }}>戻る</Text>
            </View>
          </Pressable>
        </View>
      </BgView>
    </BgView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settingItems: {
    gap: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    marginLeft: 10,
  },
  container: {
    paddingTop: 20,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderBottomColor: '#ddd',
  },
  headertitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  line: {
    borderLeftWidth: 2,
    borderLeftColor: '#ddd',
    marginLeft: 31,
    marginTop: 10,
  },
  editorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    flex: 1,
  },
  text1: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginVertical: 8,
  },
  card: {
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 16,
    paddingBottom: 20,
    gap: 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  avatorimage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 16,
    marginRight: 12,
    borderWidth: 0.3,
    borderColor: '#000000',
  },
  Icon: {
    color: '#808080',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  status: {
    fontSize: 14,
    marginBottom: 6,
    color: '#ddd',
  },
  image: {
    marginBottom: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  bottomButtonWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
  },
  dialog: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogInner: {
    width: '70%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 16,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  text: {
    fontSize: 17,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    marginTop: 10,
  },
  profileContent: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 30,
    borderColor: '#ddd',
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    color: '#123456',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    height: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  item: {
    paddingRight: 12,
  },
});
