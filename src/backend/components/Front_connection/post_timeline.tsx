import { supabase } from '../../lib/supabase';
import {
  getInitialPosts,
  getOlderPosts,
  getNewerPosts,
} from '../DB_Access/post';
import { PostData } from '@/src/types';
import { getUserProfileforPosts } from '../DB_Access/profile';

interface FetchPostsParams {
  cursor: string | null;
  isForward: boolean | null;
}

interface PostsResult {
  postData: PostData[];
  cursor: string | null;
  latestcursor: string | null;
}

export const createPostDataset = async ({
  cursor,
  isForward,
}: FetchPostsParams): Promise<PostsResult> => {
  let posts;
  let newCursor: string | null = null;
  let newLatestcursor: string | null = null;

  if (cursor === null) {
    const result = await getInitialPosts();
    posts = result.posts;
    newCursor = result.cursor;
    newLatestcursor = result.latestcursor;
  } else if (isForward === false) {
    const result = await getOlderPosts(cursor);
    posts = result.posts;
    newCursor = result.cursor;
  } else if (isForward === true) {
    const result = await getNewerPosts(cursor);
    posts = result.posts;
    newLatestcursor = result.latestcursor;
  } else {
    throw new Error('Invalid parameters');
  }

  const postData: PostData[] = await Promise.all(
    posts.map(async (post) => {
      const userData= await getUserProfileforPosts(post.UserID)
      const { data: likeData, error: likeError } = await supabase
        .from('PostLikes')
        .select('PostID')
        .eq('UserID', post.UserID)
        .eq('PostID', post.EntryID)
        .single();

      const liketopost = !likeError;

      return {
        postID: post.EntryID,
        postContent: post.Body,
        ImageUrl: post.ImageUrl as string[],
        userID: userData.ProfileID,
        user: userData.UserName,
        userAvatarUrl: userData.IconImageUrl,
        likes: post.likes,
        createdAt: post.created_at,
        LiketoPost: liketopost,
      };
    })
  );

  return { postData, cursor: newCursor, latestcursor: newLatestcursor };
};
