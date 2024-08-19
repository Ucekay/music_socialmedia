import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import React from 'react';
import { TagColors } from '../constants/Colors';

type ArticleTagProps = {
  type: string;
  size?: number;
};

const ArticleTag = ({ type, size }: ArticleTagProps) => {
  const colorScheme = useColorScheme();
  let Color;
  switch (type) {
    case 'general':
      Color = TagColors.general;
      break;
    case 'review':
      Color = TagColors.review;
      break;
    case 'liveReport':
      Color = TagColors.liveReport;
      break;
    case 'playlist':
      Color = TagColors.playlist;
      break;
    default:
      Color = TagColors.general;
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
      <Text
        style={{ color: Color[colorScheme ?? 'light'].text, fontSize: size }}
      >
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
