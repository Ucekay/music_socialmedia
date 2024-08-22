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
  style?: any;
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

export type ColorScheme = {
  text: string;
  secondaryText: string;
  background: string;
  secondaryBackground: string;
  tabBarGradient: string[];
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
  cancelBg: string;
  cancelText: string;
  buttonSolid: string;
  buttonGhost: string;
  buttonOutline: string;
  buttonOutlineBorder: string;
  buttonText: string;
  buttonGhostText: string;
  buttonDisabled: string;
  buttonDisabledText: string;
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
