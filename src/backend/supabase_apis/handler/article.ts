import { BadRequestError } from '../../schema/error';
import { ArticleApplication } from '../application/article';
import { ArticleDao } from '../dao/article';

import type {
  ArticleAdditionalData,
  ArticleInteg,
  CUArticleDataParams,
} from '../../schema/supabase_api';

const articleDao = new ArticleDao();
const articleApplication = new ArticleApplication(articleDao);

//handlerまでclassで定義してしまえば、constructorで初期化して依存関係を注入したものを一つのファイルからエクスポートすれば暑あいやすい？

export const CreateArticleHandler = async (
  userId: string,
  thumbnailUrl: string,
  type: string,
  title: string,
  info1: string | null,
  info2: string | null,
  body: string,
  playlistId?: number | null,
): Promise<boolean | string> => {
  if (!userId || !thumbnailUrl || !type || !title || !body) {
    throw BadRequestError;
  }

  const ArticleDataTypes = ['general', 'review', 'liveReport', 'playlist'];

  if (!ArticleDataTypes.includes(type)) {
    throw BadRequestError;
  }

  const ArticleData: CUArticleDataParams = {
    user_id: userId,
    thumbnail_url: thumbnailUrl,
    type: type,
    title: title,
    info_1: info1,
    info_2: info2,
    body: body,
    playlist_id: playlistId,
  };
  const result = await articleApplication.createArticle(ArticleData, userId);
  return result;
};

export const DeleteArticleHandler = async (
  articleId: number,
  userId: string,
  type: string,
): Promise<boolean> => {
  if (!articleId || !userId || !type) {
    throw BadRequestError;
  }
  const result = await articleApplication.deleteArticle(
    articleId,
    userId,
    type,
  );
  return result;
};

export const UpdateArticleHandler = async (
  articleId: number,
  userId: string,
  updateData: Partial<CUArticleDataParams>,
): Promise<boolean> => {
  const result = await articleApplication.updateArticle(
    articleId,
    userId,
    updateData,
  );
  return result;
};

export const GetArticlesHandler = async (
  prevcursor: string | null,
  latest: boolean | null,
): Promise<{
  articlemetaData: ArticleInteg[];
  cursor: string | null;
  latestcursor: string | null;
}> => {
  const result = await articleApplication.getArticles(prevcursor, latest);
  return result;
};

export const GetArticleHandler = async (
  articleId: number,
  type: string,
): Promise<{ content: ArticleAdditionalData; likeStatus: boolean }> => {
  const result = await articleApplication.getArticle(articleId, type);
  return result;
};
