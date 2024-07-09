import React, {useState } from 'react';
import { View, StyleSheet, Text, Pressable, Dimensions, Modal } from 'react-native';
import { Image } from 'expo-image';
import MusicBarOfPost from './MusicBarOfPost';
import { type PostDataType } from '../types';
import { Link } from 'expo-router';
import HeartIcon from './Icon/HeartIcon';
import IconAntDesign from './Icon/AntDesign';
import ShareIcon from './Icon/ShareIcon';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Message } from 'iconoir-react-native'

const screen = Dimensions.get('screen');

const PostCard = (props: PostDataType): JSX.Element => {
  
  const [modalStatus, setModalStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState([{url: ""}])
  const [initialIndex, setInitialIndex] = useState(0);

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
        pathname: '/(tabs)/(post)/[id]',
        params: {
          id: props.postID,
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
              <View style={styles.headerLeft}>
                <Text style={styles.text1}>{props.user}</Text>
              </View>
              <View style={styles.headerLeft}>
                <Text>6m</Text>
                <IconAntDesign
                  name='ellipsis1'
                  size={16}
                  style={styles.threeDots}
                />
              </View>
            </View>
            <View>
              <Text style={styles.postContent}>{props.postContent}</Text>
              {props.ImageUrl.length === 0 && ( null )}
              {props.ImageUrl.length === 1 && ( 
                <Pressable onPress={(e) => HandleImage(0)}>
                  <Image source={props.ImageUrl[0]} style={styles.postImage} />
                </Pressable>
              )}
              {props.ImageUrl.length === 2 && (
              <View style={styles.imageContainer}> 
                <Pressable onPress={(e) => HandleImage(0)}>
                  <Image source={props.ImageUrl[0]} style={styles.Image2}/>
                </Pressable>
                <Pressable onPress={(e) => HandleImage(1)}>
                  <Image source={props.ImageUrl[1]} style={styles.Image2}/>
                </Pressable>
              </View>)}
              {props.ImageUrl.length === 3 && (
              <View style={styles.imageContainer}> 
                <Pressable onPress={(e) => HandleImage(0)}>
                  <Image source={props.ImageUrl[0]} style={styles.Image2}/>
                </Pressable>
                <View style={styles.imageContainer2}>
                  <Pressable onPress={(e) => HandleImage(1)}>  
                    <Image source={props.ImageUrl[1]} style={styles.Image3}/>
                  </Pressable>
                  <Pressable onPress={(e) => HandleImage(2)}> 
                    <Image source={props.ImageUrl[2]} style={styles.Image3}/>
                  </Pressable>
                </View>
              </View>)}
              {props.ImageUrl.length === 4 && (
              <View style={styles.imageContainer}> 
                <View style={styles.imageContainer2}>
                  <Pressable onPress={(e) => HandleImage(0)}>  
                    <Image source={props.ImageUrl[0]} style={styles.Image3}/>
                  </Pressable>
                  <Pressable onPress={(e) => HandleImage(1)}> 
                    <Image source={props.ImageUrl[1]} style={styles.Image3}/>
                  </Pressable>
                </View>
                <View style={styles.imageContainer2}>
                  <Pressable onPress={(e) => HandleImage(2)}>
                    <Image source={props.ImageUrl[2]} style={styles.Image3}/>
                  </Pressable>
                  <Pressable onPress={(e) => HandleImage(2)}>
                    <Image source={props.ImageUrl[3]} style={styles.Image3}/>
                  </Pressable> 
                </View>
              </View>)}
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalStatus}
                onRequestClose={onClose}
                style={styles.modalOverlay}
              >
                <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>X</Text>
                </Pressable>
                <View style={{flex:1, paddingTop: 30, backgroundColor: '#000000'}}>
                <ImageViewer 
                imageUrls={imageUrl}
                enableSwipeDown
                onSwipeDown={onClose}
                index={initialIndex}
                renderImage={(props) => <Image {...props} style={styles.imageModal} contentFit='contain'/>}/>
                </View>
          </Modal>
              {props.musicUrl != '' && (
                <MusicBarOfPost {...props} style={{ marginLeft: 0 }} />
              )}
            </View>
          </View>
        </View>
        <View style={styles.Icons}>
          <HeartIcon size={16} />
          <Link href='/reply-editor-modal' style={{marginTop: 4}}>
          <Message width={16} height={16} color={'#000000'}/>
          </Link>
          <ShareIcon size={16} />
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
    backgroundColor: '#ffffff',
    flex: 1,
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
    marginLeft: 16,
    marginRight: 12,
    borderWidth: 0.3,
    borderColor: '#000000',
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
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: 'auto',
    gap: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    marginRight: 8,
    alignItems: 'baseline',
    gap: 8,
  },
  threeDots: {
    marginRight: 12,
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
    resizeMode: 'contain', // 画像のリサイズモード
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
