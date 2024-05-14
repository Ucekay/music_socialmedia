import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const ArticleCardImage = ({ imageUrl }: { imageUrl: string }) => {
  const defaultImage = require('../assets/images/snsicon.png');
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: imageUrl } || defaultImage}
        contentFit='cover'
        style={styles.image}
      />
    </View>
  );
};
export default ArticleCardImage;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
  },
});
