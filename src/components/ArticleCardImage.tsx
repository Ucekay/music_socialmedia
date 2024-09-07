import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
const AnimatedImage = Animated.createAnimatedComponent(Image);

const ArticleCardImage = ({
  imageUrl,
  height,
}: {
  imageUrl: string;
  height: number;
}) => {
  const defaultImage = require('../assets/images/snsicon.png');
  return (
    <View
      style={[
        styles.imageContainer,
        {
          height,
        },
      ]}
    >
      <AnimatedImage
        source={{ uri: imageUrl } || defaultImage}
        contentFit='cover'
        entering={FadeIn}
        style={styles.image}
      />
    </View>
  );
};
export default ArticleCardImage;

const styles = StyleSheet.create({
  imageContainer: {
    aspectRatio: 16 / 9,
    borderRadius: 8,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
  },
});
