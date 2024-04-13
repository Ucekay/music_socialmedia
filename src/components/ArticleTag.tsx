import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../constants/Colors';

const reviewColor = '#cbe8fd';
const reviewTextColor = '#0a6fa3';
const liveReportColor = '#f8e0c8';
const livereportTextColor = '#975b03';
const playlistColor = '#ffdbe5';
const playlistTextColor = '#a24d6a';

type ArticleTagProps = {
  type: string;
};

const ArticleTag = ({ type }: ArticleTagProps) => {
  let bgColor;
  switch (type) {
    case 'general':
      bgColor = COLORS.neutral100;
      break;
    case 'review':
      bgColor = reviewColor;
      break;
    case 'live report':
      bgColor = liveReportColor;
      break;
    case 'playlist':
      bgColor = playlistColor;
      break;
    default:
      bgColor = COLORS.neutral300;
      break;
  }
  let textColor;
  switch (type) {
    case 'review':
      textColor = reviewTextColor;
      break;
    case 'live report':
      textColor = livereportTextColor;
      break;
    case 'playlist':
      textColor = playlistTextColor;
      break;
    default:
      textColor = COLORS.neutral700;
      break;
  }
  function titleCase(style: string) {
    return style[0].toUpperCase() + style.slice(1).toLowerCase();
  }
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/*<View style={[styles.dot, { backgroundColor: bgColor }]}></View>*/}
      <Text style={{ color: textColor }}>{titleCase(type)}</Text>
    </View>
  );
};

export default ArticleTag;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderCurve: 'continuous',
  },
});
