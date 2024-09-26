import { InternalError } from "../../schema/error";
import { likeRepository } from "../dao/like";
import { checkAuth } from "../dbdriver/checkAuth";

export interface ILikeApplication {
    insertLikeToPost(postId: number): Promise<boolean>;
    deleteLikeToPost(postId: number): Promise<boolean>;
    insertLikeToReply(replyId: number): Promise<boolean>;
    deleteLikeToReply(replyId: number): Promise<boolean>;
    insertLikeToArticle(articleId: number): Promise<boolean>;
    deleteLikeToArticle(articleId: number): Promise<boolean>;
}
    
export class LikeApplication implements ILikeApplication {
    constructor(private likeDao: likeRepository) { }

    async insertLikeToPost(postId: number): Promise<boolean> {
        try {
            const userId = await checkAuth();
            const exist = await this.likeDao.existLikeToPost(postId, userId);
            if (exist) {
                return false;  
            }
            return await this.likeDao.insertLikeToPost(postId, userId);
        } catch (error) {
            throw InternalError;
        }
    }

    async deleteLikeToPost(postId: number): Promise<boolean> {
        try {
            const userId = await checkAuth();
            return await this.likeDao.deleteLikeToPost(postId, userId);
        } catch (error) {
            throw InternalError;
        }
    }

    async insertLikeToReply(replyId: number): Promise<boolean> {
        try {
            const userId = await checkAuth();
            const exist = await this.likeDao.existLikeToReply(replyId, userId);
            if (exist) {
                return false;
            }
            return await this.likeDao.insertLikeToReply(replyId, userId);
        } catch (error) {
            throw InternalError;
        }
    }

    async deleteLikeToReply(replyId: number): Promise<boolean> {
        try {
            const userId = await checkAuth();
            return await this.likeDao.deleteLikeToReply(replyId, userId);
        } catch (error) {
            throw InternalError;
        }
    }

    async insertLikeToArticle(articleId: number): Promise<boolean> {
        try {
            const userId = await checkAuth();
            const exist = await this.likeDao.existLikeToArticle(articleId, userId);
            if (exist) {
                return false;
            }
            return await this.likeDao.insertLikeToArticle(articleId, userId);
        } catch (error) {
            throw InternalError;
        }
    }

    async deleteLikeToArticle(articleId: number): Promise<boolean> {
        try {
            const userId = await checkAuth();
            return await this.likeDao.deleteLikeToArticle(articleId, userId);
        } catch (error) {
            throw InternalError;
        }
    }
}
