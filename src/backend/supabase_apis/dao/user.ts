import { supabase } from '../../lib/supabase';

import type { Database } from '../../schema/schema';
import type {
  CProfileDataParams,
  Profile,
  UProfileDataParams,
} from '../../schema/supabase_api';
import type { Artist } from '../model/artists';
import type { ProfileMeta } from '../model/user';

export type User = Database['public']['Tables']['users']['Row'];
export type CreateUserParams = Omit<User, 'user_id' | 'created_at'>;
export type UpdateUserParams = Partial<CreateUserParams> & { user_id: string };

export interface UserRepository {
  createUserProfile(profileData: CProfileDataParams): Promise<string>;
  updateUserProfile(profileData: UProfileDataParams): Promise<boolean>;
  deleteUserProfile(userId: string): Promise<boolean>;
  getUserProfile(userId: string): Promise<Profile>;

  existProfileId(profileId: string): Promise<boolean>;

  getFavArtistsByUserId(userId: string): Promise<Artist[]>;
  registerFavArtist(
    userId: string,
    artistId: string,
    artistName: string,
  ): Promise<boolean>;
  deleteFavArtist(userId: string, artistId: string): Promise<boolean>;

  getFollowersByUserId(userId: string): Promise<ProfileMeta[]>;
  getFollowingsByUserId(userId: string): Promise<ProfileMeta[]>;
}

export class UserDao implements UserRepository {
  private readonly tableNameUser: string = 'users';
  private readonly tableNameUsersArtists: string = 'users_artists';

  public async createUserProfile(
    profileData: CProfileDataParams,
  ): Promise<string> {
    try {
      const params: CreateUserParams = profileData as CreateUserParams;
      const { data: result, error } = await supabase
        .from(this.tableNameUser)
        .insert({ ...params })
        .select('profile_id');
      if (error) {
        throw new Error(`データの挿入エラー: ${error.message}`);
      }
      if (result === null || result.length !== 1) {
        throw new Error('データの挿入エラー');
      }
      return result[0].profile_id;
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async updateUserProfile(
    profileData: UProfileDataParams,
  ): Promise<boolean> {
    try {
      const params: UpdateUserParams = profileData as UpdateUserParams;
      const { error } = await supabase
        .from(this.tableNameUser)
        .update({ ...params })
        .match({ user_id: profileData.user_id });
      if (error) {
        throw new Error(`データの更新エラー: ${error.message}`);
      }
      return true;
    } catch (error) {
      console.error('データの更新中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async deleteUserProfile(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.tableNameUser)
        .update({ deleted_at: new Date().toISOString() })
        .match({ user_id: userId });
      if (error) {
        throw new Error(`データの削除エラー: ${error.message}`);
      }
      return true;
    } catch (error) {
      console.error('データの削除中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async existProfileId(profileId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from(this.tableNameUser)
        .select('profile_id')
        .eq('profile_id', profileId)
        .single();
      if (error) {
        throw new Error(`データの取得エラー: ${error.message}`);
      }
      return data !== null;
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async getUserProfile(userId: string): Promise<Profile> {
    try {
      const { data, error } = await supabase // UserIDによる絞り込みを削除
        .from(this.tableNameUser)
        .select(
          'user_id, user_name, icon_image_url, profile_id, bio, follow, followed',
        )
        .eq('user_id', userId)
        .single();

      console.log(userId);

      if (error) {
        throw new Error(`データの取得エラー: ${error.message}`);
      }

      return {
        userName: data.user_name,
        userId: data.user_id,
        iconImageUrl: data.icon_image_url,
        profileId: data.profile_id,
        bio: data.bio,
        follow: data.follow,
        followed: data.followed,
        favArtists: [],
      };
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async getFavArtistsByUserId(userId: string): Promise<Artist[]> {
    try {
      const { data, error } = await supabase
        .from('users_artists')
        .select(`artist_id,
                    artists ( artist_name, musickit_id )`)
        .eq('user_id', userId);

      if (error) {
        throw new Error(`データの取得エラー: ${error.message}`);
      }

      const artists = data.map((row: any) => {
        return {
          artistId: row.artist_id,
          artistName: row.artists.artist_name,
          musickitId: row.artists.musickit_id,
        };
      });

      return artists;
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async registerFavArtist(
    userId: string,
    artistId: string,
    artistName: string,
  ): Promise<boolean> {
    try {
      const { error } = await supabase.from(this.tableNameUsersArtists).insert({
        user_id: userId,
        artist_id: artistId,
        artist_name: artistName,
      });
      if (error) {
        throw new Error(`データの挿入エラー: ${error.message}`);
      }
      return true;
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async deleteFavArtist(
    userId: string,
    artistId: string,
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users_artists')
        .delete()
        .match({ user_id: userId, artist_id: artistId });
      if (error) {
        throw new Error(`データの削除エラー: ${error.message}`);
      }
      return true;
    } catch (error) {
      console.error('データの削除中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async getFollowersByUserId(userId: string): Promise<ProfileMeta[]> {
    try {
      const { data, error } = await supabase
        .from('follows')
        .select(
          'follower_id, users!follower_id(user_name, icon_image_url, profile_id)',
        )
        .eq('followed_id', userId);
      if (error) {
        throw new Error(`データの取得エラー: ${error.message}`);
      }

      const followers = data.map((row: any) => {
        return {
          userId: row.follower_id,
          userName: row.users.user_name,
          iconImageUrl: row.users.icon_image_url,
          profileId: row.users.profile_id,
        };
      });

      console.log(followers);

      return followers;
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async getFollowingsByUserId(userId: string): Promise<ProfileMeta[]> {
    try {
      const { data, error } = await supabase
        .from('follows')
        .select(
          'followed_id, users!followed_id(user_name, icon_image_url, profile_id)',
        )
        .eq('follower_id', userId);
      if (error) {
        throw new Error(`データの取得エラー: ${error.message}`);
      }

      const followees = data.map((row: any) => {
        return {
          userId: row.followed_id,
          userName: row.users.user_name,
          iconImageUrl: row.users.icon_image_url,
          profileId: row.users.profile_id,
        };
      });
      return followees;
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }
}
