import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BgView from '@/src/components/ThemedBgView';
import ThemedText from '@/src/components/ThemedText';
import Colors from '@/src/constants/Colors';
import { useTheme } from '@/src/contexts/ColorThemeContext';
import { ProfileEditorContext } from '@/src/contexts/ProfileEditor';

const ProfileEditorModal = () => {
  const context = useContext(ProfileEditorContext);
  const router = useRouter();
  const { colors } = useTheme();

  if (!context) {
    throw new Error(
      'ProfileEditorModal must be used within a ProfileEditorProvider',
    );
  }

  const { name, id, bio, tag, userAvatar, setUserAvatar } = context;

  const handleSave = () => {
    console.log('Saving profile changes...');
  };
  const insets = useSafeAreaInsets();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigation1 = useNavigation();

  const pickImage = async () => {
    setErrorMessage('');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      setUserAvatar(result.assets[0].uri);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;
  const shadowColor = colorScheme === 'dark' ? '#fff' : '#000';
  const textColor = colors.text;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const secondaryTextColor = colors.secondaryText;

  const BOTTOM_TAB_HEIGHT = 96.7;

  return (
    <BgView style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: BOTTOM_TAB_HEIGHT }}
      >
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>プロフィールを編集</ThemedText>
        </View>
        <Modal animationType='fade' transparent={true} visible={loading}>
          <View style={styles.dialog}>
            <BlurView tint={'systemMaterial'} style={styles.dialogInner}>
              <Text style={styles.text}>画像を読み込んでいます</Text>
              <ActivityIndicator />
            </BlurView>
          </View>
        </Modal>
        <View style={{ marginHorizontal: 16, marginTop: 50 }}>
          <Pressable onPress={pickImage}>
            <View style={styles.profileHeader}>
              <Image source={{ uri: userAvatar }} style={styles.avatar} />
            </View>
          </Pressable>
          <View style={[styles.card, { backgroundColor, shadowColor }]}>
            <View style={styles.profileContent}>
              <Pressable
                onPress={() => {
                  router.push(
                    '/(tabs)/profile/(profile-editor)/name-editor-modal',
                  );
                }}
              >
                <View
                  style={{
                    borderBottomColor: '#ddd',
                    borderBottomWidth: 1,
                    marginHorizontal: 10,
                  }}
                >
                  <ThemedText style={styles.label}>name</ThemedText>
                  <ThemedText style={styles.text1}>{name}</ThemedText>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  router.push(
                    '/(tabs)/profile/(profile-editor)/id-editor-modal',
                  );
                }}
              >
                <View
                  style={{
                    borderBottomColor: '#ddd',
                    borderBottomWidth: 1,
                    marginHorizontal: 10,
                    paddingTop: 16,
                  }}
                >
                  <ThemedText style={styles.label}>id</ThemedText>
                  <ThemedText style={styles.text1}>{id}</ThemedText>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  router.push(
                    '/(tabs)/profile/(profile-editor)/bio-editor-modal',
                  );
                }}
              >
                <View
                  style={{
                    borderBottomColor: '#ddd',
                    borderBottomWidth: 1,
                    marginHorizontal: 10,
                    paddingTop: 16,
                  }}
                >
                  <ThemedText style={styles.label}>comment</ThemedText>
                  <ThemedText style={styles.text1}>{bio}</ThemedText>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  router.push(
                    '/(tabs)/profile/(profile-editor)/favoriteArtists-editor-modal',
                  );
                }}
              >
                <View style={{ marginHorizontal: 10, paddingTop: 16, gap: 8 }}>
                  <ThemedText style={styles.label}>favorite artists</ThemedText>
                  <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                    {tag.map((item) => (
                      <View
                        style={[
                          styles.item,
                          { marginBottom: 4, flexDirection: 'row' },
                        ]}
                        key={item}
                      >
                        <Text style={{ color: '#c0c0c0' }}>#</Text>
                        <ThemedText> {item}</ThemedText>
                      </View>
                    ))}
                  </View>
                </View>
              </Pressable>
            </View>
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
          <View style={[styles.buttonContainer]}>
            <FontAwesome6 name='xmark' size={16} color={textColor} />
            <Button
              title='Close'
              onPress={() => {
                navigation1.goBack();
              }}
              color={textColor}
            />
          </View>
        </View>
      </BgView>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </BgView>
  );
};

export default ProfileEditorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  line: {
    marginLeft: 31,
    marginTop: 10,
    borderLeftColor: '#ddd',
    borderLeftWidth: 2,
  },
  editorHeader: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  text1: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginVertical: 8,
  },
  card: {
    padding: 16,
    paddingBottom: 20,
    borderCurve: 'continuous',
    borderRadius: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 40,
  },
  avatarImage: {
    width: 30,
    height: 30,
    marginLeft: 16,
    marginRight: 12,
    borderColor: '#000000',
    borderRadius: 15,
    borderWidth: 0.3,
  },
  Icon: {
    marginBottom: 20,
    color: '#808080',
  },
  headerLeft: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: 8,
  },
  status: {
    fontSize: 14,
    marginBottom: 6,
    color: '#ddd',
  },
  image: {
    marginBottom: 20,
    marginRight: 10,
    borderRadius: 10,
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
    marginHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 4,
  },
  dialog: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dialogInner: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderCurve: 'continuous',
    borderRadius: 16,
    gap: 12,
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
    marginBottom: 10,
    borderRadius: 50,
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
    fontSize: 16,
    height: 30,
    marginBottom: 10,
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 0,
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
