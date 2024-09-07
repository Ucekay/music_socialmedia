import { insertArticleMetaData } from '../DB_Access/Article/Article';
import { insertGeneral } from '../DB_Access/Article/General';
import { insertLiveReport } from '../DB_Access/Article/LiveReport';
import { insertPlaylistArticle } from '../DB_Access/Article/PlaylistArticle';
import { insertReview } from '../DB_Access/Article/Review';

//メタデータを挿入した後に記事データを挿入する関数
export const InsertArticle = async (
  ArticleTypes: string[],
  userId: string,
  thumbnailUrl: string,
  type: string,
  title: string,
  info1: string | null,
  info2: string | null,
  body: string,
  playlistId?: number | null,
): Promise<boolean | string> => {
  if (!ArticleTypes.includes(type)) {
    throw new Error('無効な記事タイプです。');
  }

  const ArticleMetaData = {
    ThumbnailURL: thumbnailUrl,
    Type: type,
    Title: title,
    Info1: info1,
    Info2: info2,
  };

  try {
    // メタデータの挿入
    const MetaData = await insertArticleMetaData(ArticleMetaData);

    // メタデータが正常に挿入された後
    let result: boolean | string = false;

    switch (type) {
      case 'general':
        const GeneralData = { Body: body, PlaylistID: playlistId };
        result = await insertGeneral(GeneralData);
        break;
      case 'review':
        const ReviewData = { Body: body, PlaylistID: playlistId };
        result = await insertReview(ReviewData);
        break;
      case 'liveReport':
        const LiveReportData = { Body: body, PlaylistID: playlistId };
        result = await insertLiveReport(LiveReportData);
        break;
      case 'playlist':
        const PlaylistData = { Body: body, PlaylistID: playlistId };
        result = await insertPlaylistArticle(PlaylistData);
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
