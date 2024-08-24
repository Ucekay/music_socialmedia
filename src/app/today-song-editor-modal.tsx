import {
  View,
  Platform,
  Button,
  Text,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Stack, useNavigation } from 'expo-router';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useTheme } from '../contexts/ColorThemeContext';
import SecondaryBgView from '../components/ThemedSecondaryBgView';
import { useState } from 'react';
import TodaySongCard from '../components/TodaySongCard';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SONGS = [
  {
    id: '1',
    songName: 'Pray',
    artistName: 'Hakubi',
    artworkUrl:
      'https://www.uta-net.com/res/getamazon.php?jcode=4943674336401&asin=&tid=306896&uimg=',
  },
  {
    id: '2',
    songName: '331',
    artistName: '湯木慧',
    artworkUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyOkC51dEBqOnXTQ74HSMDuT0XJIw70rXCQ&s',
  },
  {
    id: '3',
    songName: `少年少女よ`,
    artistName: 'Organic Call',
    artworkUrl:
      'https://pimg.awa.io/v2/jacket/22cecc9d6d12dce69595.w630.h630.v1724018957.jpg',
  },
  {
    id: '4',
    songName: '青くね',
    artistName: 'bokula.',
    artworkUrl:
      'https://pimg.awa.io/v2/jacket/b5de9216a67ac9171e70.w200.h200.v1722773904.jpg',
  },
  {
    id: '5',
    songName: 'Cloud 9',
    artistName: "SHE'S",
    artworkUrl:
      'https://cf.mora.jp/contents/package/0000/00000083/0035/694/921/0035694921.200.jpg',
  },
  {
    id: '6',
    songName: 'ベガ',
    artistName: 'kalmia',
    artworkUrl:
      'https://cf.mora.jp/contents/package/0000/00000166/0035/486/185/0035486185.200.jpg',
  },
];

const TodaySongEditorModal = () => {
  const { colors } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const [trackName, setTrackName] = useState('');
  const [inputText, setInputText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [displayCharCount, setDisplayCharCount] = useState(0);

  const onClose = () => {
    const title = '下書きに保存しまますか？';
    const options = ['内容を削除する', '内容を保存する', '編集を続行する'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        title,
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            navigation.goBack();
            break;
          case 1:
            navigation.goBack();
            break;
          case 2:
            break;
        }
      }
    );
  };

  const onPublish = () => {
    const options = ['公開する', '編集を続行する'];
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        if (selectedIndex === 0) {
        }
      }
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
          gap: 8,
          borderColor: colors.border,
          borderTopWidth: index % 2 === 0 ? 1 : 0,
          borderBottomWidth: index % 2 === 0 ? 1 : 0,
        }}
      >
        <View
          style={{
            borderRadius: 8,
            borderCurve: 'continuous',
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: item.artworkUrl }}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View>
          <View>
            <Text style={{ fontSize: 16 }}>{item.songName}</Text>
          </View>
          <View>
            <Text style={{ color: colors.secondaryText }}>
              {item.artistName}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SecondaryBgView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={headerHeight + insets.top}
        style={{
          flex: 1,
        }}
      >
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Button title='閉じる' color={colors.text} onPress={onClose} />
            ),
            headerRight: () => <Button title='公開する' onPress={onPublish} />,
          }}
        />
        <View
          style={{
            paddingTop: 32,
            justifyContent: 'flex-end',
          }}
        >
          <TodaySongCard
            isEditing
            onSongInfoPress={() => setIsSearching(true)}
            songInfoShown={!isSearching}
            inputText={inputText}
            setInputText={setInputText}
            trackName={trackName}
            setTrackName={setTrackName}
            displayCharCount={displayCharCount}
            setDisplayCharCount={setDisplayCharCount}
          />
          <View
            style={{
              paddingVertical: 16,
              paddingHorizontal: 32,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ color: colors.text }}>
              {displayCharCount}/150文字
            </Text>
            <View
              style={{
                width: '60%',
                height: 4,
                backgroundColor: colors.border,
                borderRadius: 2,
              }}
            >
              <View
                style={{
                  width:
                    displayCharCount <= 150
                      ? `${(displayCharCount / 150) * 100}%`
                      : '100%',
                  height: '100%',
                  backgroundColor: displayCharCount > 150 ? 'red' : colors.tint,
                  borderRadius: 2,
                }}
              />
            </View>
          </View>
        </View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </KeyboardAvoidingView>
    </SecondaryBgView>
  );
};

export default TodaySongEditorModal;
