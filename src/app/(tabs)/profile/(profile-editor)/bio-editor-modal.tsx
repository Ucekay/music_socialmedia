import BgView from "@/src/components/ThemedBgView";
import React, {useContext, useState}from "react";
import {View, Text, TextInput, Pressable, StyleSheet, Dimensions} from 'react-native'
import { ProfileEditorContext } from "@/src/contexts/ProfileEditor";
import { useNavigation, useRouter } from "expo-router";

const NameEditor = (): JSX.Element => {
    
    const context = useContext(ProfileEditorContext);
    
    const router = useRouter()

    if (!context) {
      throw new Error('NameEditorModal must be used within a ProfileEditorProvider');
    }

    const { bio, setBio } = context
    const [ bioEditing, setBioEditing] = useState(bio)
    const [inputHeight, setInputHeight] = useState(60)

  return (
    <BgView style={styles.container}>
        <View style={[styles.header]}>
            <Pressable onPress={() => router.back()} style={[styles.headerItem, {alignItems: 'flex-start'}]}>
              <Text style={styles.text1}>キャンセル</Text>
            </Pressable>
            <View style={[styles.headerItem]}>
              <Text style={styles.text2}>自己紹介を編集</Text>
            </View>
            <Pressable onPress={() => {setBio(bioEditing); router.back()}} style={[styles.headerItem, {alignItems: 'flex-end'}]}>
              <Text style={[styles.text2, {color: '#2f95dc'}]}>完了</Text>
            </Pressable>
        </View>
        <View style={[styles.Editor, {height: Math.max(100, inputHeight+50)}]}>
            <Text style={{fontSize: 14, fontWeight:'600'}}>自己紹介</Text>
            <TextInput 
            value={bioEditing}
            onChangeText={setBioEditing}
            placeholder="自己紹介を入力"
            multiline={true}
            onContentSizeChange={(event) => {
                      setInputHeight(event.nativeEvent.contentSize.height + 10);
                    }}
            scrollEnabled={false}
            />
        </View>
    </BgView>
  )
}

export default NameEditor

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header: {
        height: 60,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: 'row',
    },
    headerItem: {
        flex: 1,
        alignItems: 'center'
    },
    Editor: {
        marginHorizontal: 16, 
        padding:16,
        borderColor: '#000000',
        borderWidth: 0.3,
        borderRadius: 20,
        height: 100,
        gap: 8
    },
    text1:{
        fontSize: 16
    },
    text2:{
        fontSize: 16,
        fontWeight: '600'
    }
})
