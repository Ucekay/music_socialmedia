import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../contexts/ColorThemeContext';

type ArticleTagProps = {
  type: string;
  size?: number;
};

const ArticleTag = ({ type, size }: ArticleTagProps) => {
  const { tagColors } = useTheme();
  const [colors, setColors] = useState(tagColors[type]);
  if (colors === undefined) {
    setColors(tagColors.general);
  }

  function titleCase(style: string) {
    return style[0].toUpperCase() + style.slice(1).toLowerCase();
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text, fontSize: size }}>
        {titleCase(type)}
      </Text>
    </View>
  );
};

export default ArticleTag;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderCurve: 'continuous',
    borderRadius: 8,
    gap: 8,
  },
});
