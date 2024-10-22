import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { type EditorTheme, Images } from '@10play/tentap-editor';
import { Image } from 'expo-image';

interface EditYoutubeLinkBarProps {
  theme: EditorTheme;
  onBlur: () => void;
  onEditLink: (newLink: string) => void;
  onLinkIconClick: () => void;
}

export const EditYoutubeLinkBar = ({
  theme,
  onEditLink,
  onLinkIconClick,
  onBlur,
}: EditYoutubeLinkBarProps) => {
  const [link, setLink] = useState('');
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        height: 44,
        backgroundColor: 'transparent',
        padding: 4,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pressable
        onPress={onLinkIconClick}
        style={[
          theme.toolbar.toolbarButton,
          theme.toolbar.linkBarTheme.linkToolbarButton,
        ]}
      >
        <View
          style={[theme.toolbar.iconWrapper, theme.toolbar.iconWrapperActive]}
        >
          <Image
            source={Images.link}
            style={[theme.toolbar.icon, theme.toolbar.iconActive]}
            contentFit='contain'
          />
        </View>
      </Pressable>
      <TextInput
        value={link}
        onBlur={onBlur}
        onChangeText={setLink}
        placeholder='Type YouTube URL here...'
        placeholderTextColor={theme.toolbar.linkBarTheme.placeholderTextColor}
        autoFocus
        style={theme.toolbar.linkBarTheme.linkInput}
        autoCapitalize='none'
      />
      <Pressable
        style={theme.toolbar.linkBarTheme.doneButton}
        onPress={() => {
          onEditLink(link);
        }}
      >
        <Text style={theme.toolbar.linkBarTheme.doneButtonText}>Insert</Text>
      </Pressable>
    </View>
  );
};
