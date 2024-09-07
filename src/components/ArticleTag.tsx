import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../contexts/ColorThemeContext';

type ArticleTagProps = {
  type: string;
  size?: number;
};

const ArticleTag = ({ type, size }: ArticleTagProps) => {
  const { tagColors } = useTheme();
  let Color;
  switch (type) {
    case 'general':
      Color = tagColors.general;
      break;
    case 'review':
      Color = tagColors.review;
      break;
    case 'liveReport':
      Color = tagColors.liveReport;
      break;
    case 'playlist':
      Color = tagColors.playlist;
      break;
    default:
      Color = tagColors.general;
      break;
  }

  function titleCase(style: string) {
    return style[0].toUpperCase() + style.slice(1).toLowerCase();
  }
  return (
    <View style={[styles.container, { backgroundColor: Color.background }]}>
      {/*<View style={[styles.dot, { backgroundColor: bgColor }]}></View>*/}
      <Text style={{ color: Color.text, fontSize: size }}>
        {titleCase(type)}
      </Text>
    </View>
  );
};

export default ArticleTag;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderCurve: 'continuous',
  },
});
