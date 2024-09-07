import { requireNativeModule } from 'expo-modules-core';

//再生する関数
export const PlayMusic = async (musicid: string): Promise<boolean> => {
  try {
    const play = requireNativeModule('play');
    const playmusic = await new Promise<boolean>((resolve, reject) => {
      play(musicid, resolve, reject);
    });
    return true;
  } catch (error) {
    console.error('楽曲の再生に失敗しました:', error);
    return false;
  }
};

//停止する関数
export const StopMusic = async (): Promise<boolean> => {
  try {
    const stop = requireNativeModule('stop');
    const stopmusic = await new Promise<boolean>((resolve, reject) => {
      stop(resolve, reject);
    });
    return true;
  } catch (error) {
    console.error('楽曲の停止に失敗しました', error);
    return false;
  }
};

//次の曲を再生する関数
export const SkipToNextMusic = async (): Promise<boolean> => {
  try {
    const NextMusic = requireNativeModule('nextTrack');
    const nextmusic = await new Promise<boolean>((resolve, reject) => {
      NextMusic(resolve, reject);
    });
    return true;
  } catch (error) {
    console.error('曲の移行に失敗しました', error);
    return false;
  }
};

//前の曲に戻るor曲の最初に戻る関数
export const BackToPrevious = async (): Promise<boolean> => {
  try {
    const PreviousMusic = requireNativeModule('previous');
    const previousmusic = await new Promise<boolean>((resolve, reject) => {
      PreviousMusic(resolve, reject);
    });
    return true;
  } catch (error) {
    console.error('曲の移行に失敗しました', error);
    return false;
  }
};
