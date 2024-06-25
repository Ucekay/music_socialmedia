import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image as RNImage,
  Modal,
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


const screen = Dimensions.get('screen');

const PostDetailScreen = (): JSX.Element => {
  const { id } = useLocalSearchParams();
  const [height, setHeight] = useState<number>(0);
  const [modalStatus, setModalStatus] = useState(false);
  const { setActionVisible } = useTabAction();
  const { setProfileDismissed } = useProfileScreen();
  useFocusEffect(
    React.useCallback(() => {
      setProfileDismissed(false);
      return () => {
        setActionVisible(false);
      };
    }, [])
  );
  const post = postData.find((item) => item.postID === id);
  if (!post) {
    return <Text>Post not found.</Text>;
  }
  if (post?.ImageUrl) {
    RNImage.getSize(post.ImageUrl, (originalWidth, originalHeight) => {
      const newHeight = (Number(screen.width) * originalHeight) / originalWidth;
      setHeight(newHeight);
    });
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
      {post.ImageUrl && (
        <>
          <Pressable onPress={() => setModalStatus(true)}>
            <Image
              style={[
                { width: screen.width * 0.9 },
                { height: height * 0.9 },
                { marginHorizontal: screen.width * 0.05 },
                { borderRadius: 10 },
              ]}
              source={post.ImageUrl}
            />
          </Pressable>
          <Modal
            visible={modalStatus}
            animationType='fade'
            onRequestClose={() => setModalStatus(false)}
            style={[
              { width: screen.width },
              { height: screen.height },
              { justifyContent: 'center' },
              { backgroundColor: '#000000' },
            ]}
          >
            <Pressable onPress={() => setModalStatus(false)}>
              <View
                style={[
                  { width: screen.width },
                  { height: screen.height },
                  { justifyContent: 'center' },
                  { backgroundColor: '#000000' },
                ]}
              >
                <Pressable>
                  <GestureHandlerRootView>
                    <Image
                      source={post.ImageUrl}
                      style={[{ width: screen.width }, { height: height }]}
                    />
                  </GestureHandlerRootView>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
        </>
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
});
