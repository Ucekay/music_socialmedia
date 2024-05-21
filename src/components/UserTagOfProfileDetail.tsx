
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Link, useLocalSearchParams } from 'expo-router';


interface Props {
  user: string,
  userAvatarUrl: string,
  userID: string
}

const UserTagOfProfileDetail = (props: Props) :JSX.Element => {
  return (
    <Link href={{
        pathname: '/(tabs)/home/(profile)/[userID]',
        params:{
          userID: props.userID
        }
      }}>
        <View>
          <View style={styles.userContainer}>
            <Image 
            style={styles.userAvator}
            source={props.userAvatarUrl}/>
            <View>
                <Text style={styles.text1}>{props.user}</Text>
                <Text style={styles.text2}>{props.userID}</Text>
            </View>
          </View>
        </View>
      </Link>
  )
}

export default UserTagOfProfileDetail;

const styles = StyleSheet.create({
    userAvator:{
        height:32,
        width:32,
        borderRadius:16,
        marginHorizontal:16
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
    userContainer:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:16,
        width: '100%',
        alignItems: 'center'
    }
}) 