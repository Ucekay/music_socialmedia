import { GetArticleError } from "../../schema/error";
import { Profile, Article, Post, CProfileDataParams, UProfileDataParams } from "../../schema/supabase_api";
import { ProfileRepositoryKari } from "../dao/user";
import { getUserProfileforPosts } from "../dbdriver/profile";

export interface IProfileApplication {
    createProfile(profileData: CProfileDataParams): Promise<string>;
    updateProfile(profileData: UProfileDataParams): Promise<boolean | string>;
    getProfile(userId: string): Promise<Profile>;
    registerFavoriteArtist(userId: string, artistId: string, artistName: string): Promise<boolean>;
    deleteFavoriteArtist(userId: string, artistId: string, artistName: string): Promise<boolean>;
    getArticlesByUser(userId: string, prevcursor: string | null, latest: boolean | null
    ): Promise<{
        articlemetaData: Article[];
        cursor: string | null;
        latestcursor: string | null;
    }>;
    existProfileId(profileId: string): Promise<boolean>;
}

export class ProfileApplication implements IProfileApplication {
    private profileDao: ProfileRepositoryKari;
    constructor(profileRepository: ProfileRepositoryKari) {
        this.profileDao = profileRepository;
    }

    async createProfile(profileData: CProfileDataParams): Promise<string> {
        try {
            const result = await this.profileDao.createProfileData(profileData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(profileData: UProfileDataParams): Promise<boolean | string> {
        if (profileData.profile_id) {
            const exist = await this.profileDao.existProfileId(profileData.profile_id);
            if (exist) {
                throw new Error('profile_id is invalid');
            }
        }

        try {
            const result = await this.profileDao.updateProfileData(profileData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getProfile(userId: string): Promise<Profile> {
        try {
            const profileWithoutFavArtists = await this.profileDao.getProfileData(userId);
            const favoriteArtists = await this.profileDao.getFavoriteArtistsByUserId(userId);
            const result = { ...profileWithoutFavArtists, favArtist: favoriteArtists.artists }

            return result;
        } catch (error) {
            throw error;
        }
    }

    async registerFavoriteArtist(userId: string, artistId: string, artistName: string): Promise<boolean> {
        const favArtists = await this.profileDao.getFavoriteArtistsByUserId(userId);
        const count = favArtists.artists.length;

        if (count > 10) {
            throw new Error('The number of favorite artists exceeds 10');
        }

        if (count === 10) {
            throw new Error('The number of favorite artists is already 10');
        }

        try {
            const result = await this.profileDao.registerFavoriteArtist(userId, artistId, artistName);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteFavoriteArtist(userId: string, artistId: string ): Promise<boolean> {
        try {
            const result = await this.profileDao.deleteFavoriteArtist(userId, artistId);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getArticlesByUser(userId: string, prevcursor: string | null, latest: boolean | null
    ): Promise<{
        articlemetaData: Article[];
        cursor: string | null;
        latestcursor: string | null;
    }> {
    let metadata;[]
    let cursor: string | null = null;
    let latestcursor: string | null = null;
    try {
    if (prevcursor == null) {
      const result = await this.profileDao.getInitialArticlesByUserId(userId);
      if (result.articles == null) {
        throw GetArticleError;
      }
        metadata = result.articles;
        cursor = metadata.length > 0 ? metadata[metadata.length - 1].created_at : null;
        latestcursor = metadata.length > 0 ? metadata[0].created_at : null;
    } else if (latest == false) {
        const result = await this.profileDao.getOlderArticlesByUserId(userId, prevcursor);
        metadata = result.articles;
        cursor = metadata.length > 0
        ? metadata[metadata.length - 1].created_at
        : prevcursor;
        if (result.err != null) {
        throw result.err;
        }
    } else {
        const result = await this.profileDao.getNewerArticlesByUserId(userId, prevcursor);
        metadata = result.articles;
        latestcursor = metadata.length > 0 ? metadata[0].created_at : null;
    }
    } catch (error) {
      throw GetArticleError;
    }

  try {
    const userProfile = await this.getProfile(userId);
    const articlemetaData: Article[] = await Promise.all(
      metadata.map(async (Data) => {

        return {
          ArticleID: Data.article_id,
          Title: Data.title,
          ThumbnailUrl: Data.thumbnail_url,
          userID: userProfile.profileId,
          user: userProfile.userName,
          userAvatarUrl: userProfile.iconImageUrl,
          Info1: Data.info_1,
          Info2: Data.info_2,
          Type: Data.type,
          createdAt: Data.created_at,
        };
      }),
    );

    return { articlemetaData, cursor, latestcursor };
  } catch (error) {
    console.error(error);
    return { articlemetaData: [], cursor, latestcursor };
  }
    }

    async existProfileId(profileId: string): Promise<boolean> {
        try {
            const result = await this.profileDao.existProfileId(profileId);
            return result;
        } catch (error) {
            throw error;
        }
    }

}
