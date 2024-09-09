import { Play } from '../swift/NativeModules';
import { Stop } from '../swift/NativeModules';
import { NextTrack } from '../swift/NativeModules';
import { Previous } from '../swift/NativeModules';

//再生する関数(Onpressで発火)
export const PlayMusic = async (musicid: string): Promise<boolean> => {
  try {
    const playmusic = await new Promise<boolean>((resolve, reject) => {
      Play(musicid, resolve, reject);
    });
    return true;
  } catch (error) {
    console.error('楽曲の再生に失敗しました:', error);
    return false;
  }
};

//停止する関数(Onpressで発火)
export const StopMusic = async (): Promise<boolean> => {
  try {
    const stopmusic = await new Promise<boolean>((resolve, reject) => {
      Stop(resolve, reject);
    });
    return true;
  } catch (error) {
    console.error('楽曲の停止に失敗しました', error);
    return false;
  }
};

//次の曲を再生する関数(Onpressで発火)
export const SkipToNextMusic = async (): Promise<boolean> => {
  try {
    const nextmusic = await new Promise<boolean>((resolve, reject) => {
      NextTrack(resolve, reject);
    });
    return true;
  } catch (error) {
    console.error('曲の移行に失敗しました', error);
    return false;
  }
};

//前の曲に戻るor曲の最初に戻る関数(Onpressで発火)
export const BackToPrevious = async (): Promise<boolean> => {
  try {
    const previousmusic = await new Promise<boolean>((resolve, reject) => {
      Previous(resolve, reject);
    });
    return true;
  } catch (error) {
    console.error('曲の移行に失敗しました', error);
    return false;
  }
};
