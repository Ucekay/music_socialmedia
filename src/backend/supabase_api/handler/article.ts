import { CreateArticleApplication } from '../application/article';
import { BadRequestError } from '../../schema/error';
import { ArticleData } from '../../schema/supabase_api';

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

  const ArticleData: ArticleData = {
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
    const result = await CreateArticleApplication(ArticleData);
    return result;
  } catch (error) {
    throw error; 
  }
};
