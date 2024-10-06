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
    <View style={theme.toolbar.linkBarTheme.addLinkContainer}>
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
