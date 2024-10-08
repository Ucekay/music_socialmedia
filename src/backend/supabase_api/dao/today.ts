import type { Database } from '../../schema/supabasetypes';

export type Today = Database['public']['Tables']['todays']['Row']

export type CreateTodayParams = Omit<Today, 'today_song_id' | 'likes' | 'views' | 'created_at' | 'deleted_at'>

//likesテーブルの更新は？
//getOlder, getNewerの時のcursorの返り値は？

export interface TodayRepository {
    createToday(createData: CreateTodayParams): Promise<number>;
    deleteToday(todayId: number, userId: string): Promise<boolean>;
    getToday(todayId: number): Promise<Today>;
    getInitialToday(): Promise<{ todays: Today[] }>;
    getOlderTodays(cursor: string): Promise<{ todays: Today[] | null }>;
    getNewerTodays(latestcursor: string): Promise<{ todays: Today[] | null }>;
    
    getTodayLikes(todayId: number, userId: string): Promise<boolean>;
}

export class TodayDao implements TodayRepository {
    private readonly tableName: string = 'todays';
    private readonly tableNameLikes: string = 'today_likes';
    private readonly db: any;

    constructor(db: any) {
        this.db = db;
    }

    //データ挿入関数
    public async createToday(
        createData: CreateTodayParams
    ): Promise<number> {
        try {
            const { data: result, error } = await this.db
                .from(this.tableName)
                .insert({ ...createData })
                .select('today_song_id');
            
            if (error) {
                throw new Error('データの挿入エラー: ' + error.message);
            }

            if (result === null || result.length !== 1) {
                throw new Error('データの挿入エラー');
            }

            return result[0].today_song_id;
        } catch (error) {
            console.error('データの挿入中にエラーが発生しました:', error);
            throw error;
        }
    }

    //データ削除関数
    public async deleteToday(
        todayId: number,
        userId: string
    ): Promise<boolean> {
        try { 
            const { error } = await this.db
                .from(this.tableName)
                .update({ deleted_at: new Date() })
                .match({ today_song_id: todayId, user_id: userId });
            
            if (error) {
                throw new Error('データの削除エラー: ' + error.message);
            }

            return true;
        } catch (error) {
            console.error('データの削除中にエラーが発生しました:', error);
            throw error;
        }
    }

    //データ取得関数
    //全部セレクトする必要ない
    public async getToday(
        todayId: number
    ): Promise<Today> {
        try {
            const { data, error } = await this.db
                .from(this.tableName)
                .select('*')
                .eq('today_song_id', todayId);
            
            if (error) {
                throw new Error('データの取得エラー: ' + error.message);
            }

            if (data === null || data.length !== 1) {
                throw new Error('データの取得エラー');
            }

            return data[0];
        } catch (error) {
            console.error('データの取得中にエラーが発生しました:', error)
            throw error;
        }
    }

    public async getInitialToday(): Promise<{
        todays: Today[];
    }> {
        try {
            //LIMITいくつにする？
            const LIMIT = 10;
            const { data: todays, error } = await this.db
                .from(this.tableName)
                .select('*')
                .order('created_at', { ascending: false })
                .limit(LIMIT);
            
            if (error) {
                console.error('データの取得エラー:' + error.message);
            }

            return { todays };
        } catch (error) {
            console.error('データの取得中にエラーが発生しました:', error);
            throw error;
        }
    }

    public async getOlderTodays(
        cursor: string
    ): Promise<{ todays: Today[] | null; }> {
        try {
            const LIMIT = 10;
            const { data: todays, error } = await this.db
                .from(this.tableName)
                .select('*')
                .order('created_at', { ascending: false })
                .lt('created_at', cursor)
                .limit(LIMIT);
            
            if (error) {
                console.error('Error fetching more posts:', error);
                return { todays: [] };
            }

            return { todays: todays };
        } catch (error) {
            console.error('データの取得中にエラーが発生しました:', error);
            throw error;
        }
    }


    public async getNewerTodays(
        latestcursor: string
    ): Promise<{ todays: Today[] | null; }> {
        try {
            const LIMIT = 10;
            const { data: nextTodays, error } = await this.db
                .from(this.tableName)
                .select('*')
                .order('created_at', { acending: false })
                .gt('created_at', latestcursor)
                .limit(LIMIT);
            
            if (error) {
                console.error('Error fetching more todays:', error);
                return { todays: [] };
            }

            return { todays: nextTodays };
        } catch (error) {
            console.error('データの取得中にエラーが発生しました:', error);
            throw error
        }
    }

    //データ取得関数(いいね状態)
    public async getTodayLikes(
        todayId: number,
        userId: string
    ): Promise<boolean> {
        try {
            const { count, error } = await this.db
                .from(this.tableNameLikes)
                .select('*', { count: 'exact' })
                .match({ today_song_id: todayId, user_id: userId });
            
            if (error) {
                throw new Error('データの取得エラー: ' + error.message);
            }

            if (count === 0) {
                return false;
            } else if (count === 1) {
                return true;
            } else { 
                throw new Error('データの取得エラー');
            }
        } catch (error) {
            console.error('データの取得中にエラーが発生しました:' + error);
            throw error;
        }
    }
}