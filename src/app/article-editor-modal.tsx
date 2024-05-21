import { Stack, useNavigation } from 'expo-router';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Platform,
  useColorScheme,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import ArticleTag from '@/src/components/ArticleTag';
import Color from '@/src/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BgView from '../components/SecondaryBgView';

const articleTypes = ['general', 'review', 'liveReport', 'playlist'];

const ArticleEditorModal = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const textColor = Color[colorScheme ?? 'light'].text;
  const secondaryTextColor = Color[colorScheme ?? 'light'].secondaryText;

  return (
    <BgView style={[styles.container, { paddingTop: insets.top }]}>
      <TextInput
        placeholder='Article Title'
        style={[styles.title, { borderBottomColor: secondaryTextColor }]}
      />
      <View style={styles.articleTagWrapper}>
        <Text>Article Type</Text>
        <View style={styles.articleTagContainer}>
          {articleTypes.map((type) => {
            return <ArticleTag type={type} key={type} />;
          })}
        </View>
      </View>
      <View
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
            <Button title='Publish' onPress={() => {}} color={textColor} />
          </View>
        </View>
      </View>
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
    gap: 16,
  },
  title: {
    flexShrink: 1,
    fontSize: 28,
    fontWeight: '700',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  articleTagWrapper: {
    gap: 8,
  },
  articleTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
