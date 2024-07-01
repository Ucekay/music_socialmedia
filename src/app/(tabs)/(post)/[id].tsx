import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image as RNImage,
  Modal,
  GestureResponderEvent
} from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import postData from '@/src/assets/postData';
import MusicBarOfPost from '@/src/components/MusicBarOfPost';
import UserTagOfProfileDetail from '@/src/components/UserTagOfProfileDetail';
import HeartIcon from '@/src/components/Icon/HeartIcon';
import { Image } from 'expo-image';
import IconAntDesign from '@/src/components/Icon/AntDesign';
import TabActionMenu from '@/src/components/TabActionMenu';
import TabActionMenuList from '@/src/components/TabActionMenuList';
import { useTabAction } from '@/src/contexts/ActionButtonContext';
import { useProfileScreen } from '@/src/contexts/ProfileScreenContext';
import ShareIcon from '@/src/components/Icon/ShareIcon';
import ImageViewer from 'react-native-image-zoom-viewer';


const screen = Dimensions.get('screen');

const PostDetailScreen = (): JSX.Element => {
  const { id } = useLocalSearchParams();
  const post = postData.find((item) => item.postID === id);
  const [modalStatus, setModalStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState([{url: ""}])
  const [initialIndex, setInitialIndex] = useState(0);
  const { setActionVisible } = useTabAction();
  const { setProfileDismissed } = useProfileScreen();

  const HandleImage = (n : number) => {
    if (post?.ImageUrl) {
      setImageUrl(post.ImageUrl.map((url) => ({ url })))
    }
    setInitialIndex(n)
    setModalStatus(true);
  }

  const onClose = () => {
    setModalStatus(false)
  }
  useFocusEffect(
    React.useCallback(() => {
      setProfileDismissed(false);
      return () => {
        setActionVisible(false);
      };
    }, [])
  );
  if (!post) {
    return <Text>Post not found.</Text>;
  }
  return (
    <View style={styles.container}>
      <UserTagOfProfileDetail
        user={post.user}
        userAvatarUrl={post.userAvatarUrl}
        userID={post.userID}
      />
      <Text
        style={[styles.text1, { marginHorizontal: 16 }, { marginBottom: 16 }]}
      >
        {post.postContent}
      </Text>
      {post.ImageUrl.length !== 0 && (
        <View>
            <View>
              {post.ImageUrl.length === 1 && ( 
                <Pressable onPress={(e) => HandleImage(0)}>
                  <Image source={post.ImageUrl[0]} style={styles.postImage} />
                </Pressable>
              )}
              {post.ImageUrl.length === 2 && (
              <View style={styles.imageContainer}> 
                <Pressable onPress={(e) => HandleImage(0)}>
                  <Image source={post.ImageUrl[0]} style={styles.Image2}/>
                </Pressable>
                <Pressable onPress={(e) => HandleImage(1)}>
                  <Image source={post.ImageUrl[1]} style={styles.Image2}/>
                </Pressable>
              </View>)}
              {post.ImageUrl.length === 3 && (
              <View style={styles.imageContainer}> 
                <Pressable onPress={(e) => HandleImage(0)}>
                  <Image source={post.ImageUrl[0]} style={styles.Image2}/>
                </Pressable>
                <View style={styles.imageContainer2}>
                  <Pressable onPress={(e) => HandleImage(1)}>  
                    <Image source={post.ImageUrl[1]} style={styles.Image3}/>
                  </Pressable>
                  <Pressable onPress={(e) => HandleImage(2)}> 
                    <Image source={post.ImageUrl[2]} style={styles.Image3}/>
                  </Pressable>
                </View>
              </View>)}
              {post.ImageUrl.length === 4 && (
              <View style={styles.imageContainer}> 
                <View style={styles.imageContainer2}>
                  <Pressable onPress={(e) => HandleImage(0)}>  
                    <Image source={post.ImageUrl[0]} style={styles.Image3}/>
                  </Pressable>
                  <Pressable onPress={(e) => HandleImage(1)}> 
                    <Image source={post.ImageUrl[1]} style={styles.Image3}/>
                  </Pressable>
                </View>
                <View style={styles.imageContainer2}>
                  <Pressable onPress={(e) => HandleImage(2)}>
                    <Image source={post.ImageUrl[2]} style={styles.Image3}/>
                  </Pressable>
                  <Pressable onPress={(e) => HandleImage(2)}>
                    <Image source={post.ImageUrl[3]} style={styles.Image3}/>
                  </Pressable> 
                </View>
              </View>)}
            </View>
          <Modal
                animationType="fade"
                transparent={true}
                visible={modalStatus}
                onRequestClose={onClose}
                style={styles.modalOverlay}
              >
                <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>閉じる</Text>
                </Pressable>
                <View style={{flex:1, paddingTop: 30, backgroundColor: '#000000'}}>
                <ImageViewer 
                imageUrls={imageUrl}
                enableSwipeDown
                onSwipeDown={onClose}
                index={initialIndex}
                renderImage={(props) => <Image {...props} style={styles.image} contentFit='contain'/>}/>
                </View>
          </Modal>
        </View>
      )}
      {post.musicUrl && <MusicBarOfPost {...post} style={{ marginLeft: 12 }} />}
      <View style={styles.infoContainer}>
        <Text style={styles.text3}>9:38・2024/03/24</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text3}>53件のいいね</Text>
      </View>
      <View style={styles.iconContainer}>
        <HeartIcon style={{ marginLeft: 16 }} size={20} />
        <IconAntDesign name='message1' size={20} />
        <IconAntDesign name='retweet' size={20} />
        <ShareIcon size={20} style={{ marginRight: 16 }} />
      </View>
      <TabActionMenu />
    </View>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  userContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  text1: {
    fontSize: 16,
    lineHeight: 19,
  },
  text2: {
    fontSize: 12,
    lineHeight: 12,
    color: 'rgba(67, 80, 96, 1)',
  },
  text3: {
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(67, 80, 96, 1)',
  },
  userAvatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  infoContainer: {
    marginHorizontal: 16,
    height: 34,
    justifyContent: 'center',
    borderBottomColor: 'rgba(67, 80, 96, 0.3)',
    borderBottomWidth: 0.5,
  },
  iconContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 24,
    marginVertical: 16,
  },
  musicBar: {
    height: 48,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 10,
  },
  musicContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicImage: {
    height: 40,
    width: 40,
    borderRadius: 4,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text4: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
    color: '#ffffff',
  },
  playIcon: {
    color: '#ffffff',
    opacity: 0.8,
  },
  postImage: {
    marginRight: 12,
    width: screen.width - 32,
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  imageContainer: {
    height: 150,
    width: screen.width - 32,
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 16,
    flexDirection: 'row',
    objectFit: 'cover',
    overflow: 'hidden',
    flexWrap: 'wrap',
    gap: 2,
    marginHorizontal:16
  },
  Image2: {
    height: 150,
    width: screen.width/2 - 17
  },
  imageContainer2:{
    height: 150,
    width: screen.width/2 - 17,
    gap: 2
  },
  Image3: {
    height: 78,
    width: '100%'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  image: {
    flex: 1,
    resizeMode: 'contain', // 画像のリサイズモード
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
  },
});
