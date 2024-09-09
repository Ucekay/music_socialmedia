import { supabase } from '../../lib/supabase';
import {
  getInitialUsersPosts,
  getNewerUsersPosts,
  getOlderUsersPosts,
} from '../dao/post';

import type { PostData } from '@/src/types';

//最初に表示するポストデータを作成する関数
export const createPostDataset = async (
  userId: string,
  prevcursor: string | null,
  latest: boolean | null,
): Promise<{
  postData: PostData[];
  cursor: string | null;
  latestcursor: string | null;
}> => {
  let posts;
  let cursor: string | null = null;
  let latestcursor: string | null = null;
  if (prevcursor == null) {
    const result = await getInitialUsersPosts(userId);
    posts = result.posts;
    cursor = result.cursor;
    latestcursor = result.latestcursor;
  } else if (latest == false) {
    const result = await getOlderUsersPosts(userId, prevcursor);
    posts = result.posts;
    cursor = result.cursor;
    latestcursor = latestcursor;
  } else {
    const result = await getNewerUsersPosts(userId, prevcursor);
    posts = result.posts;
    cursor = cursor;
    latestcursor = result.latestcursor;
  }

  try {
    const postData: PostData[] = await Promise.all(
      posts.map(async (post) => {
        const { data, error } = await supabase
          .from('Users')
          .select('IconImageUrl, UserName, ProfileID')
          .eq('UserID', post.UserID)
          .single();

        let liketopost = true;
        try {
          const { data: Like, error: likeerror } = await supabase
            .from('PostLikes')
            .select('PostID')
            .eq('UserID', post.UserID)
            .eq('PostID', post.EntryID)
            .single();
        } catch (likeerror) {
          liketopost = false;
        }
        if (error) {
          throw error;
        }
        return {
          postID: post.EntryID,
          postContent: post.Body,
          ImageUrl: post.ImageUrl as string[],
          userID: data.ProfileID,
          user: data.UserName,
          userAvatarUrl: data.IconImageUrl,
          likes: post.likes,
          createdAt: post.created_at,
          LiketoPost: liketopost,
        };
      }),
    );

    return { postData, cursor, latestcursor };
  } catch (error) {
    console.error(error);
    return { postData: [], cursor, latestcursor };
  }
};
