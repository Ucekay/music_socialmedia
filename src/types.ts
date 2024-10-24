import type { FlatListProps } from 'react-native';

import type { SearchBarCommands as NativeSearchBarCommands } from 'react-native-screens';

export type StackParamList = {
  Tests: {
    title?: string;
    path?: string[];
  };
  Home: undefined;
  Vertices: undefined;
  API: undefined;
  Breathe: undefined;
  Filters: undefined;
  Gooey: undefined;
  Hue: undefined;
  Matrix: undefined;
  Severance: undefined;
  Aurora: undefined;
  Glassmorphism: undefined;
  Neumorphism: undefined;
  Wallpaper: undefined;
  Wallet: undefined;
  Graphs: undefined;
  Animation: undefined;
  Reanimated: undefined;
  Performance: undefined;
  Transitions: undefined;
  Stickers: undefined;
  FrostedCard: undefined;
  SpeedTest: undefined;
};

export type Palette = {
  r: number;
  g: number;
  b: number;
}[];

export type ArticleData = {
  articleID: string;
  articleTitle: string;
  articleBody: string;
  songName?: string;
  artistName?: string;
  songCount?: string;
  eventName?: string;
  eventInfo?: string;
  imageUrl: string;
  userID: string;
  user: string;
  userAvatarUrl: string;
  type: string;
};

export type PostDataType = {
  postID: number;
  postContent: string;
  ImageUrl: string[];
  userID: string;
  user: string;
  userAvatarUrl: string;
  likes: number;
  createdAt: string;
};

export type PostData = {
  postID: number;
  postContent: string;
  ImageUrl: string[];
  userID: string;
  user: string;
  userAvatarUrl: string;
  likes: number;
  createdAt: string;
  LiketoPost: boolean;
};

export type TodaysSongsData = {
  TodaysSongID: number;
  UserID: string;
  SongID: string;
  Body: string;
  likes: number;
  view: number;
  created_at: string;
  ProfileID: string;
  UserName: string;
  IconImageUrl: string;
  LiketoPost: boolean;
};

export type ColorScheme = {
  text: string;
  secondaryText: string;
  background: string;
  secondaryBackground: string;
  tabBarGradient: [string, string, ...string[]];
  headerBackground: string;
  tint: string;
  border: string;
  tabIconDefault: string;
  tabIconSelected: string;
  followButtonBg: string;
  followButtonText: string;
  placeholder: string;
  appleMusicText: string;
  appleMusicBg: string;
  buttonFilled: string;
  buttonBezeled: string;
  buttonBezeledGray: string;
  buttonBorderless: string;
  buttonText: string;
  buttonGhostText: string;
  buttonDisabled: string;
  buttonDisabledText: string;
  distractive: string;
  distractiveBg: string;
  distractiveText: string;
  searchBar: string;
  editorHighlight: string;
  playerObject1: string;
  playerObject2: string;
  playerObject3: string;
};

export type TodaySongDataType = {
  todaySongID: number;
  userID: string;
  userAvatarUrl: string;
  songName: string;
  artistName: string;
  artworkUrl: string;
  body: string;
};

export type UserListPropsType = {
  userID: string;
  userName: string;
  userAvatarUrl: string;
};

export type PlaylistType = {
  ImageURL?: string;
  playlistName: string;
};

export type Track = {
  musicID: string;
  songName: string;
  artistName: string;
  artworkUrl: string;
};

export type PlaylistDetailType = {
  playlistID: string;
  playlistName: string;
  ImageURL: string;
  songs: Track[];
};

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export type TodaySongsListItemProps = {
  artworkUrl: string;
  songName: string;
  artistName: string;
  userID: string;
};

export type UsersListItemProps = {
  userID: string;
  user: string;
  userAvatarUrl: string;
};

export type CustomFlatListProps<T> = Omit<
  FlatListProps<T>,
  'renderItem' | 'keyExtractor'
>;

export type SearchBarCommands = NativeSearchBarCommands & {
  value?: string;
};
