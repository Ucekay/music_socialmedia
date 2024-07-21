import {
  FlatList,
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, ShareIos, PlaySolid, Message } from 'iconoir-react-native';

import Colors from '../constants/Colors';
import todaySongData from '@/src/assets/todaySongData';
import TodaySongCard from '@/src/components/TodaySongCard';

const TodaySongModal = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.background
      : Colors.light.secondaryBackground;
  const secondaryBackgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;
  const iconsColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <View
      style={[
        styles.cardWrapper,
        { paddingTop: top, paddingBottom: bottom, backgroundColor },
      ]}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={todaySongData}
          keyExtractor={(item) => item.todaySongID.toString()}
          renderItem={({ item }) => <TodaySongCard todaySong={item} />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View
          style={[styles.button, { backgroundColor: secondaryBackgroundColor }]}
        >
          <Message color={iconsColor} width={20} height={20} />
        </View>
        <View
          style={[
            styles.playButtonContainer,
            {
              backgroundColor: secondaryBackgroundColor,
              position: 'absolute',
              right: width / 2 - 50,
              bottom: 0,
            },
          ]}
        >
          <PlaySolid color={iconsColor} width={20} height={20} />
        </View>
        <View
          style={[styles.button, { backgroundColor: secondaryBackgroundColor }]}
        >
          <ShareIos color={iconsColor} width={20} height={20} />
          <View style={[styles.separator, { borderColor: iconsColor }]} />
          <Heart color={iconsColor} width={20} height={20} />
        </View>
      </View>
    </View>
  );
};

export default TodaySongModal;

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  playButtonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    padding: 10,
    gap: 10,
  },
  separator: {
    height: 16,
    borderWidth: 0.5,
  },
});
