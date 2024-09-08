import { CreatePlaylist } from '../swift/NativeModules';
import { AddMusicToPlaylist } from '../swift/NativeModules';
import { GetPlaylists } from '../swift/NativeModules';

//プレイリストを作成する関数(音楽も同時に追加)
export const CreateNewPlaylist = async (name: string,  musicids:string[] ,description?: string): Promise<boolean> =>{
    try{
        const reatePlaylist = await new Promise<boolean>((resolve, reject) =>{
            let des:string = ""
            if(description){
                des = description
            }
            CreatePlaylist(name, des, musicids, resolve, reject)
        });
        return true
    } catch (error) {
        console.error("プレイリストの作成に失敗しました", error)
        return false
    }
}

//プレイリストに追加する関数(単数音楽追加)
export const AddMusic = async (songId:string): Promise<boolean> => {
    try{
      const AddMusic = await  new Promise<boolean>((resolve, reject) => {
        AddMusicToPlaylist(songId, resolve, reject);
    });
    return true
  } catch (error) {
    console.error("楽曲情報の取得に失敗しました:", error);
    return false;
  }
}

export const AddMusicsToPlaylist = async (songIds: string[]): Promise<boolean> => {
    for (const songId of songIds) {
      try {
        const success = await AddMusicToPlaylist(songId); // AddMusicToPlaylistの戻り値を確認
        if (!success) {
          // AddMusicToPlaylist が失敗した場合
          console.error(`楽曲 ${songId} の追加に失敗しました`);
          return false;
        }
      } catch (error) {
        console.error(`楽曲 ${songId} の追加に失敗しました:`, error);
        return false;
      }
    }
    return true;
  };
  

//AppleMusicからプレイリストを取得する関数
export const GetPlaylistFormAppleMusic = async (): Promise<boolean> => {
    try{
        const getplaylists = await new Promise<boolean>((resolve, reject)=>{
            GetPlaylists(resolve, reject);
        });
        return true
      } catch (error) {
        console.error("プレイリストの取得に失敗しました", error);
        return false;
    }
}
