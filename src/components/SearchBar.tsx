import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Search, XmarkCircleSolid } from 'iconoir-react-native';
import { useTheme } from '../contexts/ColorThemeContext';

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search',
  onChangeText,
  onSubmit,
}) => {
  const { colors } = useTheme();
  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleChangeText = (text: string) => {
    setValue(text);
    onChangeText?.(text);
  };

  const handleSubmit = () => {
    onSubmit?.(value);
  };

  const handleClear = () => {
    setValue('');
    onChangeText?.('');
    inputRef.current?.focus();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.searchBar,
        },
      ]}
    >
      <Search width={20} height={20} color='#999' style={styles.searchIcon} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
      />
      {value.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearButton}>
          <XmarkCircleSolid width={20} height={20} color='#999' />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    height: 36, // 固定の高さを設定
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    height: '100%', // 親コンテナの高さに合わせる
  },
  clearButton: {
    padding: 4,
    height: '100%', // 親コンテナの高さに合わせる
    justifyContent: 'center', // アイコンを垂直方向に中央揃え
  },
});

export default SearchBar;
