import { useState } from 'react';
import { useNavigation } from 'expo-router';
import {
  View,
  Button,
  StyleSheet,
  Platform,
  useColorScheme,
  Pressable,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import ArticleTag from '@/src/components/ArticleTag';
import Color from '@/src/constants/Colors';

import BgView from '@/src/components/ThemedSecondaryBgView';
import Text from '@/src/components/ThemedText';
import AnimatedTextInput from '../components/AnimatedPlaceholderTextInput';
import TrackInputField from '@/src/components/TrackInputField';
import LiveInputField from '../components/LiveInputField';
import { useHeaderHeight } from '@react-navigation/elements';
import { InsertArticle } from '../backend/components/Front_connection/Article_Insert';
import { uploadImageToStorage, GetImageData } from '../backend/components/DB_Access/Image';

const BOTTOM_TAB_HEIGHT = 96.7;

const ArticleEditorModal = () => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const articleTypes = ['general', 'review', 'liveReport', 'playlist'];

  const textColor = Color[colorScheme ?? 'light'].text;
  const secondaryTextColor = Color[colorScheme ?? 'light'].secondaryText;

  const opacityValues: { [key: string]: SharedValue<number> } =
    articleTypes.reduce((acc, type) => {
      acc[type] = useSharedValue(1);
      return acc;
    }, {} as { [key: string]: SharedValue<number> });

  const handleTagPress = (type: string) => {
    if (selectedType === type) {
      setSelectedType(null);
      articleTypes.forEach((t) => {
        opacityValues[t].value = withTiming(1);
      });
    } else {
      setSelectedType(type);
      articleTypes.forEach((t) => {
        opacityValues[t].value = withTiming(t === type ? 1 : 0.3);
      });
    }
  };

  const handleArticleInsert = async() =>{
    try {

      const type = selectedType || 'null';
      let Thumbnailurl: string | null = null;
      let PlaylistID: string | null = null;
      let ArtistName: string | null = null;
      let uri: string | null = 
      'src/assets/images/author1.jpeg';
      let file: File | null = null;

      if(uri){file = await GetImageData(uri) || null;}
      if(file){ Thumbnailurl = await uploadImageToStorage(file, 'Article-Thumbnail');}

      const result = await InsertArticle(
        type, articleTypes, 'cat', 'neko', PlaylistID, ArtistName, Thumbnailurl); 

      if (typeof result === 'boolean' && result) {
        // 記事の挿入に成功した場合の処理
        console.log('記事が正常に挿入されました');
      } else {
        // 記事の挿入に失敗した場合の処理
        console.error('記事の挿入に失敗しました:', result);
      }
    } catch (error) {
      console.error('記事の挿入中にエラーが発生しました:', error);
    }
  }

  return (
    <BgView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: BOTTOM_TAB_HEIGHT }}
      >
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
            {selectedType === 'review' && <TrackInputField />}
            {selectedType === 'liveReport' && <LiveInputField />}
          </View>
        </View>
      </ScrollView>

      <BgView
        style={[
          styles.bottomButtonWrapper,
          {
            paddingBottom: insets.bottom,
            paddingTop: 12,
          },
        ]}
      >
        <View
          style={[
            styles.bottomButtonContainer,
            { borderTopColor: secondaryTextColor },
          ]}
        >
          <View style={[styles.buttonContainer]}>
            <FontAwesome6 name='xmark' size={16} color={textColor} />
            <Button
              title='Close'
              onPress={() => {
                navigation.goBack();
              }}
              color={textColor}
            />
          </View>
          <View style={styles.buttonContainer}>
            <FontAwesome6 name='check' size={16} color={textColor} />
            <Button title='Publish' 
            onPress={handleArticleInsert} color={textColor} />
          </View>
        </View>
      </BgView>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </BgView>
  );
};

export default ArticleEditorModal;

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
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  articleTag: {
    width: '45%',
    marginVertical: 8,
  },
  bottomButtonWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
  },
});
