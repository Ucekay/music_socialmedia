import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  Modal,
  useColorScheme,
} from 'react-native';
import { Image } from 'expo-image';
import { type PostDataType } from '../types';
import { Link } from 'expo-router';
import HeartIcon from './Icons/HeartIcon';
import IconAntDesign from './Icons/AntDesign';
import ShareIcon from './Icons/ShareIcon';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Message } from 'iconoir-react-native';
import PostImages from './PostImages';

import { formatCreatedAt } from '@/src/utils/date/formatCreatedAt';

const screen = Dimensions.get('screen');

const PostCard = ({ post }: { post: PostDataType }): JSX.Element => {
  const [modalStatus, setModalStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState([{ url: '' }]);
  const [initialIndex, setInitialIndex] = useState(0);

  const colorScheme = useColorScheme();

  const ImageUrlRow = JSON.stringify(post.ImageUrl);

  const onClose = () => {
    setModalStatus(false);
  };

  const HandleImage = (n: number) => {
    if (post?.ImageUrl) {
      setImageUrl(post.ImageUrl.map((url) => ({ url })));
    }
    setInitialIndex(n);
    setModalStatus(true);
  };

  const themeTextColor =
    colorScheme === 'light' ? { color: '#000000' } : { color: '#ffffff' };

  const { formattedDate, timeAgo, daysDifference } = formatCreatedAt(
    post.createdAt
  );

  return (
    <Link href={`./post-screen/${post.postID}`} asChild>
      <Pressable style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image source={post.userAvatarUrl} style={styles.image} />
          <View style={{ flex: 1 }}>
            <View
              style={[
                { justifyContent: 'space-between' },
                { flexDirection: 'row' },
                { flex: 1 },
              ]}
            >
              <View>
                <Text style={[styles.text1, themeTextColor]}>{post.user}</Text>
              </View>
              <View style={styles.headerRight}>
                <Text style={themeTextColor}>
                  {daysDifference > 3 ? formattedDate : timeAgo}
                </Text>
                <IconAntDesign
                  name='ellipsis1'
                  size={16}
                  style={{ themeTextColor }}
                />
              </View>
            </View>
            <View>
              <Text style={[styles.postContent, themeTextColor]}>
                {post.postContent}
              </Text>
              <PostImages imageUrls={post.ImageUrl} postID={post.postID} />
            </View>
          </View>
        </View>
        <View style={styles.Icons}>
          <HeartIcon
            width={16}
            height={16}
            initialcolor={themeTextColor.color}
          />
          <Link
            href={{
              pathname: '/reply-editor-modal',
              params: {
                postID: post.postID,
                postContent: post.postContent,
                ImageUrlRow: ImageUrlRow,
                userID: post.userID,
                user: post.user,
                userAvatarUrl: post.userAvatarUrl,
                createAt: post.createdAt,
                view: post.likes,
              },
            }}
            asChild
          >
            <Message width={16} height={16} color={themeTextColor.color} />
          </Link>
          <ShareIcon width={16} height={16} color={themeTextColor.color} />
        </View>
        <View
          style={[
            { backgroundColor: 'rgba(67, 80, 96, 0.3)' },
            { marginHorizontal: 16 },
            { height: 0.2 },
          ]}
        />
      </Pressable>
    </Link>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    marginHorizontal: 16,
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgba(67, 80, 96, 0.3)',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    flex: 1,
  },
  text1: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
    marginTop: 4,
  },
  Icons: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 56,
    gap: 24,
    marginBottom: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  postImage: {
    width: screen.width - 74,
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  imageContainer: {
    height: 150,
    width: screen.width - 74,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    objectFit: 'cover',
    overflow: 'hidden',
    flexWrap: 'wrap',
    gap: 2,
  },
  Image2: {
    height: 150,
    width: screen.width / 2 - 38,
  },
  imageContainer2: {
    height: 150,
    width: screen.width / 2 - 38,
    gap: 2,
  },
  Image3: {
    height: 78,
    width: '100%',
  },
  imageModal: {
    flex: 1,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});
