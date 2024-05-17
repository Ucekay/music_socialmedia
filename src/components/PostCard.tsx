import React from 'react';
import { View, StyleSheet, Text, Pressable, Dimensions, Image as Img} from 'react-native';
import { Image } from 'expo-image';
import MusicBarOfPost from './MusicBarOfPost';
import IconA from './Icon/AntDesign';
import { type PostDataType } from '../types';
import { Link } from 'expo-router';
import HeartIcon from './Icon/HeartIcon';

const screen = Dimensions.get("screen")

const PostCard = (props: PostDataType): JSX.Element => {
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
                <Image 
                  source={props.userAvatarUrl}
                  style={styles.image}
                />
                <View style={{flex:1}}>
                  <View style={[{justifyContent: 'space-between'}, {flexDirection: 'row'}, {flex:1}]}>
                    <View style={styles.headerLeft}>
                      <Text style={styles.text1}>{props.user}</Text>
                    </View>
                    <View style={styles.headerLeft}>
                      <Text>6m</Text>
                      <IconA name='ellipsis1' size={16} style={styles.threeDots}/>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.postContent}>{props.postContent}</Text>
                    {(props.ImageUrl != '') && (<Image source={props.ImageUrl} style={styles.postimage}/>)}
                    {(props.musicUrl != '') && (<MusicBarOfPost {...props} style={{marginLeft:0}}/>)}
                  </View>
                </View>
              </View>
                <View style={styles.Icons}>
                    <HeartIcon size={16}/>
                    <IconA name="message1" size={16}/>
                    <IconA name="retweet" size={16}/>
                    <IconA name="upload" size={16}/>
                </View>
                <View style={[{backgroundColor:'rgba(67, 80, 96, 0.3)'}, {marginHorizontal:16},{height:0.2}]} />
            </Pressable>
        </Link>
    )
} 


export default PostCard;

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
      },
      postHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 8,
        flex:1
      },
      text1: {
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 16
      },
      image: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 16,
        marginRight: 12,
        borderWidth: 0.3,
        borderColor: '#000000'
      },
      postContent: {
        fontSize: 14,
        lineHeight:20,
        marginRight: 12,
        marginBottom: 10,
        marginTop: 4
      },
      Icons:{
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 56,
        gap: 24,
        marginBottom: 12,
      },
      headerRight:{
        alignItems: 'flex-start',
        justifyContent:'flex-end',
        flexDirection: 'row',
        width: 'auto',
        gap:12
      },
      headerLeft:{
        flexDirection: 'row',
        marginRight:8,
        alignItems: 'baseline',
        gap: 8
      },
      threeDots:{
        marginRight:12
      },
      postimage: {
        marginRight:12,
        width: screen.width-74,
        height: 150,
        borderRadius:10,
        maxHeight: screen.width-74,
        marginBottom:16
      }
})