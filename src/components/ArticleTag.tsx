import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import React from 'react';
import { TagsColors } from '../constants/Colors';

type ArticleTagProps = {
  type: string;
};

const ArticleTag = ({ type }: ArticleTagProps) => {
  const colorScheme = useColorScheme();
  let Color;
  switch (type) {
    case 'general':
      Color = TagsColors.general;
      break;
    case 'review':
      Color = TagsColors.review;
      break;
    case 'liveReport':
      Color = TagsColors.liveReport;
      break;
    case 'playlist':
      Color = TagsColors.playlist;
      break;
    default:
      Color = TagsColors.general;
      break;
  }

  function titleCase(style: string) {
    return style[0].toUpperCase() + style.slice(1).toLowerCase();
  }
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Color[colorScheme ?? 'light'].background },
      ]}
    >
      {/*<View style={[styles.dot, { backgroundColor: bgColor }]}></View>*/}
      <Text style={{ color: Color[colorScheme ?? 'light'].text }}>
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
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderCurve: 'continuous',
  },
});
