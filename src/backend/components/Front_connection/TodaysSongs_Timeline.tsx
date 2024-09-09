import { supabase } from '../../lib/supabase';
import { getUserProfileforPosts } from '../DB_Access/profile';
import {
  getInitialTodaysSongs,
  getNewerTodaysSongs,
  getOlderTodaysSongs,
} from '../DB_Access/TodaysSong';

import type { TodaysSongsData } from '@/src/types';

interface FetchPostsParams {
  cursor: string | null;
  isForward: boolean | null;
}

interface TodaysSongsResult {
  todayssongData: TodaysSongsData[];
  cursor: string | null;
  latestcursor: string | null;
}

export const createPostDataset = async ({
  cursor,
  isForward,
}: FetchPostsParams): Promise<TodaysSongsResult> => {
  let TodaysSongs;
  let newCursor: string | null = null;
  let newLatestcursor: string | null = null;

  if (cursor === null) {
    const result = await getInitialTodaysSongs();
    TodaysSongs = result.TodaysSongs;
    newCursor = result.cursor;
    newLatestcursor = result.latestcursor;
  } else if (isForward === false) {
    const result = await getOlderTodaysSongs(cursor);
    TodaysSongs = result.TodaysSongs;
    newCursor = result.cursor;
  } else if (isForward === true) {
    const result = await getNewerTodaysSongs(cursor);
    TodaysSongs = result.TodaysSongs;
    newLatestcursor = result.latestcursor;
  } else {
    throw new Error('Invalid parameters');
  }

  const todayssongsdata: TodaysSongsData[] = await Promise.all(
    TodaysSongs.map(async (todayssongs) => {
      const userData = await getUserProfileforPosts(todayssongs.UserID);
      const { data: likeData, error: likeError } = await supabase
        .from('PostLikes')
        .select('PostID')
        .eq('UserID', todayssongs.UserID)
        .eq('TodaysSongID', todayssongs.TodaysSongID)
        .single();

      const liketopost = !likeError;

      return {
        TodaysSongID: todayssongs.TodaysSongID,
        UserID: userData.ProfileID,
        SongID: todayssongs.SongID,
        Body: todayssongs.Body,
        likes: todayssongs.likes,
        view: todayssongs.view,
        created_at: todayssongs.created_at,
        ProfileID: userData.ProfileID,
        UserName: userData.UserName,
        IconImageUrl: userData.IconImageUrl,
        LiketoPost: liketopost,
      };
    }),
  );

  return {
    todayssongData: todayssongsdata,
    cursor: newCursor,
    latestcursor: newLatestcursor,
  };
};
