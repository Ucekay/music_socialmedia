import { requireNativeModule } from 'expo-modules-core'


//プレイリストを作成する関数
export const CreateNewPlaylist = async (name: string,  musicids:string[] ,description?: string): Promise<boolean> =>{
    try{
        const CreatePlaylist = requireNativeModule("createPlaylist")
        const createPlaylist = await new Promise<boolean>((resolve, reject) =>{
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

//プレイリストに追加する関数
export const AddToPlaylist = async (songId:string): Promise<boolean> => {
    try{
      const addMusic = requireNativeModule("addMusicToPlaylist")
      const AddMusic = await  new Promise<boolean>((resolve, reject) => {
        addMusic(songId, resolve, reject);
    });
    return true
  } catch (error) {
    console.error("楽曲情報の取得に失敗しました:", error);
    return false;
  }
}

//AppleMusicからプレイリストを取得する関数
export const GetPlaylistFormAppleMusic = async (): Promise<boolean> => {
    try{
        const GetPlaylists = requireNativeModule("getPlaylists")
        const getplaylists = await new Promise<boolean>((resolve, reject)=>{
            GetPlaylists(resolve, reject);
        });
        return true
      } catch (error) {
        console.error("プレイリストの取得に失敗しました", error);
        return false;
    }
}
