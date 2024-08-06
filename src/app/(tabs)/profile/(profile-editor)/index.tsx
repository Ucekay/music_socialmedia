// PostScreen.js
import React, { useState, useRef, useEffect, useContext} from 'react';
import { View,
         Button,
         StyleSheet, 
         Text, 
         useColorScheme, 
         ScrollView, 
         Platform, 
         Animated as Animated1, 
         Pressable, 
         Modal,
         ActivityIndicator,
         Dimensions
        } from 'react-native';
import userData from '../../../../assets/userData';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BgView from '@/src/components/ThemedBgView';
import Color from '@/src/constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation, useRouter, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker';
import Colors from '@/src/constants/Colors';
import { ProfileEditorContext } from '@/src/contexts/ProfileEditor';


const ProfileEditorModal = () => {
  const context = useContext(ProfileEditorContext);
  const router = useRouter();

  if (!context) {
    throw new Error('ProfileEditorModal must be used within a ProfileEditorProvider');
  }

  const {name, id, bio, tag} = context

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving profile changes...');
  };
  const insets = useSafeAreaInsets();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false)
  const navigation1 = useNavigation();
  
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    setErrorMessage('');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 4 - images.length,
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      for (let i = 0; i < result.assets.length; i++) 
      setImages(images => [...images, result.assets[i].uri])
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

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setLoading(true);
        setImages(images => [...images, result.assets[i].uri])
        setLoading(false);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      setLoading(false);
    }
  };

  const textColor = Color[colorScheme ?? 'light'].text;
  const secondaryTextColor = Color[colorScheme ?? 'light'].secondaryText;

  const BOTTOM_TAB_HEIGHT = 96.7;

   
  const openCropEditor = async (num: number, uri: string) => {
    try {
      setLoading(true)
      const cropped = await ImageCropPicker.openCropper({
        path: uri,
        cropperToolbarTitle: '画像を編集',
        mediaType: 'photo',
        freeStyleCropEnabled: true
      });
      setImages(images.map((images, index) => (index === num ? cropped.path : images )));
    } catch (e: any) {
      console.log(e.message);
      if (e.message === 'User cancelled image selection') {
        setErrorMessage(
          '画像のクロップがキャンセルされたので、画像を読み込めませんでした。'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <BgView style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: BOTTOM_TAB_HEIGHT }}
      >
      <View style={styles.header}>
        <Text style={[styles.headertitle, {color: textColor}]}>プロフィールを編集</Text>
      </View>
      <Modal animationType='fade' transparent={true} visible={loading}>
        <View style={styles.dialog}>
          <BlurView tint={'systemMaterial'} style={styles.dialogInner}>
            <Text style={styles.text}>画像を読み込んでいます</Text>
            <ActivityIndicator />
          </BlurView>
        </View>
      </Modal>
      <View style={{marginHorizontal: 16 , marginTop: 50}}>
        <View style={styles.profileHeader}>
            <Image
            source={{ uri: 'https://api.dicebear.com/8.x/bottts/png' }}
            style={styles.avatar}
            />
        </View>
        <View style={[styles.card, { backgroundColor, shadowColor }]}>
            <View style={styles.profileContent}>
                <Pressable onPress={() => {router.push('/(tabs)/profile/(profile-editor)/name-editor-modal')}}>
                  <View style={{borderBottomColor: '#ddd', borderBottomWidth: 1, marginHorizontal: 10}}>
                      <Text style={[styles.label, {color: textColor}]}>name</Text>
                      <Text style={[styles.text1, {color: textColor}]}>{name}</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => {router.push('/(tabs)/profile/(profile-editor)/id-editor-modal')}}>
                <View style={{borderBottomColor: '#ddd', borderBottomWidth: 1, marginHorizontal: 10, paddingTop: 16}}>
                    <Text style={[styles.label, {color: textColor}]}>id</Text>
                    <Text style={[styles.text1, {color: textColor}]}>{id}</Text>
                </View>
                </Pressable>
                <Pressable onPress={() => {router.push('/(tabs)/profile/(profile-editor)/bio-editor-modal')}}>
                <View style={{borderBottomColor: '#ddd', borderBottomWidth: 1, marginHorizontal: 10, paddingTop: 16}}>
                    <Text style={[styles.label, {color: textColor}]}>comment</Text>
                    <Text style={[styles.text1, {color: textColor}]}>{bio}</Text>
                </View>
                </Pressable>
                <Pressable onPress={() => {router.push('/(tabs)/profile/(profile-editor)/favoriteArtists-editor-modal')}}>
                <View style={{ marginHorizontal: 10, paddingTop: 16, gap: 8}}>
                <Text style={[styles.label, {color: textColor}]}>favarite artists</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {tag.map((item, index) => (
                    <View
                      style={[styles.item, {marginBottom:4, flexDirection:'row'}]}
                      key={index}
                    >
                      <Text style={{color: '#c0c0c0'}}>#</Text>
                      <Text style={{color: textColor}}> {item}</Text>
                    </View>
                  ))
                }
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

export default ProfileEditorModal

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  header: {
    alignItems:"center",
    borderBottomWidth:1,
    paddingBottom:20,
    borderBottomColor: '#ddd'
  },
  headertitle:{
    fontSize:18,
    fontWeight: '700',
  },
  line:{
    borderLeftWidth:2,
    borderLeftColor:"#ddd",
    marginLeft: 31,
    marginTop: 10,
  },
  editorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop:20,
    flex: 1,
  },
  text1: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginVertical: 8
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
  Icon:{
    color:'#808080',
    marginBottom:20
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  status:{
    fontSize:14,
    marginBottom: 6,
    color: '#ddd'
  },
  image: {
    marginBottom: 20,
    borderRadius: 10,
    marginRight: 10
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
    fontSize:16,
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
    paddingRight: 12
  },
});