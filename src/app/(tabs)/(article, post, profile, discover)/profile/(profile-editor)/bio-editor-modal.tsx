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
import Colors from '@/src/constants/Colors';
import { useTheme } from '@/src/contexts/ColorThemeContext';
import { ProfileEditorContext } from '@/src/contexts/ProfileEditor';

const BioEditor = (): JSX.Element => {
  const context = useContext(ProfileEditorContext);

  const router = useRouter();

  if (!context) {
    throw new Error(
      'NameEditorModal must be used within a ProfileEditorProvider',
    );
  }
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const textColor = colors.text;
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;

  const { bio, setBio } = context;
  const [bioEditing, setBioEditing] = useState(bio);
  const [inputHeight, setInputHeight] = useState(60);

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
          <Text style={[styles.text2, { color: textColor }]}>
            commentを編集
          </Text>
        </View>
        <Pressable
          onPress={() => {
            setBio(bioEditing);
            router.back();
          }}
          style={[styles.headerItem, { alignItems: 'flex-end' }]}
        >
          <Text style={[styles.text2, { color: '#2f95dc' }]}>完了</Text>
        </Pressable>
      </View>
      <View
        style={[
          styles.Editor,
          { height: Math.max(100, inputHeight + 50), borderColor: textColor },
        ]}
      >
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>
            comment
          </Text>
        </View>
        <TextInput
          style={{ color: textColor }}
          value={bioEditing}
          onChangeText={setBioEditing}
          placeholder='自己紹介を入力'
          multiline={true}
          onContentSizeChange={(event) => {
            setInputHeight(event.nativeEvent.contentSize.height + 10);
          }}
          scrollEnabled={false}
        />
      </View>
    </BgView>
  );
};

export default BioEditor;

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
    borderColor: '#000000',
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
