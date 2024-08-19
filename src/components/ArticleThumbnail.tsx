import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { MeshGradient } from './MeshGradient';
import ArticleCardImage from './ArticleCardImage';
import { BlurView } from 'expo-blur';

export interface ArticleThumbnailProps {
  imageUrl: string;
  articleType: string;
  gradientColors: string[];
  height?: number;
  width?: number;
}

export const ArticleThumbnail = ({
  imageUrl,
  articleType,
  gradientColors,
  height,
  width,
}: ArticleThumbnailProps) => {
  if (articleType === 'review' || articleType === 'playlist') {
    return (
      <View style={styles.thumbnailContainer}>
        <View style={styles.overlayImageContainer}>
          <View style={styles.overlayImageWrapper}>
            <Image source={imageUrl} style={styles.overlayImage} />
          </View>
        </View>
        <View style={styles.gradientContainer}>
          <MeshGradient
            rows={2}
            cols={3}
            width={height ? (height / 9) * 16 : width ?? 0}
            height={height ? height : width ? (width / 16) * 9 : 0}
            colors={gradientColors}
          />
          <BlurView tint='regular' style={StyleSheet.absoluteFill} />
        </View>
      </View>
    );
  } else if (articleType === 'live report' || articleType === 'general') {
    return (
      <View style={styles.thumbnailContainer}>
        <ArticleCardImage
          imageUrl={imageUrl}
          height={height ? height : width ? (width / 16) * 9 : 0}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  thumbnailContainer: {
    aspectRatio: 16 / 9,
  },
  overlayImageContainer: {
    position: 'absolute',
    height: '100%',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  overlayImageWrapper: {
    borderRadius: 8,
    borderCurve: 'continuous',
    overflow: 'hidden',
    width: 92,
    aspectRatio: 1,
  },
  overlayImage: {
    width: '100%',
    height: '100%',
  },
  gradientContainer: {
    borderRadius: 8,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  fullWidthImageContainer: {
    flex: 1,
    width: '100%',
  },
});
