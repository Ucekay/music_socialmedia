import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ColorThemeContext';

interface SearchFieldProps {
  placeholder: string;
}

const TrackSearchField: React.FC<SearchFieldProps> = ({ placeholder }) => {
  const { colors } = useTheme();
  const searchFieldTextColor = colors.appleMusicText;
  const searchFieldBgColor = colors.appleMusicBg;

  return (
    <View
      style={[
        styles.inputInner,
        {
          backgroundColor: searchFieldBgColor,
          borderColor: searchFieldBgColor,
        },
      ]}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={searchFieldTextColor}
        style={[styles.inputText, { color: searchFieldTextColor }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputInner: {
    padding: 12,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TrackSearchField;
