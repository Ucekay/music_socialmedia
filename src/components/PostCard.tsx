import React, {useState} from 'react';
import { View, StyleSheet, Text, Pressable, Dimensions, Modal, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { type PostDataType } from '../types';
import { Link } from 'expo-router';
import HeartIcon from './Icon/HeartIcon';
import IconAntDesign from './Icon/AntDesign';
import ShareIcon from './Icon/ShareIcon';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Message } from 'iconoir-react-native';
import PostImages from './PostImages';
import BgView from './ThemedBgView';
import Colors from '../constants/Colors';

const screen = Dimensions.get('screen');

const PostCard = (props: PostDataType): JSX.Element => {
  
  const [modalStatus, setModalStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState([{url: ""}])
  const [initialIndex, setInitialIndex] = useState(0);

  const ImageUrlRow = JSON.stringify(props.ImageUrl);

  const colorScheme = useColorScheme();

  const themeTextColor = {
    color: Colors[colorScheme ?? 'light'].text,
  };

  const textColor = 
  colorScheme === 'light'
  ? '#000000'
  : '#ffffff'

  const onClose = () => {
    setModalStatus(false)
  }

  const HandleImage = (n : number) => {
    if (props?.ImageUrl) {
      setImageUrl(props.ImageUrl.map((url) => ({ url })))
    }
    setInitialIndex(n)
    setModalStatus(true);
  }

  return (
    <Link
    href={{
      pathname: props.path,
      params: {
        postID: props.postID,
        postContent: props.postContent,
        ImageUrlRow: ImageUrlRow,
        userID: props.userID,
        user: props.user,
        userAvatarUrl: props.userAvatarUrl,
        createAt: props.createAt,
        view: props.view
      },
      }}
      asChild
    >
      <Pressable style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image source={props.userAvatarUrl} style={styles.image} />
          <View style={{ flex: 1 }}>
            <View
              style={[
                { justifyContent: 'space-between' },
                { flexDirection: 'row' },
                { flex: 1 },
              ]}
            >
              <View style={{justifyContent: 'space-between', flexDirection:'row', flex:1}}>
              <View>
                <Text style={[styles.text1, themeTextColor]}>{props.user}</Text>
              </View>
              <View style={styles.headerRight}>
                <Text style={[{fontSize: 14}, themeTextColor]}>6m</Text>
                <IconAntDesign
                  name='ellipsis1'
                  size={16}
                />
              </View>
              </View>
            </View>
            <View>
              <Text style={[styles.postContent, themeTextColor]}>{props.postContent}</Text>
              <PostImages imageUrls={props.ImageUrl}/>
            </View>
          </View>
        </View>
        <View style={styles.Icons}>
          <HeartIcon size={16} color={textColor}/>
          <Link href={{
          pathname: '/reply-editor-modal',
          params: {
            postID: props.postID,
            postContent: props.postContent,
            ImageUrlRow: ImageUrlRow,
            userID: props.userID,
            user: props.user,
            userAvatarUrl: props.userAvatarUrl,
            createAt: props.createAt,
            view: props.view
          },
          }}
          asChild >
          <Message width={16} height={16} color={textColor}/>
          </Link>
          <ShareIcon size={16} color={textColor}/>
        </View>
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
    lineHeight: 20,
    marginRight: 12,
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
    marginRight: 12,
    width: screen.width - 74,
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  imageContainer: {
    height: 150,
    width: screen.width - 74,
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 16,
    flexDirection: 'row',
    objectFit: 'cover',
    overflow: 'hidden',
    flexWrap: 'wrap',
    gap: 2
  },
  Image2: {
    height: 150,
    width: screen.width/2 - 38
  },
  imageContainer2:{
    height: 150,
    width: screen.width/2 - 38,
    gap: 2
  },
  Image3: {
    height: 78,
    width: '100%'
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


