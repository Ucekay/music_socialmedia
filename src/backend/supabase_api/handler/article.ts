import { ArticleApplication } from '../application/article';
import { BadRequestError } from '../../schema/error';
import { Article, ArticleAdditionalData, CUArticleDataParams } from '../../schema/supabase_api';
import { ArticleDao } from '../dao/article';

const articleDao = new ArticleDao();
const articleApplication = new ArticleApplication(articleDao);

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
    throw BadRequestError
  }

  const ArticleDataTypes = ['general', 'review', 'liveReport', 'playlist']

  if (!ArticleDataTypes.includes(type)) {
    throw BadRequestError
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
  }

  try {
    const result = await articleApplication.createArticle(ArticleData, userId);
    return result;
  } catch (error) {
    throw error;
  }
};

export const DeleteArticleHandler = async(
  articleId: number, userId: string, type: string
): Promise<boolean> => {
  if (!articleId || !userId || !type) {
    throw BadRequestError;
  }
  try {
    const result = await articleApplication.deleteArticle(articleId, userId, type);
    return result;
  } catch (error) {
    throw error;
  }
}

export const UpdateArticleHandler = async(
  articleId: number,
  userId: string,
  updateData: Partial<CUArticleDataParams>
): Promise<boolean> => {
  try {
    const result = await articleApplication.updateArticle(articleId, userId, updateData);
    return result;
  } catch (error) {
    throw error;
  }
}

export const GetArticlesHandler = async(
  prevcursor: string | null,
  latest: boolean | null
): Promise<{
  articlemetaData: Article[];
  cursor: string | null;
  latestcursor: string | null;
}> => {
  try {
    const result = await articleApplication.getArticles(prevcursor, latest);
    return result;
  } catch (error) {
    throw error;
  }
}

export const GetArticleHandler = async(
  articleId: number,
  type: string
): Promise<{ content: ArticleAdditionalData, likeStatus: boolean }> => {
  try {
    const result = await articleApplication.getArticle(articleId, type);
    return result;
  } catch (error) {
    throw error;
  }
}

