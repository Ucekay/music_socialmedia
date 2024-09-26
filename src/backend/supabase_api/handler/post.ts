<<<<<<< HEAD
import { supabase } from '../../lib/supabase';
import {
  getInitialPosts,
  getNewerPosts,
  getOlderPosts,
} from '../dao/post';
import { getUserProfileforPosts } from '../dao/profile';
=======
import { supabase } from "../../lib/supabase";
import { PostInteg } from "../../schema/supabase_api";
import { PostApplication } from "../application/post";
import { PostDao } from "../dao/post";
>>>>>>> d0e8223 (feat api)

const postDao = new PostDao(supabase);
const postApplication = new PostApplication(postDao);

export const CreatePost = async (
    userId: string,
    body: string,
    image_url: string[]
): Promise<boolean> => {
    if (!userId || !body || !image_url) {
        return false;
    }

    const postData = {
        user_id: userId,
        body: body,
        image_url: image_url,
    };

    try {
        const result = await postApplication.createPost(postData);
        return result;
    } catch (error) {
        throw error;
    }
}

export const DeletePost = async(
    postId: number,
    userId: string
): Promise<boolean> => {
    try {
        const result = await postApplication.deletePost(postId, userId);
        return result;
    } catch (error) {
        throw error;
    }
}

export const GetPosts = async (
    prevcursor: string,
    latest: boolean
): Promise<{
    posts: PostInteg[],
    cursor: string | null,
    latestcursor: string | null
    }> => {
    try {
        const result = await postApplication.getPosts(prevcursor, latest);
        return result
    } catch (error) {
        throw error;
    }
}

export const GetPost = async (
    postId: number
): Promise<PostInteg> => {
    try {
        const result = await postApplication.getPost(postId);
        return result;
    } catch (error) {
        throw error;
    }
}
