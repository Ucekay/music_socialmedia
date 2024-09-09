import { StyleSheet, Text, View } from 'react-native';

import { type SFSymbol, SymbolView } from 'expo-symbols';

import { TagColors } from '../constants/Colors';
import { useTheme } from '../contexts/ColorThemeContext';

import type { ArticleData } from '../types';

type SubheadSize = 'sm' | 'md';

interface ArticleSubheadProps {
  article: ArticleData;
  size?: SubheadSize;
}

const ArticleSubhead = ({ article, size = 'sm' }: ArticleSubheadProps) => {
  const { colors } = useTheme();
  const primaryTextColor = colors.text;
  const secondaryTextColor = colors.secondaryText;
  const { articleBody, songName, artistName, songCount, eventName, type } =
    article;

  const styles = createStyles(size);

  switch (type) {
    case 'review':
      return songName && artistName ? (
        <ReviewSubhead
          songTitle={songName}
          artistName={artistName}
          primaryTextColor={primaryTextColor}
          secondaryTextColor={secondaryTextColor}
          styles={styles}
        />
      ) : null;
    case 'live report':
      return artistName && eventName ? (
        <LiveReportSubhead
          artistName={artistName}
          eventName={eventName}
          primaryTextColor={primaryTextColor}
          secondaryTextColor={secondaryTextColor}
          styles={styles}
        />
      ) : null;
    case 'general':
      return articleBody ? (
        <GeneralSubhead
          body={articleBody}
          textColor={secondaryTextColor}
          styles={styles}
        />
      ) : null;
    case 'playlist':
      return artistName && songCount ? (
        <PlaylistSubhead
          artistName={artistName}
          songCount={songCount}
          primaryTextColor={primaryTextColor}
          secondaryTextColor={secondaryTextColor}
          styles={styles}
        />
      ) : null;
    default:
      return null;
  }
};

const ReviewSubhead = ({
  songTitle,
  artistName,
  primaryTextColor,
  secondaryTextColor,
  styles,
}: {
  songTitle: string;
  artistName: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  styles: ReturnType<typeof createStyles>;
}) => (
  <View>
    <SubheadRow
      iconName='waveform'
      text={songTitle}
      textColor={primaryTextColor}
      tintColor={TagColors.light.review.tint}
      styles={styles}
    />
    <SubheadRow
      iconName='music.mic'
      text={artistName}
      textColor={secondaryTextColor}
      tintColor={TagColors.light.review.tint}
      styles={styles}
    />
  </View>
);

const LiveReportSubhead = ({
  artistName,
  eventName,
  primaryTextColor,
  secondaryTextColor,
  styles,
}: {
  artistName: string;
  eventName: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  styles: ReturnType<typeof createStyles>;
}) => (
  <View>
    <SubheadRow
      iconName='music.mic'
      text={artistName}
      textColor={primaryTextColor}
      tintColor={TagColors.light.liveReport.tint}
      styles={styles}
    />
    <SubheadRow
      iconName='mappin.and.ellipse'
      text={eventName}
      textColor={secondaryTextColor}
      tintColor={TagColors.light.liveReport.tint}
      styles={styles}
    />
  </View>
);

const GeneralSubhead = ({
  body,
  textColor,
  styles,
}: {
  body: string;
  textColor: string;
  styles: ReturnType<typeof createStyles>;
}) => (
  <Text
    style={[styles.bodyText, { color: textColor }]}
    numberOfLines={2}
    ellipsizeMode='tail'
  >
    {body}
  </Text>
);

const PlaylistSubhead = ({
  artistName,
  songCount,
  primaryTextColor,
  secondaryTextColor,
  styles,
}: {
  artistName: string;
  songCount: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  styles: ReturnType<typeof createStyles>;
}) => (
  <View>
    <SubheadRow
      iconName='music.mic'
      text={artistName}
      textColor={primaryTextColor}
      tintColor={TagColors.light.playlist.tint}
      styles={styles}
    />
    <SubheadRow
      iconName='list.bullet'
      text={songCount}
      textColor={secondaryTextColor}
      tintColor={TagColors.light.playlist.tint}
      styles={styles}
    />
  </View>
);

const SubheadRow = ({
  iconName,
  text,
  textColor,
  tintColor,
  styles,
}: {
  iconName: SFSymbol;
  text: string;
  textColor: string;
  tintColor: string;
  styles: ReturnType<typeof createStyles>;
}) => (
  <View style={styles.row}>
    <SymbolView
      name={iconName}
      size={styles.icon.fontSize}
      tintColor={tintColor}
      style={styles.icon}
    />
    <Text
      style={[styles.text, { color: textColor }]}
      numberOfLines={1}
      ellipsizeMode='tail'
    >
      {text}
    </Text>
  </View>
);

const createStyles = (size: SubheadSize) => {
  const fontSize = size === 'sm' ? 16 : 18;
  const iconSize = size === 'sm' ? 16 : 18;
  const lineHeight = size === 'sm' ? 20 : 24;

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    text: {
      flex: 1,
      fontSize,
      fontWeight: '500',
    },
    bodyText: {
      fontSize: size === 'sm' ? 14 : 16,
      lineHeight,
      height: size === 'sm' ? 40 : 48,
    },
    icon: {
      marginHorizontal: 6,
      fontSize: iconSize,
    },
  });
};

export default ArticleSubhead;
