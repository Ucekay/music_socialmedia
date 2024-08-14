import { View } from '@/src/components/Themed';
import { TopTabs } from '@/src/layouts/material-top-tabs';
import { useHeaderHeight } from '@react-navigation/elements';

const FeedScreen = () => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={{ flex: 1, paddingTop: headerHeight }}>
      <TopTabs>
        <TopTabs.Screen name='posts' />
        <TopTabs.Screen name='articles' />
      </TopTabs>
    </View>
  );
};

export default FeedScreen;
