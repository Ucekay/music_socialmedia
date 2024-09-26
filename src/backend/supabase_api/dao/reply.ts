import type { Database } from "../../schema/supabasetypes"

export type Reply = Database['public']['Tables']['reply']['Row'];

export type CreateReplyParams = Omit<Reply, 'entry_id' | 'likes' | 'view' | 'created_at'>;

export interface ReplyRepository {
    createReply(createData: CreateReplyParams): Promise<number>;
    deleteReply(entryId: number, userId: string): Promise<boolean>;
    getReply(entryId: number): Promise<Reply>;
    getInitialReplies(parentId: number): Promise<{replies: Reply[]} >;
    getOlderReplies(parentId: number, cursor: string): Promise<{ replies: Reply[] | null }>;
    getLikeStatus(entryId: number, userId: string): Promise<boolean>;
}

export class ReplyDao implements ReplyRepository {
    private readonly tableName: string = 'reply';
    private readonly tableNameLikes: string = 'reply_likes';
    private readonly db: any;

    constructor(db: any) {
        this.db = db;
    }

    public async createReply(createData: CreateReplyParams): Promise<number> {
        try {
            const { data: result, error } = await this.db
                .from(this.tableName)
                .insert({ ...createData })
                .select('entry_id');

            if (error) {
                throw new Error('データの挿入エラー: ' + error.message);
            }

            if (result === null || result.length !== 1) {
                throw new Error('データの挿入エラー');
            }

            return result[0].entry_id;
        } catch (error) {
            console.error('データの挿入中にエラーが発生しました:', error);
            throw error;
        }
    }

    public async deleteReply(replyId: number, userId: string): Promise<boolean> {
        try {
            const { error } = await this.db
                .from(this.tableName)
                .delete()
                .match({ entry_id: replyId, user_id: userId });

            if (error) {
                throw new Error('データの削除エラー: ' + error.message);
            }

            return true;
        } catch (error) {
            console.error('データの削除中にエラーが発生しました:', error);
            throw error;
        }
    }

    public async getReply(replyId: number): Promise<Reply> {
        try {
            const { data: result, error } = await this.db
                .from(this.tableName)
                .select('*')
                .eq('entry_id', replyId);

            if (error) {
                throw new Error('データの取得エラー: ' + error.message);
            }

            if (result === null || result.length !== 1) {
                throw new Error('データの取得エラー');
            }

            return result[0];
        } catch (error) {
            console.error('データの取得中にエラーが発生しました:', error);
            throw error;
        }
    }

    public async getInitialReplies(parentId: number): Promise<{ replies: Reply[] }> {
        try {
            const { data: result, error } = await this.db
                .from(this.tableName)
                .select('*')
                .eq('parent_id', parentId)
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) {
                console.error('Error fetching more posts:', error);
                throw new Error('データの取得エラー: ' + error.message);
            }

            return { replies: result };
        } catch (error) {
            console.error('データの取得中にエラーが発生しました:', error);
            throw error;
        }
    }

    public async getOlderReplies(parentId: number, cursor: string): Promise<{ replies: Reply[] | null }> {
        try {
            const { data: result, error } = await this.db
                .from(this.tableName)
                .select('*')
                .eq('parent_id', parentId)
                .lt('created_at', cursor)
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) {
                console.error('Error fetching more posts:', error);
                throw new Error('データの取得エラー: ' + error.message);
            }

            return { replies: result };
        } catch (error) {
            console.error('データの取得中にエラーが発生しました:', error);
            throw error;
        }
    }

    public async getLikeStatus(entryId: number, userId: string): Promise<boolean> {
        try {
            const { count, error } = await this.db
            .from(this.tableNameLikes)
            .select('*', { count: 'exact' })
            .match({ entry_id: entryId, user_id: userId });

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
            console.error('データの取得中にエラーが発生しました:', error);
            throw error;
        }
    }
}
