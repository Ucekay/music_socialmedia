import { GetArticleError } from '../../schema/error';
import type {
  Article,
  CProfileDataParams,
  Profile,
  UProfileDataParams,
} from '../../schema/supabase_api';
import type { UserRepository } from '../dao/user';
import type { ProfileMeta } from '../model/user';

export interface IProfileApplication {
  createProfile(profileData: CProfileDataParams): Promise<string>;
  updateProfile(profileData: UProfileDataParams): Promise<boolean | string>;
  getProfile(userId: string): Promise<Profile>;
  registerFavoriteArtist(
    userId: string,
    artistId: string,
    artistName: string,
  ): Promise<boolean>;
  deleteFavoriteArtist(
    userId: string,
    artistId: string,
    artistName: string,
  ): Promise<boolean>;
  getArticlesByUser(
    userId: string,
    prevcursor: string | null,
    latest: boolean | null,
  ): Promise<{
    articlemetaData: Article[];
    cursor: string | null;
    latestcursor: string | null;
  }>;
  existProfileId(profileId: string): Promise<boolean>;
  getFollowersByUserId(userId: string): Promise<ProfileMeta[]>;
  getFollowingsByUserId(userId: string): Promise<ProfileMeta[]>;
}

export class ProfileApplication implements IProfileApplication {
  private profileDao: UserRepository;
  constructor(profileRepository: UserRepository) {
    this.profileDao = profileRepository;
  }

  async createProfile(profileData: CProfileDataParams): Promise<string> {
    try {
      const exist = await this.profileDao.existProfileId(
        profileData.profile_id,
      );
      if (exist) {
        throw new Error('profile_id is invalid');
      }

      const result = await this.profileDao.createUserProfile(profileData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(
    profileData: UProfileDataParams,
  ): Promise<boolean | string> {
    if (profileData.profile_id) {
      const exist = await this.profileDao.existProfileId(
        profileData.profile_id,
      );
      if (exist) {
        throw new Error('profile_id is invalid');
      }
    }

    try {
      const result = await this.profileDao.updateUserProfile(profileData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId: string): Promise<Profile> {
    try {
      const profileWithoutFavArtists =
        await this.profileDao.getUserProfile(userId);
      const favoriteArtists =
        await this.profileDao.getFavArtistsByUserId(userId);
      const result = { ...profileWithoutFavArtists };
      result.favArtists = [...favoriteArtists];

      return result;
    } catch (error) {
      throw error;
    }
  }

  async registerFavoriteArtist(
    userId: string,
    artistId: string,
    artistName: string,
  ): Promise<boolean> {
    const favArtists = await this.profileDao.getFavArtistsByUserId(userId);
    const count = favArtists.artists.length;

    if (count > 10) {
      throw new Error('The number of favorite artists exceeds 10');
    }

    if (count === 10) {
      throw new Error('The number of favorite artists is already 10');
    }

    try {
      const result = await this.profileDao.registerFavArtist(
        userId,
        artistId,
        artistName,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteFavoriteArtist(
    userId: string,
    artistId: string,
  ): Promise<boolean> {
    try {
      const result = await this.profileDao.deleteFavoriteArtist(
        userId,
        artistId,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getArticlesByUser(
    userId: string,
    prevcursor: string | null,
    latest: boolean | null,
  ): Promise<{
    articlemetaData: Article[];
    cursor: string | null;
    latestcursor: string | null;
  }> {
    let metadata;
    [];
    let cursor: string | null = null;
    let latestcursor: string | null = null;
    try {
      if (prevcursor == null) {
        const result = await this.profileDao.getInitialArticlesByUserId(userId);
        if (result.articles == null) {
          throw GetArticleError;
        }
        metadata = result.articles;
        cursor =
          metadata.length > 0 ? metadata[metadata.length - 1].created_at : null;
        latestcursor = metadata.length > 0 ? metadata[0].created_at : null;
      } else if (latest == false) {
        const result = await this.profileDao.getOlderArticlesByUserId(
          userId,
          prevcursor,
        );
        metadata = result.articles;
        cursor =
          metadata.length > 0
            ? metadata[metadata.length - 1].created_at
            : prevcursor;
        if (result.err != null) {
          throw result.err;
        }
      } else {
        const result = await this.profileDao.getNewerArticlesByUserId(
          userId,
          prevcursor,
        );
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

  async getFollowersByUserId(userId: string): Promise<ProfileMeta[]> {
    try {
      const followers = await this.profileDao.getFollowersByUserId(userId);
      return followers;
    } catch (error) {
      throw error;
    }
  }

  async getFollowingsByUserId(userId: string): Promise<ProfileMeta[]> {
    try {
      const followings = await this.profileDao.getFollowingsByUserId(userId);
      return followings;
    } catch (error) {
      throw error;
    }
  }
}
