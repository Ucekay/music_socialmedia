import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { BlurView } from '@candlefinance/blur-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';

import articleData from '@/src/assets/articleData';
import { articleDataType } from '@/src/types';

const ArticleDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const firstGradientStop = top / headerHeight;
  const article = articleData.find((item) => item.articleID === id);
  const defaultImage = require('@/src/assets/images/snsicon.png');
  if (!article) {
    return <Text>Article not found.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: '',
          headerBackVisible: false,
          headerTransparent: true,
          header: () => (
            <BlurView
              blurTintColor='#ffffff00'
              colorTintOpacity={0}
              blurRadius={5}
              style={{
                height: top,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.25,
                shadowRadius: 8,

                elevation: 10,
              }}
            />
          ),
          headerBackground: () => (
            <LinearGradient
              colors={['rgba(256,256,256,1)', 'transparent']}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
      <ScrollView>
        <Image
          src={article.artworkUrl || defaultImage}
          style={styles.artwork}
        />
        <Text>Article Detail Screen : {id}</Text>
      </ScrollView>
    </View>
  );
};

export default ArticleDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artwork: {
    width: '100%',
    aspectRatio: 1,
  },
});
