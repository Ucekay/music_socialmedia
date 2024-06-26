// PostScreen.js
import React, { useState, useRef} from 'react';
import { View, TextInput, Button, StyleSheet, Text, useColorScheme, ScrollView, Platform, Animated, Pressable, FlatList,Image as RNImage } from 'react-native';
import userData from '../assets/userData';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BgView from '../components/ThemedBgView';
import IconAntDesign from '../components/Icon/AntDesign';
import Color from '@/src/constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Icon from "react-native-vector-icons/AntDesign"
import ImageAspectKept from '../components/ImageAspectKept';

const PostEditorModal = () => {
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();
  const [inputHeight, setInputHeight] = useState(40); // 初期の高さを設定
  const [postHeight, setPostHeight] = useState(60);
  const [imagelayout, setImagelayout] = useState(false);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const animatedHeight = useRef(new Animated.Value(0)).current; 
  
  const [images, setImages] = useState(['https://assets.st-note.com/production/uploads/images/118769644/rectangle_large_type_2_dfac95fd8fb3ca429c798b9656b2c54d.png?width=2000&height=2000&fit=bounds&format=jpg&quality=85',
  'https://assets.st-note.com/production/uploads/images/119567308/rectangle_large_type_2_64867acd466f0affc7c9fa6020ecd244.png?width=2000&height=2000&fit=bounds&format=jpg&quality=85',
  'https://m.media-amazon.com/images/I/71GJUXIF6QL._UF1000,1000_QL80_.jpg'
  ]);

  const textColor = Color[colorScheme ?? 'light'].text;
  const secondaryTextColor = Color[colorScheme ?? 'light'].secondaryText;

  const BOTTOM_TAB_HEIGHT = 96.7;

  const handlePost = () => {
    setText('')
    // ここでポストをサーバーに送信する処理を追加します
    console.log('Posted:', text, images);
  };

  const handleLayoutChange = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setPostHeight(height-60); // Viewの高さを状態に保存

    // 高さをアニメーションで変更
    Animated.timing(animatedHeight, {
      toValue: height,
      duration: 300, // アニメーションの持続時間（ミリ秒）
      useNativeDriver: false, // height のアニメーションには native driver は使えない
    }).start();
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleLayoutChangeLine = () => {
    Animated.timing(animatedHeight, {
      toValue: postHeight,
      duration: 100, // アニメーションの持続時間（ミリ秒）
      useNativeDriver: false, // height のアニメーションには native driver は使えない
    }).start();
  };

  return (
    
    <BgView style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: BOTTOM_TAB_HEIGHT }}
      >
      <View style={styles.header}>
        <Text style={[styles.headertitle, {color: textColor}]}>新規ポスト</Text>
      </View>
      <View style={styles.editorHeader}>
          <View style={{flexDirection: 'column'}}>
            <Image source={userData[0].userAvatarUrl} style={styles.avatorimage} />
            <Animated.View 
            style={[styles.line, {height: animatedHeight}]}
            onLayout={handleLayoutChangeLine}/>
          </View>
            <Animated.View
              style={[
                { flexDirection: 'column' },
                { flex: 1 },
              ]}
              onLayout={handleLayoutChange}
            >
              <View style={styles.headerLeft}>
                <Text style={styles.text1}>{userData[0].user}</Text>
              </View>
                <TextInput
                    style={[styles.input, { height: Math.max(inputHeight+10), color: textColor, borderBottomColor: secondaryTextColor}]}
                    multiline
                    placeholder="Postを新規追加"
                    value={text}
                    onChangeText={setText}
                    onContentSizeChange={(event) => {
                      setInputHeight(event.nativeEvent.contentSize.height + 10);
                    }}
                    scrollEnabled={false}
                />
              {imagelayout===true ? (
              <FlatList
              horizontal
              data={images}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                  <ImageAspectKept style={styles.image} url={item} height={200}>
                    <Pressable
                      style={styles.deleteButton}
                      onPress={() => handleDeleteImage(index)}
                    >
                      <Icon name="delete" size={24} color="#fff" />
                    </Pressable>
                  </ImageAspectKept>
              )}
            />) : (
              null
              )}
            <IconAntDesign name='paperclip' size={20} style={styles.Icon} onPress={() => setImagelayout(!imagelayout)}/>
            </Animated.View>
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
                navigation.goBack();
              }}
              color={textColor}
            />
          </View>
          <View style={styles.buttonContainer}>
            <FontAwesome6 name='check' size={16} color={textColor} />
            <Button title='Post' onPress={() => {}} color={textColor} />
          </View>
        </View>
      </BgView>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </BgView>
  );
};

export default PostEditorModal

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingRight: 20,
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
    fontWeight: '500',
    lineHeight: 16,
  },
  input: {
    fontSize: 14,
    marginTop: 10,
    textAlignVertical: 'top',
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
    marginRight: 8,
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
});
