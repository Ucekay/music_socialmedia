import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';

import { MeshGradient } from './MeshGradient';
import ArticleCardImage from './ArticleCardImage';
import { usePalette } from '../hooks/usePallete';
import { increaseSaturation } from '../util/color/ColorModifier';

export interface ArticleThumbnailProps {
  imageUrl: string;
  articleType: string;
  height?: number;
  width?: number;
}

export const ArticleThumbnail = ({
  imageUrl,
  articleType,
  height,
  width,
}: ArticleThumbnailProps) => {
  if (articleType === 'review' || articleType === 'playlist') {
    const hexColors = usePalette(imageUrl);

    let gradientColors: string[] = hexColors.map((color) =>
      increaseSaturation(color, 2)
    );
    if (gradientColors.length === 0) {
      return null;
    }
    return (
      <Animated.View entering={FadeIn} style={styles.thumbnailContainer}>
        <View
          style={[
            styles.overlayImageContainer,
            {
              padding: height
                ? height / 25
                : width
                ? ((width / 16) * 9) / 25
                : 0,
            },
          ]}
        >
          <View style={[styles.overlayImageWrapper]}>
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
      </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayImageContainer: {
    position: 'absolute',
    height: '100%',

    zIndex: 1,
  },
  overlayImageWrapper: {
    borderRadius: 8,
    borderCurve: 'continuous',
    overflow: 'hidden',
    aspectRatio: 1,
  },
  overlayImage: {
    height: '100%',
    aspectRatio: 1,
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
