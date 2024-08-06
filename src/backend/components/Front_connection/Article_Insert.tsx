import { insertGeneral } from "../DB_Access/Article/General";
import { insertLiveReport } from "../DB_Access/Article/LiveReport";
import { insertReview } from "../DB_Access/Article/Review";
import { insertPlaylistArticle } from "../DB_Access/Article/PlaylistArticle";

export const InsertArticle = 
async (Articletype: string, ArticleTypes: string[], title: string, body: string,
        playlistId: number|null, artistName: string|null, thumbnailurl: string|null): Promise<boolean | string> => {
    if (!ArticleTypes.includes(Articletype)) {
      throw new Error('無効な記事タイプです。');
    }
  
    switch (Articletype) {
      case 'general':
        const GeneralData = {Title: title, Body: body, PlaylistID: playlistId,
           thumbnailurl: thumbnailurl}
        return await insertGeneral(GeneralData);
      case 'review':
        const ReviewData = {Title: title, Body: body, ArtistName: artistName, PlaylistID: playlistId,
          thumbnailurl: thumbnailurl}
          return await insertReview(ReviewData);
      case 'liveReport':
        const LiveReportData = {Title: title, Body: body, ArtistName: artistName, PlaylistID: playlistId,
          thumbnailurl: thumbnailurl}
          return await insertLiveReport(LiveReportData);
      case 'playlist':
        const PlaylistData = {Title: title, Body: body, PlaylistID: playlistId,
          thumbnailurl: thumbnailurl}
        return await insertPlaylistArticle(PlaylistData);
      default:
        throw new Error('予期せぬエラーが発生しました。');
    }
  };