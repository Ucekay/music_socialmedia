import React from 'react';
import { View, StyleSheet, Text, Pressable, Dimensions, Image as Img} from 'react-native';
import { Image } from 'expo-image';
import MusicBarOfPost from './MusicBarOfPost';
import IconA from './Icon/AntDesign';
import { type PostDataType } from '../types';
import { Link } from 'expo-router';

const screen = Dimensions.get("screen")

const PostCard = (props: PostDataType): JSX.Element => {
  if (props.musicUrl != '' && props.ImageUrl == '') {
    return(
        <Link 
          href={{
            pathname:"/(tabs)/(post)/[id]",
            params:{
                id: props.postID
            }
          }}
        asChild>    
            <Pressable style={styles.postContainer}>
            
                <View style={styles.postHeader}>
                <View style={styles.headerLeft}>
                    <Image 
                    source={props.userAvatarUrl}
                    style={styles.image}
                    />
                    <Text style={styles.text1}>{props.user}</Text>
                </View>
                <View style={styles.headerRight}>
                    <Text>6m</Text>
                    <IconA name='ellipsis1' size={16} style={styles.threeDots}/>
                </View>  
                </View>
                <Text style={styles.postContent}>{props.postContent}</Text>
                <MusicBarOfPost {...props}/>
                <View style={{height:8}}/>
                <View style={styles.Icons}>
                    <IconA name="hearto" size={20}/>
                    <IconA name="message1" size={20}/>
                    <IconA name="retweet" size={20}/>
                    <IconA name="upload" size={20}/>
                </View>
            </Pressable>    
        </Link>
    )
} else if (props.musicUrl != '' && props.ImageUrl != '' ) {
    return(
        <Link 
          href={{
            pathname:'/(tabs)/(post)/[id]',
            params:{
                id: props.postID
            }
          }} asChild> 
            <Pressable style={styles.postContainer}>
            
                <View style={styles.postHeader}>
                <View style={styles.headerLeft}>
                    <Image 
                    source={props.userAvatarUrl}
                    style={styles.image}
                    />
                    <Text style={styles.text1}>{props.user}</Text>
                </View>
                <View style={styles.headerRight}>
                    <Text>6m</Text>
                    <IconA name='ellipsis1' size={16} style={styles.threeDots}/>
                </View>  
                </View>
                <Text style={styles.postContent}>{props.postContent}</Text>
                <Image source={props.ImageUrl} style={styles.postimage}/>
                <MusicBarOfPost {...props}/>
                <View style={{height:8}}/>
                <View style={styles.Icons}>
                    <IconA name="hearto" size={20}/>
                    <IconA name="message1" size={20}/>
                    <IconA name="retweet" size={20}/>
                    <IconA name="upload" size={20}/>
                </View>
            </Pressable>
        </Link>
    )
} else if (props.musicUrl == '' && props.ImageUrl != '' ) {
    return(
        <Link 
          href={{
            pathname:'/(tabs)/(post)/[id]',
            params:{
                id: props.postID
            }
          }}asChild
        >
            <Pressable style={styles.postContainer}>
                <View style={styles.postHeader}>
                <View style={styles.headerLeft}>
                    <Image 
                    source={props.userAvatarUrl}
                    style={styles.image}
                    />
                    <Text style={styles.text1}>{props.user}</Text>
                </View>
                <View style={styles.headerRight}>
                    <Text>6m</Text>
                    <IconA name='ellipsis1' size={16} style={styles.threeDots}/>
                </View>  
                </View>
                <Text style={styles.postContent}>{props.postContent}</Text>
                <Image source={props.ImageUrl} style={styles.postimage}/>
                <View style={styles.Icons}>
                    <IconA name="hearto" size={20}/>
                    <IconA name="message1" size={20}/>
                    <IconA name="retweet" size={20}/>
                    <IconA name="upload" size={20}/>
                </View>
            </Pressable>    
        </Link>
    )
} else {
    return(
        <Link 
        href={{
          pathname:'/(tabs)/(post)/[id]',
          params:{
              id: props.postID
          }
        }} asChild
        >
            <Pressable style={styles.postContainer}>    
                <View style={styles.postHeader}>
                <View style={styles.headerLeft}>
                    <Image 
                    source={props.userAvatarUrl}
                    style={styles.image}
                    />
                    <Text style={styles.text1}>{props.user}</Text>
                </View>
                <View style={styles.headerRight}>
                    <Text>6m</Text>
                    <IconA name='ellipsis1' size={16} style={styles.threeDots}/>
                </View>  
                </View>
                <Text style={styles.postContent}>{props.postContent}</Text>
                <View style={styles.Icons}>
                    <IconA name="hearto" size={20}/>
                    <IconA name="message1" size={20}/>
                    <IconA name="retweet" size={20}/>
                    <IconA name="upload" size={20}/>
                </View>
            </Pressable>
        </Link>   
    )
}
}

export default PostCard;

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
        borderBottomColor: 'rgba(67, 80, 96, 0.3)',
        borderBottomWidth: 0.5
      },
      postHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
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
        marginBottom: 16
      },
      Icons:{
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 62,
        gap: 16,
        marginBottom: 16,
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
        marginLeft: 62,
        marginRight:12,
        width: screen.width-74,
        height: 150,
        borderRadius:10,
        maxHeight: screen.width-74,
        marginBottom:16
      }
})