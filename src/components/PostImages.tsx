import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Message, Xmark } from 'iconoir-react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  Dimensions,
  type GestureResponderEvent,
  Modal,
  Pressable,
  Image as RNImage,
  StyleSheet,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  type SharedValue,
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import HeartIcon from './Icons/HeartIcon';
import ShareIcon from './Icons/ShareIcon';

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
  postID: number;
}

const PostImages = ({ imageUrls, postID }: PostImagesProps) => {
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
              (error) => reject(error),
            );
          },
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
        postID={postID}
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
      style={[styles.imageContainer, { marginBottom: 16 }]}
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
        <View
          style={[
            styles.multiImageContainer,
            styles.row,
            { gap: 4, marginBottom: 16 },
          ]}
        >
          <Pressable
            onPress={() => {
              setSelectedIndex(0);
              setModalVisible(true);
            }}
            style={{ flex: 1 }}
          >
            <Image
              style={styles.image}
              source={{ uri: imageUrls[0] }}
              contentFit='cover'
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
              style={styles.image}
              source={{ uri: imageUrls[1] }}
              contentFit='cover'
            />
          </Pressable>
        </View>
      );
    case 3:
      return (
        <View
          style={[
            styles.multiImageContainer,
            styles.row,
            { gap: 4, marginBottom: 16 },
          ]}
        >
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
        <View
          style={[styles.multiImageContainer, { gap: 4, marginBottom: 16 }]}
        >
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
  postID,
  initialIndex,
  onClose,
}: {
  visible: boolean;
  imageUrls: string[];
  postID: number;
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
        onSingleTap={() => setOptionVisible(!OptionVisible)}
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
    ],
  );

  const backgroundStyle = useAnimatedStyle(() => {
    const index = Math.min(
      Math.max(Math.round(currentIndex.value), 0),
      imageUrls.length - 1,
    );
    const currentTranslateY = translateY[index]?.value ?? 0;

    return {
      opacity: interpolate(
        currentTranslateY,
        [-SCREEN_HEIGHT, 0, SCREEN_HEIGHT],
        [0.5, 1, 0.5],
        Extrapolation.CLAMP,
      ),
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      currentIndex.value = Math.min(
        Math.max(Math.round(event.contentOffset.x / SCREEN_WIDTH), 0),
        imageUrls.length - 1,
      );
    },
  });

  const [OptionVisible, setOptionVisible] = useState(false);
  const [renderStatus, setRenderStatus] = useState(false);

  const opacity = useSharedValue(0);

  useEffect(() => {
    if (OptionVisible) {
      setRenderStatus(true); // Render the component when modal becomes visible
      opacity.value = withSpring(1, { duration: 300 });
    } else {
      opacity.value = withSpring(0, { duration: 300 }, () => {
        runOnJS(() => {
          setRenderStatus(false); // Remove the component after animation
        });
      });
    }
  }, [OptionVisible]);

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
        {renderStatus && (
          <Animated.View style={{ opacity: opacity }}>
            <OptionModal postID={postID} />
          </Animated.View>
        )}
        {renderStatus && (
          <Animated.View style={{ opacity: opacity }}>
            <OptionModalUpper onClose={onClose} />
          </Animated.View>
        )}
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
    onSingleTap,
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
    onSingleTap: () => void;
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

    const singleTap = Gesture.Tap()
      .numberOfTaps(1)
      .maxDuration(300)
      .onStart(() => {
        runOnJS(onSingleTap)();
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

    const tapGesture = Gesture.Exclusive(doubleTap, singleTap);

    const composed = Gesture.Simultaneous(pan, pinch, tapGesture);

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
  },
);

const OptionModalUpper = (props: {
  onClose: ((event: GestureResponderEvent) => void) | null | undefined;
}): JSX.Element => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: SCREEN_HEIGHT - 100,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          paddingHorizontal: 30,
          paddingVertical: 50,
          elevation: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 100,
          width: SCREEN_WIDTH,
        },
      ]}
    >
      <Pressable onPress={props.onClose}>
        <Xmark height={25} width={25} color={'#ffffff'} />
      </Pressable>
    </View>
  );
};

const OptionModal = ({ postID }: { postID: number }): JSX.Element => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: 20,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      ]}
    >
      <View
        style={{
          marginHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 24,
          marginVertical: 16,
        }}
      >
        <HeartIcon width={20} height={20} initialcolor='#ffffff' />
        <Link
          href={{
            pathname: '/reply-editor-modal',
            params: {
              postID: postID,
            },
          }}
          asChild
        >
          <Message width={20} height={20} color={'#ffffff'} />
        </Link>
        <ShareIcon width={20} height={20} color={'#ffffff'} />
      </View>
    </View>
  );
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
