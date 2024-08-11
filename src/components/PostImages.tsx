import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image as RNImage,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';

const AnimateFlatList = Animated.FlatList;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface ImageDimensions {
  width: number;
  height: number;
}

interface PostImagesProps {
  imageUrls: string[];
}

const PostImages = ({ imageUrls }: PostImagesProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);

  useEffect(() => {
    const loadImageDimensions = async () => {
      if (imageUrls.length !== 1) {
        return;
      }
      const url = imageUrls[0];
      try {
        const dimensions = await new Promise<ImageDimensions>(
          (resolve, reject) => {
            RNImage.getSize(
              url,
              (width, height) => {
                if (width > 0 && height > 0) {
                  resolve({ width, height });
                } else {
                  reject(new Error('Invalid image dimensions'));
                }
              },
              (error) => reject(error)
            );
          }
        );
        setImageDimensions(dimensions);
      } catch (error) {
        console.error('Error loading image dimensions:', error);
        setImageDimensions(null);
      }
    };

    loadImageDimensions();
  }, [imageUrls]);

  if (imageUrls.length === 0) {
    return null;
  }

  return (
    <View>
      {imageUrls.length === 1 ? (
        imageDimensions && (
          <SingleImage imageUrl={imageUrls[0]} dimensions={imageDimensions} />
        )
      ) : (
        <MultipleImages
          imageUrls={imageUrls}
          setSelectedIndex={setSelectedImageIndex}
        />
      )}
    </View>
  );
};

export default PostImages;

const SingleImage = ({
  imageUrl,
  dimensions,
}: {
  imageUrl: string;
  dimensions: { width: number; height: number };
}) => {
  const aspectRatio = dimensions.width / dimensions.height;

  return (
    <Pressable style={styles.imageContainer}>
      <Image
        source={{ uri: imageUrl }}
        style={[
          styles.singleImage,
          { aspectRatio: aspectRatio > 0 ? aspectRatio : 1 },
        ]}
      />
    </Pressable>
  );
};

const MultipleImages = ({
  imageUrls,
  setSelectedIndex,
}: {
  imageUrls: string[];
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  switch (imageUrls.length) {
    case 2:
      return (
        <View style={[styles.multiImageContainer, styles.row]}>
          <Pressable>
            <Image source={{ uri: imageUrls[0] }} contentFit='cover' />
          </Pressable>
          <Pressable>
            <Image source={{ uri: imageUrls[1] }} contentFit='cover' />
          </Pressable>
        </View>
      );
    case 3:
      return (
        <View style={[styles.multiImageContainer, styles.row]}>
          <Pressable>
            <Image source={{ uri: imageUrls[0] }} contentFit='cover' />
          </Pressable>
          <View style={styles.column}>
            <Pressable>
              <Image source={{ uri: imageUrls[1] }} contentFit='cover' />
            </Pressable>
            <Pressable>
              <Image source={{ uri: imageUrls[2] }} contentFit='cover' />
            </Pressable>
          </View>
        </View>
      );
    case 4:
      return (
        <View style={[styles.multiImageContainer, { gap: 4 }]}>
          <View style={[styles.row, { gap: 4, height: '50%' }]}>
            <Pressable onPress={() => setSelectedIndex(0)} style={{ flex: 1 }}>
              <Image
                source={{ uri: imageUrls[0] }}
                contentFit='cover'
                style={styles.image}
              />
            </Pressable>
            <Pressable onPress={() => setSelectedIndex(1)} style={{ flex: 1 }}>
              <Image
                source={{ uri: imageUrls[1] }}
                contentFit='cover'
                style={styles.image}
              />
            </Pressable>
          </View>
          <View style={[styles.row, { gap: 4, height: '50%' }]}>
            <Pressable onPress={() => setSelectedIndex(2)} style={{ flex: 1 }}>
              <Image
                source={{ uri: imageUrls[2] }}
                contentFit='cover'
                style={styles.image}
              />
            </Pressable>
            <Pressable onPress={() => setSelectedIndex(3)} style={{ flex: 1 }}>
              <Image
                source={{ uri: imageUrls[3] }}
                contentFit='cover'
                style={styles.image}
              />
            </Pressable>
          </View>
        </View>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 12,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  multiImageContainer: {
    borderRadius: 12,
    borderCurve: 'continuous',
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 7 / 4,
  },
  singleImage: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
