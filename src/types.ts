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

export type articleDataType = {
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
  style: any;
  postID: string;
  postContent: string;
  songName?: string;
  artistName?: string;
  musicUrl?: string;
  ImageUrl?: string;
  userID: string;
  user: string;
  userAvatarUrl: string;
};

export type SongData = {
  userID: string;
  userAvatarUrl: string;
  songName: string;
  artistName: string;
  artworkUrl: string;
  body: string;
  todaySongID: number;
};
