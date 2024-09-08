import { StyleSheet, View } from 'react-native';

import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import Animated, { FadeIn } from 'react-native-reanimated';

import { usePalette } from '../hooks/usePallete';
import { increaseSaturation } from '../utils/color/ColorModifier';

import ArticleCardImage from './ArticleCardImage';
import { MeshGradient } from './MeshGradient';

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
  const hexColors = usePalette(imageUrl);

  if (hexColors && (articleType === 'review' || articleType === 'playlist')) {
    const gradientColors: string[] = hexColors.map((color) =>
      increaseSaturation(color, 2),
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
  }
  if (articleType === 'liveReport' || articleType === 'general') {
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
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 16 / 9,
  },
  overlayImageContainer: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
  },
  overlayImageWrapper: {
    overflow: 'hidden',
    borderCurve: 'continuous',
    borderRadius: 8,
    aspectRatio: 1,
  },
  overlayImage: {
    height: '100%',
    aspectRatio: 1,
  },
  gradientContainer: {
    overflow: 'hidden',
    borderCurve: 'continuous',
    borderRadius: 8,
  },
  fullWidthImageContainer: {
    flex: 1,
    width: '100%',
  },
});
