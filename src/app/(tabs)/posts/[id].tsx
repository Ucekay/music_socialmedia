import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import postData from '@/src/assets/postData';
import IconA from '@/src/components/Icon/AntDesign';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

const PostDatailScreen = (): JSX.Element => {
  const { id }= useLocalSearchParams();
  const post = postData.find((item) => item.postID === id);
  if (!post) {
    return <Text>Post not found.</Text>;
  }
  return(
    <View style={styles.container}>
      <Link href={{
        pathname: '../../pages/profile',
        params:{
          userID: post.userID
        }
      }}>
        <View>
          <View style={styles.userContainer}>
            <Image 
            style={styles.userAvator}
            source={post?.userAvatarUrl}/>
              <View>
                <Text style={styles.text1}>{post.user}</Text>
                <Text style={styles.text2}>{post.userID}</Text>
              </View>
          </View>
        </View>
      </Link>
      <Text style={[styles.text1, {marginHorizontal:16}, {marginBottom:16}]}>{post.postContent}</Text>
      <View style={styles.infoContainer}>  
        <Text style={styles.text3}>9:38・2024/03/24</Text>
      </View>
      <View style={styles.infoContainer}>  
        <Text style={styles.text3}>53件のいいね</Text>
      </View>
      <View style={styles.iconContainer}>
        <IconA name='hearto' size={20} style={{marginLeft:16}}/>
        <IconA name='message1' size={20} />
        <IconA name='retweet' size={20} />
        <IconA name='upload' size={20} style={{marginRight:16}}/>
      </View>
    </View>
  )
}

export default PostDatailScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#ffffff'
  },
  userContainer:{
    flexDirection:'row',
    marginTop:10,
    marginBottom:16,
    width: '100%'
  },
  text1:{
    fontSize:16,
    lineHeight:19
  },
  text2:{
    fontSize:12,
    lineHeight:12,
    color:'rgba(67, 80, 96, 1)'
  },
  text3:{
    fontSize:14,
    lineHeight:18,
    color:'rgba(67, 80, 96, 1)'
  },
  userAvator:{
    height:32,
    width:32,
    borderRadius:16,
    marginHorizontal:16
  },
  infoContainer:{
    marginHorizontal:16,
    height: 34,
    justifyContent: 'center',
    borderBottomColor: 'rgba(67, 80, 96, 0.3)',
    borderBottomWidth: 0.5,
  },
  iconContainer:{
    marginHorizontal:16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:24,
    marginVertical:16
  }
})