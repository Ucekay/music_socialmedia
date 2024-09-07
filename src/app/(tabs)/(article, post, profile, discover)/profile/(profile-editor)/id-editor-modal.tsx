import BgView from '@/src/components/ThemedBgView';
import Color from '@/src/constants/Colors';
import Colors from '@/src/constants/Colors';
import { ProfileEditorContext } from '@/src/contexts/ProfileEditor';
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

const IdEditor = (): JSX.Element => {
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

  const { id, setId } = context;
  const [idEditing, setIdEditing] = useState(id);

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
          <Text style={[styles.text2, { color: textColor }]}>idを編集</Text>
        </View>
        <Pressable
          onPress={() => {
            setId(idEditing);
            router.back();
          }}
          style={[styles.headerItem, { alignItems: 'flex-end' }]}
        >
          <Text style={[styles.text2, { color: '#2f95dc' }]}>完了</Text>
        </Pressable>
      </View>
      <View style={[styles.Editor, { borderColor: textColor }]}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>
          id
        </Text>
        <TextInput
          style={{ color: textColor }}
          value={idEditing}
          onChangeText={setIdEditing}
          placeholder='idを入力'
        />
      </View>
    </BgView>
  );
};

export default IdEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
  },
  Editor: {
    marginHorizontal: 16,
    padding: 16,
    borderColor: '#000000',
    borderWidth: 0.3,
    borderRadius: 20,
    height: 100,
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
