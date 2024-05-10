import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';
import type { articleDataType } from '../types';

const ArticleCardSubhead = ({ article }: { article: articleDataType }) => {
  const { articleBody, songName, artistName, songCount, eventName, type } =
    article;

  switch (type) {
    case 'review':
      if (songName && artistName) {
        return (
          <DefaultCardSubhead boldText={songName} lightColorText={artistName} />
        );
      }
    case 'liveReport':
      if (artistName && eventName) {
        return (
          <DefaultCardSubhead
            boldText={artistName}
            lightColorText={eventName}
          />
        );
      }
    case 'general':
      if (articleBody) {
        return <GeneralCardSubhead body={articleBody} />;
      }
    case 'playlist':
      if (artistName && songCount) {
        return (
          <DefaultCardSubhead
            boldText={artistName}
            lightColorText={songCount}
          />
        );
      }
    default:
      return <></>;
  }
};

const DefaultCardSubhead = ({
  boldText,
  lightColorText,
}: {
  boldText: string;
  lightColorText: string;
}) => {
  const colorScheme = useColorScheme();
  const themeTextColor =
    colorScheme === 'dark'
      ? { color: Colors.dark.text }
      : { color: Colors.light.text };
  const themeSecondlyTextColor =
    colorScheme === 'dark'
      ? { color: Colors.dark.secondlyText }
      : { color: Colors.light.secondlyText };
  return (
    <View>
      <Text
        style={[styles.boldText, themeTextColor]}
        numberOfLines={1}
        ellipsizeMode='tail'
      >
        {boldText}
      </Text>
      <Text
        style={[styles.lightColorText, themeSecondlyTextColor]}
        numberOfLines={1}
        ellipsizeMode='tail'
      >
        {lightColorText}
      </Text>
    </View>
  );
};

const GeneralCardSubhead = ({ body }: { body: string }) => {
  const colorScheme = useColorScheme();
  const themeTextColor =
    colorScheme === 'dark'
      ? { color: Colors.dark.secondlyText }
      : { color: Colors.light.secondlyText };
  return (
    <Text
      style={[styles.bodyText, themeTextColor]}
      numberOfLines={2}
      ellipsizeMode='tail'
    >
      {body}
    </Text>
  );
};

export default ArticleCardSubhead;

const styles = StyleSheet.create({
  boldText: {
    fontSize: 17,
    fontWeight: '500',
  },
  lightColorText: {
    fontSize: 17,
  },
  bodyText: {
    fontSize: 17,
  },
});
