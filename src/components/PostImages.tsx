import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  View,
  Pressable,
  Image as RNImage,
  StyleSheet,
  Dimensions,
  Modal,
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
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const AnimatedFlatList = Animated.FlatList;

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
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
          <SingleImage
            imageUrl={imageUrls[0]}
            dimensions={imageDimensions}
            setSelectedIndex={setSelectedImageIndex}
            setModalVisible={setModalVisible}
          />
        )
      ) : (
        <MultipleImages
          imageUrls={imageUrls}
          setSelectedIndex={setSelectedImageIndex}
          setModalVisible={setModalVisible}
        />
      )}
      <ImageModal
        visible={modalVisible}
        imageUrls={imageUrls}
        initialIndex={selectedImageIndex}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default PostImages;

const SingleImage = ({
  imageUrl,
  dimensions,
  setSelectedIndex,
  setModalVisible,
}: {
  imageUrl: string;
  dimensions: ImageDimensions;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const aspectRatio = dimensions.width / dimensions.height;

  return (
    <Pressable
      onPress={() => {
        setSelectedIndex(0);
        setModalVisible(true);
      }}
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
  setModalVisible,
}: {
  imageUrls: string[];
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  switch (imageUrls.length) {
    case 2:
      return (
        <View style={[styles.multiImageContainer, styles.row, { gap: 4 }]}>
          <Pressable
            onPress={() => {
              setSelectedIndex(0);
              setModalVisible(true);
            }}
            style={{ flex: 1 }}
          >
            <Image source={{ uri: imageUrls[0] }} contentFit='cover' />
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedIndex(1);
              setModalVisible(true);
            }}
            style={{ flex: 1 }}
          >
            <Image source={{ uri: imageUrls[1] }} contentFit='cover' />
          </Pressable>
        </View>
      );
    case 3:
      return (
        <View style={[styles.multiImageContainer, styles.row, { gap: 4 }]}>
          <Pressable
            onPress={() => {
              setSelectedIndex(0);
              setModalVisible(true);
            }}
            style={{ width: '50%' }}
          >
            <Image
              source={{ uri: imageUrls[0] }}
              contentFit='cover'
              style={styles.image}
            />
          </Pressable>
          <View style={[styles.column, { gap: 4, width: '50%' }]}>
            <Pressable
              onPress={() => {
                setSelectedIndex(1);
                setModalVisible(true);
              }}
              style={{ flex: 1 }}
            >
              <Image
                source={{ uri: imageUrls[1] }}
                contentFit='cover'
                style={styles.image}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedIndex(2);
                setModalVisible(true);
              }}
              style={{ flex: 1 }}
            >
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
            <Pressable
              onPress={() => {
                setSelectedIndex(0);
                setModalVisible(true);
              }}
              style={{ flex: 1 }}
            >
              <Image
                source={{ uri: imageUrls[0] }}
                contentFit='cover'
                style={styles.image}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedIndex(1);
                setModalVisible(true);
              }}
              style={{ flex: 1 }}
            >
              <Image
                source={{ uri: imageUrls[1] }}
                contentFit='cover'
                style={styles.image}
              />
            </Pressable>
          </View>
          <View style={[styles.row, { gap: 4, height: '50%' }]}>
            <Pressable
              onPress={() => {
                setSelectedIndex(2), setModalVisible(true);
              }}
              style={{ flex: 1 }}
            >
              <Image
                source={{ uri: imageUrls[2] }}
                contentFit='cover'
                style={styles.image}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedIndex(3);
                setModalVisible(true);
              }}
              style={{ flex: 1 }}
            >
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
  initialIndex,
  onClose,
}: {
  visible: boolean;
  imageUrls: string[];
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

  const resetImagePosition = useCallback((index: number) => {
    scales[index].value = 1;
    savedScales[index].value = 1;
    translateX[index].value = 0;
    translateY[index].value = 0;
    savedTranslateX[index].value = 0;
    savedTranslateY[index].value = 0;
  }, []);

  const resetAllImagePositions = useCallback(() => {
    imageUrls.forEach((_, index) => {
      resetImagePosition(index);
    });
  }, [imageUrls, resetImagePosition]);

  useLayoutEffect(() => {
    if (visible) {
      currentIndex.value = initialIndex;
      resetAllImagePositions();
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
      }
    }
  }, [visible, initialIndex, resetAllImagePositions]);

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
    useEffect(() => {
      if (index === 0) {
        return () => {
          scale.value = 1;
          savedScale.value = 1;
          translateX.value = 0;
          translateY.value = 0;
          savedTranslateX.value = 0;
          savedTranslateY.value = 0;
        };
      }
    }, []);
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
      .activeOffsetY([-10, 10])
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
