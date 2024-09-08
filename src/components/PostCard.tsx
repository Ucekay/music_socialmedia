import { Link } from 'expo-router';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
import { Message } from 'iconoir-react-native';

import { formatCreatedAt } from '@/src/utils/date/formatCreatedAt';

import { useTheme } from '../contexts/ColorThemeContext';

import IconAntDesign from './Icons/AntDesign';
import HeartIcon from './Icons/HeartIcon';
import ShareIcon from './Icons/ShareIcon';
import PostImages from './PostImages';
import Text from './ThemedText';

import type { PostDataType } from '../types';
const screen = Dimensions.get('screen');

const PostCard = ({ post }: { post: PostDataType }): JSX.Element => {
  const { colors } = useTheme();

  const ImageUrlRow = JSON.stringify(post.ImageUrl);

  const textColor = colors.text;

  const { formattedDate, timeAgo, daysDifference } = formatCreatedAt(
    post.createdAt,
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
                <Text style={styles.text1}>{post.user}</Text>
              </View>
              <View style={styles.headerRight}>
                <Text>{daysDifference > 3 ? formattedDate : timeAgo}</Text>
                <IconAntDesign name='ellipsis1' size={16} color={textColor} />
              </View>
            </View>
            <View>
              <Text style={styles.postContent}>{post.postContent}</Text>
              <PostImages imageUrls={post.ImageUrl} postID={post.postID} />
            </View>
          </View>
        </View>
        <View style={styles.Icons}>
          <HeartIcon width={16} height={16} initialColor={textColor} />
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
            <Message width={16} height={16} color={textColor} />
          </Link>
          <ShareIcon width={16} height={16} color={textColor} />
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
    borderBottomColor: 'rgba(67, 80, 96, 0.3)',
    borderBottomWidth: 0.3,
  },
  postHeader: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
  },
  text1: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 12,
    borderRadius: 15,
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
    marginBottom: 12,
    marginLeft: 56,
    gap: 24,
  },
  headerRight: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: 8,
  },
  postImage: {
    width: screen.width - 74,
    height: 150,
    marginBottom: 16,
    borderRadius: 10,
  },
  imageContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screen.width - 74,
    height: 150,
    marginBottom: 16,
    borderRadius: 12,
    objectFit: 'cover',
    gap: 2,
  },
  Image2: {
    width: screen.width / 2 - 38,
    height: 150,
  },
  imageContainer2: {
    width: screen.width / 2 - 38,
    height: 150,
    gap: 2,
  },
  Image3: {
    width: '100%',
    height: 78,
  },
  imageModal: {
    flex: 1,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    zIndex: 1,
    top: 40,
    right: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  closeButtonText: {
    color: '#ffffff',
  },
  modalOverlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});
