import { View, StyleSheet, useColorScheme, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';

import { preview } from 'react-native-ide';
import Colors from '../constants/Colors';
import Text from '@/src/components/ThemedText';

const TrackSearchField = () => {
  const colorScheme = useColorScheme();
  const searchFieldTextColor = Colors[colorScheme ?? 'light'].appleMusicText;
  const searchFieldBgColor = Colors[colorScheme ?? 'light'].appleMusicBg;
  let trackData: any = [];
  return (
    <View style={styles.searchFieldWrapper}>
      <Text style={styles.label}>レビューする楽曲</Text>
      <View style={styles.searchFieldContainer}>
        <View
          style={[
            styles.searchFieldInner,
            { backgroundColor: searchFieldBgColor },
          ]}
        >
          <TextInput
            placeholder='楽曲を検索'
            placeholderTextColor={searchFieldTextColor}
            style={[styles.searchFieldText, { color: searchFieldTextColor }]}
          />
        </View>
      </View>
    </View>
  );
};

export default TrackSearchField;

const styles = StyleSheet.create({
  searchFieldWrapper: {
    gap: 12,
  },
  label: {
    fontSize: 17,
  },
  searchFieldContainer: {
    width: '100%',

    paddingHorizontal: 12,
  },
  searchFieldInner: {
    padding: 12,
    borderRadius: 12,
    borderCurve: 'continuous',
  },
  searchFieldText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
