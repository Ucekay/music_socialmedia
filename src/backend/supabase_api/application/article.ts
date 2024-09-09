import { type ArticleMetaData, type ArticleData } from "../../schema/supabase_api";
import { CreateArticleMetaData } from "../dao/article/Article";
import { CreateGeneral } from "../dao/article/General";
import { insertLiveReport } from "../dao/article/LiveReport";
import { insertPlaylistArticle } from "../dao/article/PlaylistArticle";
import { insertReview } from "../dao/article/Review";
import { checkAuth } from "../dao/checkAuth";

export const CreateArticleApplication = async (articleData: ArticleData): Promise<boolean | string> => {
    try {

        const userId = await checkAuth();

        // メタデータの挿入
        const ArticleMetaData: ArticleMetaData = {
            thumbnail_url: articleData.thumbnail_url,
            type: articleData.type,
            title: articleData.title,
            info_1: articleData.info_1,
            info_2: articleData.info_2,
            user_id: userId,
        }

        const articleId = await CreateArticleMetaData(ArticleMetaData);

        let result: boolean | string = false;
    
        switch (articleData.type) {
        case 'general':
            const GeneralData = { body: articleData.body, playlist_id: articleData.playlist_id, article_id: articleId };
            result = await CreateGeneral(GeneralData);
            break;
        case 'review':
            const ReviewData = { Body: articleData.body, PlaylistID: articleData.playlistId };
            result = await insertReview(ReviewData);
            break;
        case 'liveReport':
            const LiveReportData = { Body: articleData.body, PlaylistID: articleData.playlistId };
            result = await insertLiveReport(LiveReportData);
            break;
        case 'playlist':
            const PlaylistData = { Body: articleData.body, PlaylistID: articleData.playlistId };
            result = await insertPlaylistArticle(PlaylistData);
            break;
        default:
            throw new Error('予期せぬエラーが発生しました。');
        }
        return result;
    } catch (error) {
        // エラーハンドリング
        return error;
    }
    }
    