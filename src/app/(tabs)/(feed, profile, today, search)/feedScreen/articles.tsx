import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import BgView from '@/src/components/ThemedBgView';
import articleData from '@/src/assets/articleData';
import ArticleCard from '@/src/components/ArticleCard';
import { articleDataType } from '@/src/types';

const ITEM_SIZE = 308;

const articlesScreen = () => {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <BgView style={styles.container}>
      <FlashList
        data={articleData}
        renderItem={({ item }) => (
          <ArticleCard article={item as articleDataType} />
        )}
        estimatedItemSize={ITEM_SIZE}
        contentContainerStyle={{
          paddingBottom: tabBarHeight,
          paddingHorizontal: 20,
        }}
      />
    </BgView>
  );
};

export default articlesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    zIndex: 100,
    backgroundColor: 'red',
  },
});
