import { useState } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { preview } from 'react-native-ide';
import Colors from '../constants/Colors';
import Text from '@/src/components/ThemedText';

const TrackSearchField = () => {
  const colorScheme = useColorScheme();
  const searchFieldTextColor = Colors[colorScheme ?? 'light'].appleMusicText;
  const searchFieldBgColor = Colors[colorScheme ?? 'light'].appleMusicBg;
  const secondaryTextColor = Colors[colorScheme ?? 'light'].secondaryText;

  const [dialogVisible, setDialogVisible] = useState(false);

  const handlePress = () => {
    setDialogVisible(true);
  };

  let trackData: any = [];
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.searchFieldWrapper}
    >
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
        <Pressable onPress={handlePress}>
          <Animated.View
            style={[styles.option, { borderColor: searchFieldTextColor }]}
          >
            <Text style={[styles.optionText, { color: secondaryTextColor }]}>
              自分で入力する
            </Text>
            <FontAwesome6 name='plus' size={15} color={secondaryTextColor} />
          </Animated.View>
        </Pressable>
        {dialogVisible && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            <Animated.View>
              <Animated.View>
                <TextInput style={{ backgroundColor: 'red' }} />
                <TextInput />
              </Animated.View>
            </Animated.View>
          </KeyboardAvoidingView>
        )}
      </View>
    </Animated.View>
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
    gap: 16,
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
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderCurve: 'continuous',
  },
  optionText: {
    fontSize: 16,
  },
  icon: {
    borderWidth: 1,
    borderRadius: 100,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});
