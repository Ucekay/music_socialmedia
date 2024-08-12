import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  Pressable,
  Image as RNImage,
  StyleSheet,
  Dimensions,
  Modal,
  Button,
} from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const AnimatedFlatList = Animated.FlatList;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const SWIPE_VELOCITY_THRESHOLD = 300;

interface ImageDimensions {
  width: number;
  height: number;
}

interface PostImagesProps {
  imageUrls: string[];
}

const PostImages = ({ imageUrls }: PostImagesProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [imageDimensions, setImageDimensions] = useState<
    Record<string, ImageDimensions>
  >({});

  const loadImageDimension = useCallback(
    async (url: string) => {
      if (imageDimensions[url]) return;

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
        setImageDimensions((prev) => ({ ...prev, [url]: dimensions }));
      } catch (error) {
        console.error('Error loading image dimensions:', error);
      }
    },
    [imageDimensions]
  );

  useEffect(() => {
    if (imageUrls.length > 0) {
      loadImageDimension(imageUrls[0]);
    }
  }, [imageUrls, loadImageDimension]);

  if (imageUrls.length === 0) {
    return null;
  }

  return (
    <View>
      {imageUrls.length === 1 ? (
        Object.keys(imageDimensions).length !== 0 && (
          <SingleImage
            imageUrl={imageUrls[0]}
            dimensions={imageDimensions}
            setSelectedIndex={setSelectedImageIndex}
          />
        )
      ) : (
        <MultipleImages
          imageUrls={imageUrls}
          setSelectedIndex={setSelectedImageIndex}
        />
      )}
      <ImageModal
        visible={selectedImageIndex !== -1}
        imageUrls={imageUrls}
        imageDimensions={imageDimensions}
        initialIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(-1)}
      />
    </View>
  );
};

export default PostImages;

const SingleImage = ({
  imageUrl,
  dimensions,
  setSelectedIndex,
}: {
  imageUrl: string;
  dimensions: Record<string, ImageDimensions>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const aspectRatio = dimensions[imageUrl].width / dimensions[imageUrl].height;

  return (
    <Pressable
      onPress={() => setSelectedIndex(0)}
      style={styles.imageContainer}
    >
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
        <View style={[styles.multiImageContainer, styles.row, { gap: 4 }]}>
          <Pressable style={{ flex: 1 }}>
            <Image source={{ uri: imageUrls[0] }} contentFit='cover' />
          </Pressable>
          <Pressable style={{ flex: 1 }}>
            <Image source={{ uri: imageUrls[1] }} contentFit='cover' />
          </Pressable>
        </View>
      );
    case 3:
      return (
        <View style={[styles.multiImageContainer, styles.row, { gap: 4 }]}>
          <Pressable style={{ width: '50%' }}>
            <Image
              source={{ uri: imageUrls[0] }}
              contentFit='cover'
              style={styles.image}
            />
          </Pressable>
          <View style={[styles.column, { gap: 4, width: '50%' }]}>
            <Pressable style={{ flex: 1 }}>
              <Image
                source={{ uri: imageUrls[1] }}
                contentFit='cover'
                style={styles.image}
              />
            </Pressable>
            <Pressable style={{ flex: 1 }}>
              <Image
                source={{ uri: imageUrls[2] }}
                contentFit='cover'
                style={styles.image}
              />
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

const ImageModal = ({
  visible,
  imageUrls,
  imageDimensions,
  initialIndex,
  onClose,
}: {
  visible: boolean;
  imageUrls: string[];
  imageDimensions: Record<string, ImageDimensions>;
  initialIndex: number;
  onClose: () => void;
}) => {
  const flatListRef = useAnimatedRef<Animated.FlatList<string>>();
  const scrollX = useSharedValue(0);
  const scales = imageUrls.map(() => useSharedValue(1));
  const savedScales = imageUrls.map(() => useSharedValue(1));
  const translateX = imageUrls.map(() => useSharedValue(0));
  const translateY = imageUrls.map(() => useSharedValue(0));
  const savedTranslateX = imageUrls.map(() => useSharedValue(0));
  const savedTranslateY = imageUrls.map(() => useSharedValue(0));
  const currentIndex = useSharedValue(initialIndex);

  const resetImagePosition = useCallback(
    (index: number) => {
      scales[index].value = 1;
      savedScales[index].value = 1;
      translateX[index].value = 0;
      translateY[index].value = 0;
      savedTranslateX[index].value = 0;
      savedTranslateY[index].value = 0;
    },
    [
      scales,
      savedScales,
      translateX,
      translateY,
      savedTranslateX,
      savedTranslateY,
    ]
  );

  useLayoutEffect(() => {
    if (visible) {
      currentIndex.value = initialIndex;
      resetImagePosition(initialIndex);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
      }
    }
  }, [visible, initialIndex, resetImagePosition]);

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <ImageItem
        item={item}
        index={index}
        scale={scales[index]}
        savedScale={savedScales[index]}
        translateX={translateX[index]}
        translateY={translateY[index]}
        savedTranslateX={savedTranslateX[index]}
        savedTranslateY={savedTranslateY[index]}
        onClose={onClose}
      />
    ),
    [
      scales,
      savedScales,
      translateX,
      translateY,
      savedTranslateX,
      savedTranslateY,
      resetImagePosition,
      onClose,
    ]
  );

  const backgroundStyle = useAnimatedStyle(() => {
    const index = Math.min(
      Math.max(Math.round(currentIndex.value), 0),
      imageUrls.length - 1
    );
    const currentTranslateY = translateY[index]?.value ?? 0;

    return {
      opacity: interpolate(
        currentTranslateY,
        [-SCREEN_HEIGHT, 0, SCREEN_HEIGHT],
        [0.5, 1, 0.5],
        Extrapolation.CLAMP
      ),
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      currentIndex.value = Math.min(
        Math.max(Math.round(event.contentOffset.x / SCREEN_WIDTH), 0),
        imageUrls.length - 1
      );
    },
  });

  return (
    <Modal visible={visible} transparent animationType='fade'>
      <GestureHandlerRootView style={styles.modalContainer}>
        <Animated.View style={[styles.modalBackground, backgroundStyle]} />
        <AnimatedFlatList
          ref={flatListRef}
          data={imageUrls}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={initialIndex}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          getItemLayout={(data, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
        />
      </GestureHandlerRootView>
    </Modal>
  );
};

const ImageItem = React.memo(
  ({
    item,
    index,
    scale,
    savedScale,
    translateX,
    translateY,
    savedTranslateX,
    savedTranslateY,
    onClose,
  }: {
    item: string;
    index: number;
    scale: SharedValue<number>;
    savedScale: SharedValue<number>;
    translateX: SharedValue<number>;
    translateY: SharedValue<number>;
    savedTranslateX: SharedValue<number>;
    savedTranslateY: SharedValue<number>;
    onClose: () => void;
  }) => {
    const pinch = Gesture.Pinch()
      .onUpdate((e) => {
        scale.value = Math.abs(savedScale.value) * e.scale;
      })
      .onEnd(() => {
        savedScale.value = scale.value;
        if (scale.value < 1) {
          scale.value = withTiming(1);
          savedScale.value = 1;
        }
      });

    const pan = Gesture.Pan()
      .onUpdate((e) => {
        if (scale.value > 1) {
          translateX.value = savedTranslateX.value + e.translationX;
          translateY.value = savedTranslateY.value + e.translationY;
        } else {
          translateY.value = e.translationY;
        }
      })
      .onEnd((e) => {
        if (scale.value > 1) {
          savedTranslateX.value = translateX.value;
          savedTranslateY.value = translateY.value;
          return;
        }

        const isSwipeVelocityExceeded =
          Math.abs(e.velocityY) > SWIPE_VELOCITY_THRESHOLD;
        const isSwipeDistanceExceeded =
          Math.abs(translateY.value) > SCREEN_HEIGHT / 10;

        if (isSwipeVelocityExceeded && isSwipeDistanceExceeded) {
          runOnJS(onClose)();
        } else {
          translateX.value = withTiming(0);
          translateY.value = withTiming(0);
        }
      });

    const doubleTap = Gesture.Tap()
      .numberOfTaps(2)
      .onStart(() => {
        if (scale.value > 1) {
          scale.value = withTiming(1);
          savedScale.value = withTiming(1);
          translateX.value = withTiming(0);
          translateY.value = withTiming(0);
          savedTranslateX.value = withTiming(0);
          savedTranslateY.value = withTiming(0);
        } else {
          scale.value = withTiming(2);
          savedScale.value = 2;
        }
      });

    const composed = Gesture.Simultaneous(pan, pinch, doubleTap);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { scale: scale.value },
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      };
    });

    return (
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.modalImageContainer, animatedStyle]}>
          <Image
            source={{ uri: item }}
            style={styles.modalImage}
            contentFit='contain'
          />
        </Animated.View>
      </GestureDetector>
    );
  }
);

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
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  modalImageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
