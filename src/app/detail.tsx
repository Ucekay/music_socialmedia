import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity
  } from "react-native";
import ArticleScroll from "../components/AriticleScroll";
import InfoTag from "../components/InfoTag";
import React, { useRef, useState } from 'react';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';

const Detail = (): JSX.Element => {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const [height, setHeight] = useState(460);
  const [containerHeight, setContainerHeight] = useState(460);
  return (
    <View style={styles.bottomSheetContainer}>
      <TouchableOpacity onPress={() => {sheetRef.current?.open(); setHeight(460); setContainerHeight(460)}} >
        <Image source={require("../assets/images/ikuokukonen.jpg")} style={styles.image} />
      </TouchableOpacity>
      <BottomSheet 
      ref={sheetRef} 
      containerHeight={containerHeight}
      height={height}
      disableDragHandlePanning={true} 
      disableBodyPanning={true} 
      style={{backgroundColor:'#ffffff', shadowOffset:{width:4, height:-8}, shadowOpacity:50}}
      backdropMaskColor={'#ffffff'}
      hideDragHandle={true}
      >
        <ScrollView onScroll={() => {if (height != 680) {setContainerHeight(680); setHeight(680)}} }> 
          <View style={[styles.headingContainer, { paddingTop: 50 }]}>
            <Text style={styles.title}>
              時空を超える旋律：
              Omoinotake「幾億光年」の心の叫び
            </Text>
            <View style={styles.infoTag}>
              <InfoTag />
            </View>
          </View>
          <View style={styles.article}>
            <Text style={styles.paragraph}>
              Omoinotakeの「幾億光年」は、切なさと希望が交錯する楽曲です。TBS系火曜ドラマ『Eye Love You』の主題歌としても知られています。この曲は、福島智朗による繊細な歌詞と藤井怜央のメロディックな作曲が特徴で、Omoinotakeと小西遼による編曲が加わり、感情を揺さぶるサウンドスケープを作り上げています。
              歌詞は、時間と距離を超えた愛の強さを表現しており、過去の思い出と現在の願いが重なり合う構造になっています。特に、「もう一度さ声を聴かせてよ」というフレーズは、失われた恋人への切望を力強く表現しており、聴く者の心に深く響きます。
              音楽的には、穏やかなイントロから徐々に盛り上がりを見せる構成が印象的で、エモーショナルなボーカルパフォーマンスが曲の雰囲気を一層高めています。全体として、Omoinotakeは「幾億光年」を通じて、失った愛を求める心の叫びを、美しくも力強いメロディに乗せて伝えています。
              この曲は、ただのポップソングとしてではなく、ドラマの主題歌としてもその役割を果たし、物語の感情を豊かにする一助となっていることは間違いありません。
            </Text>
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
    
  )
}

export default Detail

const styles = StyleSheet.create({
  image:{
    width: 375,
    height: 375,
  },
  bottomSheetContainer: {
    flex: 1,
  },
  bottomSheet: {
    color: '#ffffff'
  },
  contentContainer: {
    flexGrow: 1,
    overflow: "hidden",
  },
  headingContainer: {
    width: 343,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20
  },
  infoTag: {
    marginLeft: 32
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    marginHorizontal: 16,
    marginBottom: 20
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  article: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
})
