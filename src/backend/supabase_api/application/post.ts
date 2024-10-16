import { CUPostDataParams, PostInteg } from "../../schema/supabase_api";
import { PostRepository } from "../dao/post";
import { GetPostError, GetUserError, InternalError } from "../../schema/error";
import { UserRepository } from "../dao/user";
export interface IPostApplication {
    createPost(postData: CUPostDataParams): Promise<boolean>;
    deletePost(postId: number, userId: string): Promise<boolean>;
    getPosts(prevcursor: string | null, latest: boolean | null,
    ): Promise<{
        posts: PostInteg[];
        cursor: string | null;
        latestcursor: string | null;
    }>;
    getPost(postId: number): Promise<PostInteg>;
}

export class PostApplication implements IPostApplication {
    private postDao: PostRepository;
    private userDao: UserRepository
    constructor(postRepository: PostRepository, userRepository: UserRepository) {
        this.postDao = postRepository;
        this.userDao = userRepository;
    }

    async createPost(postData: CUPostDataParams): Promise<boolean> {
        try {
            const data = {
                body: postData.body,
                image_url: JSON.stringify(postData.image_url),
                user_id: postData.user_id,
            };
            const postId = await this.postDao.createPost(data);
            if (postId === null) {
                throw InternalError
            }

            return true;
        } catch (error) {
            console.error('データの挿入中にエラーが発生しました:', error);
            throw error;
        }
    }

    async deletePost(postId: number, userId: string): Promise<boolean> {
        try {
            const result = await this.postDao.deletePost(postId, userId);
            if (!result) {
                throw InternalError
            }

            return true;
        } catch (error) {
            console.error('データの削除中にエラーが発生しました:', error);
            throw error;
        }
    }

    async getPosts(
        prevcursor: string | null,
        latest: boolean | null,
    ): Promise<{
        posts: PostInteg[];
        cursor: string | null;
        latestcursor: string | null;
    }> {
        let cursor: string | null = null;
        let latestcursor: string | null = null;
        let result;

        try {
            if (prevcursor == null) {
            result = await this.postDao.getInitialPosts();
            if (result.posts == null) {
                throw GetPostError;
            }
                cursor = result.posts.length > 0 ? result.posts[result.posts.length - 1].created_at : null;
                latestcursor = result.posts.length > 0 ? result.posts[0].created_at : null;
            } else if (latest == false) {
                result = await this.postDao.getOlderPosts(prevcursor);
                if (result.posts == null) {
                    throw GetPostError;
                }
                cursor = result.posts.length > 0 ? result.posts[result.posts.length - 1].created_at : null;
            } else {
                result = await this.postDao.getNewerPosts(prevcursor);
                if (result.posts == null) {
                    throw GetPostError;
                }
                latestcursor = result.posts.length > 0 ? result.posts[0].created_at : null;
            }
        } catch (error) {
            throw GetPostError;
        }

        try {
            const posts: PostInteg[] = await Promise.all(
            result.posts.map(async (post) => {
                const like = await this.postDao.getPostLikes(post.entry_id, post.user_id);

                return {
                    post: {
                        entryId: post.entry_id,
                        userId: post.user_id,
                        body: post.body,
                        createdAt: post.created_at,
                        imageUrl: post.image_url as string[],
                        likes: post.likes,
                        view: post.view,
                    },
                    user: {
                        userId: post.user_id,
                        userName: data.UserName,
                        userAvatarUrl: data.IconImageUrl,
                    },
                    like: {
                        status: like,
                    },
                };
            }),
            );
            
            return {
                posts: posts,
                cursor: cursor,
                latestcursor: latestcursor,
            };
        } catch (error) {
            throw GetPostError;
        }
    }

    async getPost(postId: number): Promise<PostInteg> {
        try {
            const post = await this.postDao.getPost(postId);
            if (post == null) {
                throw GetPostError;
            }

            const user = await this.userDao.getUserProfile(post.user_id);
            if (user == null) {
                throw GetPostError;
            }

            const like = await this.postDao.getPostLikes(post.entry_id, post.user_id);
            if (like == null) {
                throw GetPostError;
            }

            return {
                post: {
                    entryId: post.entry_id,
                    userId: post.user_id,
                    body: post.body,
                    createdAt: post.created_at,
                    imageUrl: post.image_url as string[],
                    likes: post.likes,
                    view: post.view,
                },
                user: {
                    userId: user.ProfileID,
                    userName: user.UserName,
                    userAvatarUrl: user.IconImageUrl,
                },
                like: {
                    status: like,
                },
            };
        } catch (error) {
            throw GetPostError;
        }
    }
}
