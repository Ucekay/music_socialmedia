import todaySongData from '@/src/assets/todaySongData';
import TodaySongCard from '@/src/components/TodaySongCard';
import { FlashList } from '@shopify/flash-list';
import { Message, PlaySolid, ShareIos } from 'iconoir-react-native';
import { View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HeartIcon from '../components/Icons/HeartIcon';
import BgView from '../components/ThemedBgView';
import SecondaryBgView from '../components/ThemedSecondaryBgView';
import { useTheme } from '../contexts/ColorThemeContext';

const TodaySongModal = () => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const backgroundColor = colors.background;
  const iconColor = colors.text;
  return (
    <BgView
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View style={{ flex: 1 }}>
        <FlashList
          horizontal
          pagingEnabled
          data={todaySongData}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 16, paddingBottom: 24, width }}>
              <TodaySongCard
                todaySong={item}
                isEditing={false}
                isSongInfoVisible
              />
            </View>
          )}
          estimatedItemSize={width}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <SecondaryBgView style={{ padding: 12, borderRadius: 20 }}>
            <Message color={iconColor} width={20} height={20} />
          </SecondaryBgView>
          <View
            style={{ width: 1, borderColor: backgroundColor, borderWidth: 0.5 }}
          />
          <View style={{ padding: 12 }}>
            <Message color={backgroundColor} width={20} height={20} />
          </View>
        </View>
        <SecondaryBgView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 40,
            paddingVertical: 12,
            borderRadius: 20,
          }}
        >
          <PlaySolid color={iconColor} width={20} height={20} />
        </SecondaryBgView>
        <SecondaryBgView
          style={{
            flexDirection: 'row',
            padding: 12,
            gap: 12,
            borderRadius: 40,
          }}
        >
          <View>
            <ShareIos color={iconColor} width={20} height={20} />
          </View>
          <View
            style={{ width: 1, borderColor: iconColor, borderWidth: 0.5 }}
          />
          <View>
            <HeartIcon initialColor={iconColor} width={20} height={20} />
          </View>
        </SecondaryBgView>
      </View>
    </BgView>
  );
};

export default TodaySongModal;
