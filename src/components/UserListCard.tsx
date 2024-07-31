import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BgView from "./ThemedBgView";
import { Image } from "expo-image";
import { UserListType } from "../types";

const UserListCard = (props: UserListType): JSX.Element => {
    return(
        <BgView style={styles.container}>
            <Image source={props.userAvatarUrl} style={styles.userAvatar}/>
            <View>
                <Text style={styles.userId}>{props.userID}</Text>
                <Text style={styles.userName}>{props.userName}</Text>
            </View>
        </BgView>
    )
}

export default UserListCard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
    },
    userAvatar:{
        marginRight: 16,
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    userId:{
        fontSize:16,
        fontWeight: '500'
    },
    userName:{
        fontSize:14,
        color:'#696969'
    }
})