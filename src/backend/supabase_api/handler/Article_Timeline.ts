import {
  getInitialArticleMetaData,
  getNewerMetaData,
  getOlderArticleMetaData,
} from '../dao/article/Article';
import {
  type GetGetArticleContent,
  getGeneral,
} from '../dao/article/General';
import { getLiveReport } from '../dao/article/LiveReport';
import { getPlaylistArticle } from '../dao/article/PlaylistArticle';
import { getReview } from '../dao/article/Review';
import { checkAuth } from '../dao/checkAuth';
import { getUserProfileforPosts } from '../dao/profile';

import type { Database } from '../../schema/supabasetypes';

export type ArticleMetaData = Database['public']['Tables']['Article']['Row'];

export type Articles = {
  ArticleID: number;
  Title: string;
  ThumbnailUrl: string;
  userID: string;
  user: string;
  userAvatarUrl: string;
  Info1: string | null;
  Info2: string | null;
  Type: string;
  createdAt: string;
};

//最初に表示するポストデータを作成する関数
export const createPostDataset = async (
  prevcursor: string | null,
  latest: boolean | null,
): Promise<{
  articlemetaData: Articles[];
  cursor: string | null;
  latestcursor: string | null;
}> => {
  let metadata;
  let cursor: string | null = null;
  let latestcursor: string | null = null;
  if (prevcursor == null) {
    const result = await getInitialArticleMetaData();
    metadata = result.posts;
    cursor = result.cursor;
    latestcursor = result.latestcursor;
  } else if (latest == false) {
    const result = await getOlderArticleMetaData(prevcursor);
    metadata = result.posts;
    cursor = result.cursor;
    latestcursor = latestcursor;
  } else {
    const result = await getNewerMetaData(prevcursor);
    metadata = result.posts;
    cursor = cursor;
    latestcursor = result.latestcursor;
  }

  try {
    const articlemetaData: Articles[] = await Promise.all(
      metadata.map(async (Data) => {
        const data = await getUserProfileforPosts(Data.UserID);

        return {
          ArticleID: Data.ArticleID,
          Title: Data.Title,
          ThumbnailUrl: Data.ThumbnailURL,
          userID: data.ProfileID,
          user: data.UserName,
          userAvatarUrl: data.IconImageUrl,
          Info1: Data.Info1,
          Info2: Data.Info2,
          Type: Data.Type,
          createdAt: Data.created_at,
        };
      }),
    );

    return { articlemetaData, cursor, latestcursor };
  } catch (error) {
    console.error(error);
    return { articlemetaData: [], cursor, latestcursor };
  }
};

export const getArticleContent = async (
  type: string,
  ArticleID: number,
): Promise<{
  Content: GetGetArticleContent;
  LiketoArticle: boolean;
} | null> => {
  try {
    const userId = await checkAuth();
    let result: {
      Content: GetGetArticleContent;
      LiketoArticle: boolean;
    } | null = null;

    switch (type) {
      case 'general':
        const GeneralData = await getGeneral(ArticleID, userId);
        if (GeneralData != null) {
          result = {
            Content: GeneralData.GeneralData,
            LiketoArticle: GeneralData.LikeToArticle,
          };
        }
        break;
      case 'review':
        const ReviewData = await getReview(ArticleID, userId);
        if (ReviewData != null) {
          result = {
            Content: ReviewData?.ReviewData,
            LiketoArticle: ReviewData.LikeToArticle,
          };
        }
        break;
      case 'liveReport':
        const LiveReportData = await getLiveReport(ArticleID, userId);
        if (LiveReportData != null) {
          result = {
            Content: LiveReportData?.LiveReportData,
            LiketoArticle: LiveReportData.LikeToArticle,
          };
        }
        break;
      case 'playlist':
        const PlaylistData = await getPlaylistArticle(ArticleID, userId);
        if (PlaylistData != null) {
          result = {
            Content: PlaylistData.PlaylistArticleData,
            LiketoArticle: PlaylistData.LikeToArticle,
          };
        }
        break;
      default:
        throw new Error('予期せぬエラーが発生しました。');
    }
    return result;
  } catch (error) {
    // エラーハンドリング
    console.error('記事の挿入中にエラーが発生しました:', error);
    throw error; // 必要に応じてエラーを再スロー
  }
};
