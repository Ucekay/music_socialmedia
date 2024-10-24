import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../contexts/ColorThemeContext';

type ArticleTagProps = {
  type: string;
  size?: number;
};

const ArticleTag = ({ type, size }: ArticleTagProps) => {
  const { tagColors } = useTheme();
  const tagColor = tagColors[type];

  function titleCase(style: string) {
    return style[0].toUpperCase() + style.slice(1).toLowerCase();
  }
  return (
    <View style={[styles.container, { backgroundColor: tagColor.background }]}>
      <Text style={{ color: tagColor.text, fontSize: size }}>
        {titleCase(type)}
      </Text>
    </View>
  );
};

export default ArticleTag;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderCurve: 'continuous',
    borderRadius: 8,
  },
});
