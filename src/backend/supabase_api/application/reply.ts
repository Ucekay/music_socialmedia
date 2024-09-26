import { GetReplyError, InternalError } from "../../schema/error";
import { CUReplyDataParams, ReplyInteg } from "../../schema/supabase_api";
import { ReplyRepository } from "../dao/reply";
import { UserRepository } from "../dao/user";

export interface IReplyApplication {
    createReply(replyData: CUReplyDataParams): Promise<boolean>;
    deleteReply(replyId: number, userId: string): Promise<boolean>;
    getReplies(parentId: number, prevcursor: string | null, latest: boolean | null,
    ): Promise<{
        replies: ReplyInteg[]
        cursor: string | null
        latestcursor: string | null
    }>;
    getReply(replyId: number): Promise<ReplyInteg>;
}

export class ReplyApplication implements IReplyApplication {
    private replyDao: ReplyRepository;
    private userDao: UserRepository
    constructor(replyRepository: ReplyRepository, userRepository: UserRepository) {
        this.replyDao = replyRepository;
        this.userDao = userRepository;
    }

    async createReply(replyData: CUReplyDataParams): Promise<boolean> {
        try {
            const data = {
                body: replyData.body,
                image_url: JSON.stringify(replyData.image_url),
                user_id: replyData.user_id,
                parent_id: replyData.parent_id,
            };
            const replyId = await this.replyDao.createReply(data);
            if (replyId === null) {
                throw InternalError
            }

            return true;
        } catch (error) {
            console.error('データの挿入中にエラーが発生しました:', error);
            throw error;
        }
    }

    async deleteReply(replyId: number, userId: string): Promise<boolean> {
        try {
            const result = await this.replyDao.deleteReply(replyId, userId);
            if (!result) {
                throw InternalError
            }

            return true;
        } catch (error) {
            console.error('データの削除中にエラーが発生しました:', error);
            throw error;
        }
    }

    async getReplies(
        parentId: number,
        prevcursor: string | null,
        latest: boolean | null,
    ): Promise<{ replies: ReplyInteg[]; cursor: string | null; latestcursor: string | null; }> {
        let cursor: string | null = null;
        let latestcursor: string | null = null;
        let result;
        try {
            if (prevcursor == null) {
                result = await this.replyDao.getInitialReplies(parentId);
                if (result.replies == null) {
                    throw GetReplyError;
                }
                cursor = result.replies.length > 0 ? result.replies[result.replies.length - 1].created_at : null;
                latestcursor = result.replies.length > 0 ? result.replies[0].created_at : null;
            } else {
                result = await this.replyDao.getOlderReplies(parentId, prevcursor);
                if (result.replies == null) {
                    throw GetReplyError;
                }
                cursor = result.replies.length > 0 ? result.replies[result.replies.length - 1].created_at : null;
            }
        } catch (error) {
            throw GetReplyError;
        }

        try {
            const replies: ReplyInteg[] = await Promise.all(
                result.replies.map(async (reply) => {
                    const user = await this.userDao.getUserProfile(reply.user_id);
                    const like = await this.replyDao.getLikeStatus(reply.entry_id, reply.user_id);

                    return { 
                        reply: {
                            entryId: reply.entry_id,
                            userId: reply.user_id,
                            body: reply.body,
                            createdAt: reply.created_at,
                            imageUrl: reply.image_url as string[],
                            likes: reply.likes,
                            parentId: reply.parent_id,
                            view: reply.view,
                        },
                        user: {
                            userAvatarUrl: user.IconImageUrl,
                            userName: user.UserName,
                            userId: user.ProfileID,
                        },
                        like: {
                            status: like,
                        }
                    };
                })
            );

            return { replies, cursor, latestcursor };
        } catch (error) {
            throw GetReplyError;
        }
    }

    async getReply(replyId: number): Promise<ReplyInteg> {
        try {
            const reply = await this.replyDao.getReply(replyId);
            if (reply == null) {
                throw GetReplyError;
            }

            const user = await this.userDao.getUserProfile(reply.user_id);
            if (user == null) {
                throw GetReplyError;
            }

            const like = await this.replyDao.getLikeStatus(reply.entry_id, reply.user_id);
            if (like === null) {
                throw GetReplyError;
            }

            return {
                reply: {
                    entryId: reply.entry_id,
                    userId: reply.user_id,
                    body: reply.body,
                    createdAt: reply.created_at,
                    imageUrl: reply.image_url as string[],
                    likes: reply.likes,
                    parentId: reply.parent_id,
                    view: reply.view,
                },
                user: {
                    userAvatarUrl: user.IconImageUrl,
                    userName: user.UserName,
                    userId: user.ProfileID,
                },
                like: {
                    status: like,
                },
            };
        } catch (error) {
            throw GetReplyError;
        }
    }
}