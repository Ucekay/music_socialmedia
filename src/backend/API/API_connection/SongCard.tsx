import { GetInformationDetails } from '../swift/NativeModules';

export interface SongDetails {
    title: string;
    artistName: string;
    albumName: string;
    artworkUrl?: string; 
    // ... その他のプロパティ
  }

//IDから情報を取得する関数
export const GetMusicInformation = async (songId: string): Promise<SongDetails | undefined> => {
    try {
      const songDetails = await new Promise<SongDetails>((resolve, reject) => {
        GetInformationDetails(songId, resolve, reject); 
      });
      return songDetails;
    } catch (error) {
      console.error("楽曲情報の取得に失敗しました:", error);
      return undefined;
    }
  };

