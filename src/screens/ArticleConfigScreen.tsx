import { useFocusEffect, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { when } from '@legendapp/state';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated, {
  FadeIn,
  FadeOut,
  type SharedValue,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

import AnimatedTextInput from '../components/AnimatedPlaceholderTextInput';
import ArticleTag from '../components/ArticleTag';
import { Button } from '../components/Button';
import EditorImagePicker from '../components/EditorImagePicker';
import Text from '../components/ThemedText';
import TrackEntry from '../components/TrackEntry';
import { useTheme } from '../contexts/ColorThemeContext';
import { musicItem$ } from '../observables';

const GeneralMetaInput = () => {
  const { colors } = useTheme();
  const textColor = colors.text;

  return (
    <View style={{ gap: 12 }}>
      <Animated.Text
        entering={FadeIn}
        exiting={FadeOut}
        style={[styles.label, { color: textColor }]}
      >
        見出し画像
      </Animated.Text>
      <View style={{ paddingHorizontal: 12 }}>
        <EditorImagePicker />
      </View>
    </View>
  );
};

const LiveReportMetaInput = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const textColor = colors.text;
  const secondaryTextColor = colors.secondaryText;
  const [manualInput, setManualInput] = useState(false);
  const [liveName, setLiveName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [artist, setArtist] = useState({ name: '', id: '' });

  const handleArtistSearch = () => {
    musicItem$.status.set('pending');
    when(
      () => musicItem$.status.get(),
      (status) => {
        if (status === 'selected') {
          const item = musicItem$.item.get();
          if (item && item.type === 'artist') {
            setArtist({ name: item.name, id: item.id });
            musicItem$.item.delete();
          }
        }
      },
    );
    router.push('/searching-music-modal');
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={{ gap: 12 }}>
      <Text style={[styles.label, { color: textColor }]}>ライブの概要</Text>
      <View style={styles.imagePickerContainer}>
        <TextInput
          placeholder='イベント名を入力'
          style={[
            {
              fontSize: 17,
              padding: 12,
              borderRadius: 12,
              borderCurve: 'continuous',
              borderWidth: 1,
            },
            { color: textColor, borderColor: secondaryTextColor },
          ]}
          value={liveName}
          onChangeText={setLiveName}
        />
        {!manualInput && (
          <>
            <Button title='アーティストを検索' onPress={handleArtistSearch} />
            <Button
              title='自分で入力する'
              onPress={() => {
                setManualInput(true);
              }}
            />
          </>
        )}
        {manualInput && (
          <>
            <TextInput
              placeholder='アーティスト名'
              style={[
                {
                  fontSize: 17,
                  padding: 12,
                  borderRadius: 12,
                  borderCurve: 'continuous',
                  borderWidth: 1,
                },
                { color: textColor, borderColor: secondaryTextColor },
              ]}
              value={artistName}
              onChangeText={(text) => setArtistName(text)}
            />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Button
                  title='キャンセル'
                  onPress={() => {
                    setManualInput(false);
                    setArtistName('');
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title='追加'
                  onPress={() => {
                    setArtist({ name: artistName, id: '' });
                  }}
                />
              </View>
            </View>
          </>
        )}
      </View>

      <Animated.Text
        entering={FadeIn}
        exiting={FadeOut}
        style={[styles.label, { color: colors.text }]}
      >
        見出し画像
      </Animated.Text>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.imagePickerContainer}
      >
        <EditorImagePicker />
      </Animated.View>
    </Animated.View>
  );
};

const ArticleConfigScreen = () => {
  const { colors } = useTheme();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useFocusEffect(() => {
    musicItem$.status.set('idle');
  });

  const articleTypes = ['general', 'review', 'liveReport', 'playlist'];

  const textColor = colors.text;
  const secondaryTextColor = colors.secondaryText;

  const opacityValues: { [key: string]: SharedValue<number> } =
    articleTypes.reduce(
      (acc, type) => {
        acc[type] = useSharedValue(1);
        return acc;
      },
      {} as { [key: string]: SharedValue<number> },
    );

  const handleTagPress = (type: string) => {
    if (selectedType === type) {
      setSelectedType(null);
      for (const t of articleTypes) {
        opacityValues[t].value = withTiming(1);
      }
    } else {
      setSelectedType(type);
      for (const t of articleTypes) {
        opacityValues[t].value = withTiming(t === type ? 1 : 0.3);
      }
    }
  };
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <AnimatedTextInput
          label='Article Title'
          focusedLabelTop={16}
          focusedLabelSize={16}
          multiline={true}
          blurOnSubmit={true}
          style={[
            styles.title,
            { color: textColor, borderBottomColor: secondaryTextColor },
          ]}
        />
        <View style={styles.articleMetadataContainer}>
          <View style={styles.articleTagWrapper}>
            <Text style={styles.articlePickerText}>Articleの種類</Text>
            <View style={styles.articleTagContainer}>
              {articleTypes.map((type) => {
                const animatedStyle = useAnimatedStyle(() => {
                  return {
                    opacity: opacityValues[type].value,
                  };
                });

                return (
                  <Pressable
                    key={type}
                    onPress={() => handleTagPress(type)}
                    style={styles.articleTag}
                  >
                    <Animated.View style={animatedStyle}>
                      <ArticleTag type={type} size={17} />
                    </Animated.View>
                  </Pressable>
                );
              })}
            </View>
          </View>
          {selectedType === 'general' && <GeneralMetaInput />}
          {selectedType === 'review' && <TrackEntry />}
          {selectedType === 'liveReport' && <LiveReportMetaInput />}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ArticleConfigScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    borderBottomWidth: 1,
  },
  articleMetadataContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  articlePickerText: {
    fontSize: 17,
  },
  articleTagWrapper: {
    gap: 4,
  },
  articleTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    columnGap: 12,
    rowGap: 24,
  },
  articleTag: {
    flexGrow: 1,
    minWidth: '40%',
  },
  label: {
    fontSize: 17,
  },
  imagePickerContainer: {
    width: '100%',
    paddingHorizontal: 12,
    gap: 12,
  },
});
