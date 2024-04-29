import React from 'react';
import { View, StyleSheet, Text, Pressable} from 'react-native';
import { Image } from 'expo-image';
import MusicBarOfPost from './MusicBarOfPost';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { type PostDataType } from '../types';

const PostCard = (props: PostDataType): JSX.Element => {
  if (props.musicUrl != '' && props.ImageUrl == '') {
    return(
        <Pressable style={styles.postContainer}>
            <View style={styles.postHeader}>
            <Pressable style={styles.headerLeft}>
                <Image 
                source={props.userAvatarUrl}
                style={styles.image}
                />
                <Text style={styles.text1}>{props.user}</Text>
            </Pressable>
            <View style={styles.headerRight}>
                <Text>6m</Text>
                <Icon name='ellipsis-h' size={16} style={styles.threeDots}/>
            </View>  
            </View>
            <Text style={styles.postContent}>{props.postContent}</Text>
            <MusicBarOfPost {...props}/>
            <View style={styles.Icons}>
                <Icon name="heart-o" size={20}/>
                <Icon name="comment-o" size={20}/>
                <Icon name="retweet" size={20}/>
                <Icon name="send-o" size={20}/>
            </View>
        </Pressable>
    )
} else if (props.musicUrl != '' && props.ImageUrl != '' ) {
    return(
        <Pressable style={styles.postContainer}>
            <View style={styles.postHeader}>
            <Pressable style={styles.headerLeft}>
                <Image 
                source={props.userAvatarUrl}
                style={styles.image}
                />
                <Text style={styles.text1}>{props.user}</Text>
            </Pressable>
            <View style={styles.headerRight}>
                <Text>6m</Text>
                <Icon name='ellipsis-h' size={16} style={styles.threeDots}/>
            </View>  
            </View>
            <Text style={styles.postContent}>{props.postContent}</Text>
            <Image source={props.ImageUrl} style={styles.postimage}/>
            <MusicBarOfPost {...props}/>
            <View style={styles.Icons}>
                <Icon name="heart-o" size={20}/>
                <Icon name="comment-o" size={20}/>
                <Icon name="retweet" size={20}/>
                <Icon name="send-o" size={20}/>
            </View>
        </Pressable>
    )
} else if (props.musicUrl == '' && props.ImageUrl != '' ) {
    return(
        <Pressable style={styles.postContainer}>
        <View style={styles.postHeader}>
        <Pressable style={styles.headerLeft}>
            <Image 
            source={props.userAvatarUrl}
            style={styles.image}
            />
            <Text style={styles.text1}>{props.user}</Text>
        </Pressable>
        <View style={styles.headerRight}>
            <Text>6m</Text>
            <Icon name='ellipsis-h' size={16} style={styles.threeDots}/>
        </View>  
        </View>
        <Text style={styles.postContent}>{props.postContent}</Text>
        <Image source={props.ImageUrl} style={styles.postimage}/>
        <View style={styles.Icons}>
            <Icon name="heart-o" size={20}/>
            <Icon name="comment-o" size={20}/>
            <Icon name="retweet" size={20}/>
            <Icon name="send-o" size={20}/>
        </View>
    </Pressable>
    )
} else {
    return(
        <Pressable style={styles.postContainer}>
        <View style={styles.postHeader}>
        <Pressable style={styles.headerLeft}>
            <Image 
            source={props.userAvatarUrl}
            style={styles.image}
            />
            <Text style={styles.text1}>{props.user}</Text>
        </Pressable>
        <View style={styles.headerRight}>
            <Text>6m</Text>
            <Icon name='ellipsis-h' size={16} style={styles.threeDots}/>
        </View>  
        </View>
        <Text style={styles.postContent}>{props.postContent}</Text>
        <View style={styles.Icons}>
            <Icon name="heart-o" size={20}/>
            <Icon name="comment-o" size={20}/>
            <Icon name="retweet" size={20}/>
            <Icon name="send-o" size={20}/>
        </View>
    </Pressable>
    )
}
}

export default PostCard;

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: "#ffffff",
        flex: 1
      },
      postHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
      },
      text1: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 16
      },
      image: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginLeft: 14,
        marginRight: 12
      },
      postContent: {
        fontSize: 16,
        marginLeft: 62,
        marginRight: 12,
        marginBottom: 12
      },
      Icons:{
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 62,
        gap: 16,
        marginBottom: 12,
      },
      headerRight:{
        alignItems: 'center',
        justifyContent:'flex-end',
        flexDirection: 'row',
        width: '50%',
        gap:12
      },
      headerLeft:{
        alignItems: 'center',
        flexDirection: 'row',
        width: '50%'
      },
      threeDots:{
        marginRight:12
      },
      postimage: {
        height: 'auto',
        width: 'auto'
      }
})