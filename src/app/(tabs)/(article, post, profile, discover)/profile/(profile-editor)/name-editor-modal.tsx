import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

import BgView from '@/src/components/ThemedBgView';
import Color from '@/src/constants/Colors';
import Colors from '@/src/constants/Colors';
import { ProfileEditorContext } from '@/src/contexts/ProfileEditor';

const NameEditor = (): JSX.Element => {
  const context = useContext(ProfileEditorContext);

  const router = useRouter();

  if (!context) {
    throw new Error(
      'NameEditorModal must be used within a ProfileEditorProvider',
    );
  }

  const colorScheme = useColorScheme();
  const textColor = Color[colorScheme ?? 'light'].text;
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;

  const { name, setName } = context;
  const [nameEditing, setNameEditing] = useState(name);

  return (
    <BgView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.headerItem, { alignItems: 'flex-start' }]}
        >
          <Text style={[styles.text1, { color: textColor }]}>キャンセル</Text>
        </Pressable>
        <View style={[styles.headerItem]}>
          <Text style={[styles.text2, { color: textColor }]}>nameを編集</Text>
        </View>
        <Pressable
          onPress={() => {
            setName(nameEditing);
            router.back();
          }}
          style={[styles.headerItem, { alignItems: 'flex-end' }]}
        >
          <Text style={[styles.text2, { color: '#2f95dc' }]}>完了</Text>
        </Pressable>
      </View>
      <View style={[styles.Editor, { borderColor: textColor }]}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>
          name
        </Text>
        <TextInput
          style={{ color: textColor }}
          value={nameEditing}
          onChangeText={setNameEditing}
          placeholder='名前を入力'
        />
      </View>
    </BgView>
  );
};

export default NameEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingHorizontal: 16,
  },
  headerItem: {
    alignItems: 'center',
    flex: 1,
  },
  Editor: {
    height: 100,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 0.3,
    gap: 8,
  },
  text1: {
    fontSize: 16,
  },
  text2: {
    fontSize: 16,
    fontWeight: '600',
  },
});
