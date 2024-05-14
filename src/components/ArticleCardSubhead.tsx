import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';

import Colors from '../constants/Colors';
import { iconColors } from '../constants/Colors';
import type { articleDataType } from '../types';

const ArticleCardSubhead = ({ article }: { article: articleDataType }) => {
  const colorScheme = useColorScheme();
  const themeTextColor =
    colorScheme === 'dark'
      ? { color: Colors.dark.text }
      : { color: Colors.light.text };
  const themeSecondlyTextColor =
    colorScheme === 'dark'
      ? { color: Colors.dark.secondlyText }
      : { color: Colors.light.secondlyText };
  const { articleBody, songName, artistName, songCount, eventName, type } =
    article;

  switch (type) {
    case 'review':
      if (songName && artistName) {
        return (
          <ReviewCardSubhead
            songName={songName}
            artistName={artistName}
            themeTextColor={themeTextColor}
            themeSecondlyTextColor={themeSecondlyTextColor}
          />
        );
      }
    case 'liveReport':
      if (artistName && eventName) {
        return (
          <DefaultCardSubhead
            boldText={artistName}
            lightColorText={eventName}
            themeTextColor={themeTextColor}
            themeSecondlyTextColor={themeSecondlyTextColor}
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
            themeTextColor={themeTextColor}
            themeSecondlyTextColor={themeSecondlyTextColor}
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
  themeTextColor,
  themeSecondlyTextColor,
}: {
  boldText: string;
  lightColorText: string;
  themeTextColor: { color: string };
  themeSecondlyTextColor: { color: string };
}) => {
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

const ReviewCardSubhead = ({
  songName,
  artistName,
  themeTextColor,
  themeSecondlyTextColor,
}: {
  songName: string;
  artistName: string;
  themeTextColor: { color: string };
  themeSecondlyTextColor: { color: string };
}) => {
  const waveformTintColor = iconColors.waveform;

  return (
    <View>
      <View style={styles.subheadRow}>
        <SymbolView
          name='waveform'
          size={16}
          tintColor={waveformTintColor}
          style={styles.symbol}
        />
        <Text
          style={[styles.boldText, themeTextColor]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {songName}
        </Text>
      </View>
      <View style={styles.subheadRow}>
        <SymbolView
          name='person'
          size={16}
          tintColor={waveformTintColor}
          style={styles.symbol}
        />
        <Text
          style={[styles.lightColorText, themeSecondlyTextColor]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {artistName}
        </Text>
      </View>
    </View>
  );
};
const LiveReportCardSubhead = ({
  songName,
  artistName,
  themeTextColor,
  themeSecondlyTextColor,
}: {
  songName: string;
  artistName: string;
  themeTextColor: { color: string };
  themeSecondlyTextColor: { color: string };
}) => {
  const waveformTintColor = iconColors.waveform;

  return (
    <View>
      <View style={styles.subheadRow}>
        <SymbolView
          name='waveform'
          size={16}
          tintColor={waveformTintColor}
          style={styles.symbol}
        />
        <Text
          style={[styles.boldText, themeTextColor]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {songName}
        </Text>
      </View>
      <View style={styles.subheadRow}>
        <SymbolView
          name='person'
          size={16}
          tintColor={waveformTintColor}
          style={styles.symbol}
        />
        <Text
          style={[styles.lightColorText, themeSecondlyTextColor]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {artistName}
        </Text>
      </View>
    </View>
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
    fontSize: 14,
  },
  subheadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  symbol: {
    marginHorizontal: 4,
  },
});
