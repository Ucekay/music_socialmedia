import { supabase } from '../../lib/supabase';
import type { Database } from '../../schema/schema';
import type { CArtistParams } from '../model/artists';

export type Artist = Database['public']['Tables']['artists']['Row'];

export interface ArtistRepository {
  registerArtist(artistData: CArtistParams): Promise<string>;
  searchArtist(serachParam: string): Promise<Artist[]>;
  existArtist(artistName: string, musickitId: string | null): Promise<boolean>;
}

export class ArtistDao implements ArtistRepository {
  private readonly tableName: string = 'artists';

  public async registerArtist(artistData: CArtistParams): Promise<string> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert({ ...artistData })
        .select('artist_id');

      if (error) {
        throw new Error('データの挿入エラー: ' + error.message);
      }

      if (data === null || data.length !== 1) {
        throw new Error('データの挿入エラー');
      }

      return data[0].artist_id;
    } catch (error) {
      console.error('データの挿入中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async searchArtist(searchParam: string): Promise<Artist[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .ilike('artist_name', `%${searchParam}%`);

      if (error) {
        throw new Error('データの取得エラー: ' + error.message);
      }

      return data;
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }

  public async existArtist(
    artistName: string,
    musickitId: string | null,
  ): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('artist_name', artistName)
        .eq('musickit_id', musickitId)
        .single();

      if (error) {
        throw new Error('データの取得エラー: ' + error.message);
      }

      if (data) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }
}
