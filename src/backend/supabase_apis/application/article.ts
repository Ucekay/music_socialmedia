import {
  BadRequestError,
  GetArticleError,
  InternalError,
} from '../../schema/error';
import type {
  ArticleAdditionalData,
  ArticleInteg,
  CUArticleDataParams,
} from '../../schema/supabase_api';
import type { ArticleRepository } from '../dao/article';
import { checkAuth } from '../dbdriver/checkAuth';

export interface IArticleApplication {
  createArticle(
    articleData: CUArticleDataParams,
    userId: string,
  ): Promise<boolean | string>;
  deleteArticle(
    articleId: number,
    userId: string,
    type: string,
  ): Promise<boolean>;
  updateArticle(
    articleId: number,
    userId: string,
    updateData: Partial<CUArticleDataParams>,
  ): Promise<boolean>;
  getArticles(
    prevcursor: string | null,
    latest: boolean | null,
  ): Promise<{
    articlemetaData: ArticleInteg[];
    cursor: string | null;
    latestcursor: string | null;
  }>;
  getArticle(
    articleId: number,
    type: string,
  ): Promise<{ content: ArticleAdditionalData; likeStatus: boolean }>;
}

//アプリケーション層classにすることで保守性の向上を図る
export class ArticleApplication implements IArticleApplication {
  private articleDao: ArticleRepository;
  constructor(articleRepository: ArticleRepository) {
    this.articleDao = articleRepository;
  }

  async createArticle(
    articleData: CUArticleDataParams,
    userId: string,
  ): Promise<boolean | string> {
    try {
      const ArticleMetaData = {
        thumbnail_url: articleData.thumbnail_url,
        type: articleData.type,
        title: articleData.title,
        info_1: articleData.info_1,
        info_2: articleData.info_2,
        user_id: userId,
      };

      const articleId =
        await this.articleDao.createArticleData(ArticleMetaData);

      let result: boolean | string = false;

      switch (articleData.type) {
        case 'general':
          const GeneralData = {
            body: articleData.body,
            playlist_id: articleData.playlist_id,
            article_id: articleId,
          };
          result = await this.articleDao.createGeneralData(GeneralData);
          break;
        case 'review':
          const ReviewData = {
            body: articleData.body,
            playlist_id: articleData.playlist_id,
            article_id: articleId,
          };
          result = await this.articleDao.createReviewData(ReviewData);
          break;
        case 'liveReport':
          const LiveReportData = {
            body: articleData.body,
            playlist_id: articleData.playlist_id,
            article_id: articleId,
          };
          result = await this.articleDao.createLiveReportData(LiveReportData);
          break;
        case 'playlist':
          const PlaylistData = {
            body: articleData.body,
            playlist_id: articleData.playlist_id,
            article_id: articleId,
          };
          result =
            await this.articleDao.createPlaylistArticleData(PlaylistData);
          break;
        default:
          throw new Error('Invalid type');
      }
      return result;
    } catch (error) {
      console.error('Error creating article:', error);
      throw InternalError;
    }
  }

  async deleteArticle(
    articleId: number,
    userId: string,
    type: string,
  ): Promise<boolean> {
    try {
      const userIDByAuth = await checkAuth();

      if (userIDByAuth !== userId) {
        throw BadRequestError;
      }

      const _deleteMetaResult = await this.articleDao.deleteArticleData(
        articleId,
        userId,
      );

      switch (type) {
        case 'general':
          return await this.articleDao.deleteGeneralData(articleId, userId);
        case 'review':
          return await this.articleDao.deleteReviewData(articleId, userId);
        case 'liveReport':
          return await this.articleDao.deleteLiveReportData(articleId, userId);
        case 'playlist':
          return await this.articleDao.deletePlaylistArticleData(
            articleId,
            userId,
          );
        default:
          throw new Error('Invalid type');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      throw InternalError;
    }
  }

  async updateArticle(
    articleId: number,
    userId: string,
    updateData: Partial<CUArticleDataParams>,
  ): Promise<boolean> {
    try {
      const userIDByAuth = await checkAuth();

      if (userIDByAuth !== userId) {
        throw BadRequestError;
      }

      const _updateMetaResult = await this.articleDao.updateArticleData(
        articleId,
        updateData,
      );

      switch (updateData.type) {
        case 'general':
          return await this.articleDao.updateGeneralData(articleId, updateData);
        case 'review':
          return await this.articleDao.updateReviewData(articleId, updateData);
        case 'liveReport':
          return await this.articleDao.updateLiveReportData(
            articleId,
            updateData,
          );
        case 'playlist':
          return await this.articleDao.updatePlaylistArticleData(
            articleId,
            updateData,
          );
        default:
          throw new Error('Invalid type');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      throw InternalError;
    }
  }

  async getArticles(
    prevcursor: string | null,
    latest: boolean | null,
  ): Promise<{
    articlemetaData: ArticleInteg[];
    cursor: string | null;
    latestcursor: string | null;
  }> {
    let metadata;
    [];
    let cursor: string | null = null;
    let latestcursor: string | null = null;

    try {
      if (prevcursor == null) {
        const result = await this.articleDao.getInitialData();
        if (result.articles == null) {
          throw GetArticleError;
        }
        metadata = result.articles;
        cursor =
          metadata.length > 0
            ? metadata[metadata.length - 1].article.createdAt
            : null;
        latestcursor =
          metadata.length > 0 ? metadata[0].article.createdAt : null;
      } else if (latest === false) {
        const result = await this.articleDao.getOlderData(prevcursor);
        metadata = result.articles;
        cursor =
          metadata.length > 0
            ? metadata[metadata.length - 1].article.createdAt
            : prevcursor;
        if (result.err != null) {
          throw result.err;
        }
      } else {
        const result = await this.articleDao.getNewerData(prevcursor);
        metadata = result.articles;
        latestcursor =
          metadata.length > 0 ? metadata[0].article.createdAt : null;
      }
      return {
        articlemetaData: metadata,
        cursor: cursor,
        latestcursor: latestcursor,
      };
    } catch (error) {
      throw GetArticleError;
    }
  }

  async getArticle(
    articleId: number,
    type: string,
  ): Promise<{ content: ArticleAdditionalData; likeStatus: boolean }> {
    const userId = await checkAuth();

    try {
      const result: {
        content: ArticleAdditionalData | null;
        likeStatus: boolean;
      } = { content: null, likeStatus: false };
      let res;
      switch (type) {
        case 'general':
          res = await this.articleDao.getGeneralData(articleId);
          if (res) {
            result.content = res;
          }
          break;
        case 'review':
          res = await this.articleDao.getReviewData(articleId);
          if (res) {
            result.content = res;
          }
          break;
        case 'liveReport':
          res = await this.articleDao.getLiveReportData(articleId);
          if (res) {
            result.content = res;
          }
          break;
        case 'playlist':
          res = await this.articleDao.getPlaylistArticleData(articleId);
          if (res) {
            result.content = res;
          }
          break;
        default:
          throw BadRequestError;
      }
      if (result.content) {
        result.likeStatus = await this.articleDao.getLikeStatus(
          articleId,
          userId,
        );
      }

      if (!result.content) {
        throw InternalError;
      }

      return { content: result.content, likeStatus: result.likeStatus };
    } catch (error) {
      if (error === BadRequestError) {
        throw BadRequestError;
      } else {
        throw InternalError;
      }
    }
  }
}
