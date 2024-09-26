import { Profile, Article, Post, CProfileDataParams, UProfileDataParams, GetProfileRes } from "../../schema/supabase_api";
import { GetArticleRes } from "../dbdriver/Article";

export interface ProfileRepositoryKari {
    createProfileData(profileData: CProfileDataParams): Promise<string>;
    updateProfileData(profileData: UProfileDataParams): Promise<boolean>;
    getProfileData(userId: string): Promise<GetProfileRes>;

    existProfileId(profileId: string): Promise<boolean>;

    getFavoriteArtistsByUserId(userId: string): Promise<{ artists: { artistId: string, artistName: string }[] }>;
    registerFavoriteArtist(userId: string, artistId: string, artisitName: string): Promise<boolean>;
    deleteFavoriteArtist(userId: string, artistId: string): Promise<boolean>;
    
    getInitialArticlesByUserId(userId: string): Promise<{ articles: GetArticleRes[] | null }>;
    getNewerArticlesByUserId(userId: string, cursor: string | null): Promise<{ articles: GetArticleRes[]; err: Error | null }>;
    getOlderArticlesByUserId(userId: string, latestCursor: string): Promise<{ articles: GetArticleRes[]; err: Error | null }>;
    
    getInitialPostsByUserId(userId: string): Promise<{ posts: Post[] | null }>;
    getNewerPostsByUserId(userId: string, cursor: string | null): Promise<{ posts: Post[]; err: Error | null }>;
    getOlderPostsByUserId(userId: string, latestCursor: string): Promise<{ posts: Post[]; err: Error | null }>;
    getUserProfile(userId: string): Promise<{
        UserName: string;
        IconImageUrl: string;
        ProfileID: string;
        }>;
}
    
export interface UserRepository {
    getUserProfile(userId: string): Promise<{
        UserName: string;
        IconImageUrl: string;
        ProfileID: string;
    }>;
}

export class UserDao implements UserRepository {
    private readonly tableNameUser: string = 'users';
    private readonly db: any;
    constructor(db: any) {
    this.db = db;
  }
    public async getUserProfile(userId: string): Promise<{
		IconImageUrl: string;
		ProfileID: string;
		UserName: string;
	}> {
		try {
			const { data, error } = await this.db// UserIDによる絞り込みを削除
				.from(this.tableNameUser)
				.select('icon_image_url, user_name, profile_id')
				.eq('user_id', userId)
				.single();

			if (error) {
				throw new Error('データの取得エラー: ' + error.message);
			}

			return { IconImageUrl: data.icon_image_url, ProfileID: data.profile_id, UserName: data.user_name };
		} catch (error) {
			console.error('データの取得中にエラーが発生しました:', error);
			throw error;
		}

	}
}