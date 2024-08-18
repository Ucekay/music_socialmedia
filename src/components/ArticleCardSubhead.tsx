import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';

import Colors from '../constants/Colors';
import { TagsColors } from '../constants/Colors';
import type { articleDataType } from '../types';

const ArticleCardSubhead = ({ article }: { article: articleDataType }) => {
  const colorScheme = useColorScheme();
  const themeTextColor =
    colorScheme === 'dark'
      ? { color: Colors.dark.text }
      : { color: Colors.light.text };
  const themeSecondlyTextColor =
    colorScheme === 'dark'
      ? { color: Colors.dark.secondaryText }
      : { color: Colors.light.secondaryText };
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
    case 'live report':
      if (artistName && eventName) {
        return (
          <LiveReportCardSubhead
            artistName={artistName}
            eventName={eventName}
            themeTextColor={themeTextColor}
            themeSecondlyTextColor={themeSecondlyTextColor}
          />
        );
      }
    case 'general':
      if (articleBody) {
        return (
          <GeneralCardSubhead
            body={articleBody}
            themeTextColor={themeSecondlyTextColor}
          />
        );
      }
    case 'playlist':
      if (artistName && songCount) {
        return (
          <PlaylistCardSubhead
            artistName={artistName}
            songCount={songCount}
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

const GeneralCardSubhead = ({
  body,
  themeTextColor,
}: {
  body: string;
  themeTextColor: { color: string };
}) => {
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
  const tintColor = TagsColors.review.tint;

  return (
    <View>
      <View style={styles.subheadRow}>
        <SymbolView
          name='waveform'
          size={16}
          tintColor={tintColor}
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
          name='music.mic'
          size={16}
          tintColor={tintColor}
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
  artistName,
  eventName,
  themeTextColor,
  themeSecondlyTextColor,
}: {
  artistName: string;
  eventName: string;
  themeTextColor: { color: string };
  themeSecondlyTextColor: { color: string };
}) => {
  const tintColor = TagsColors.liveReport.tint;

  return (
    <View>
      <View style={styles.subheadRow}>
        <SymbolView
          name='music.mic'
          size={16}
          tintColor={tintColor}
          style={styles.symbol}
        />
        <Text
          style={[styles.boldText, themeTextColor]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {artistName}
        </Text>
      </View>
      <View style={styles.subheadRow}>
        <SymbolView
          name='mappin.and.ellipse'
          size={16}
          tintColor={tintColor}
          style={styles.symbol}
        />
        <Text
          style={[styles.lightColorText, themeSecondlyTextColor]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {eventName}
        </Text>
      </View>
    </View>
  );
};

const PlaylistCardSubhead = ({
  artistName,
  songCount,
  themeTextColor,
  themeSecondlyTextColor,
}: {
  artistName: string;
  songCount: string;
  themeTextColor: { color: string };
  themeSecondlyTextColor: { color: string };
}) => {
  const tintColor = TagsColors.playlist.tint;

  return (
    <View>
      <View style={styles.subheadRow}>
        <SymbolView
          name='music.mic'
          size={16}
          tintColor={tintColor}
          style={styles.symbol}
        />
        <Text
          style={[styles.boldText, themeTextColor]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {artistName}
        </Text>
      </View>
      <View style={styles.subheadRow}>
        <SymbolView
          name='list.bullet'
          size={16}
          tintColor={tintColor}
          style={styles.symbol}
        />
        <Text
          style={[styles.lightColorText, themeSecondlyTextColor]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {songCount}
        </Text>
      </View>
    </View>
  );
};

export default ArticleCardSubhead;

const styles = StyleSheet.create({
  boldText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  lightColorText: {
    fontSize: 16,
  },
  bodyText: {
    fontSize: 14,
    height: 40,
    lineHeight: 20,
  },
  subheadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  symbol: {
    marginHorizontal: 6,
  },
});
