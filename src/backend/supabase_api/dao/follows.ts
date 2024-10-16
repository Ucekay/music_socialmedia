export interface FollowRepository {
    existFollows(followedId: string, userId: string): Promise<boolean>;
    insertFollow(followedId: string, userId: string): Promise<boolean>;
    deleteFollow(followedId: string, userId: string): Promise<boolean>;
}

export class FollowDao implements FollowRepository {
    constructor(private supabase: any) { }
    private tableNameFollows = 'follows';

    async existFollows(followedId: string, userId: string): Promise<boolean> {
        const { data, error } = await this.supabase.from(this.tableNameFollows).select('id').eq('follow_id', followedId).eq('user_id', userId);
        if (error) {
            throw error;
        }
        return data ? true : false;
    }

    async insertFollow(followedId: string, userId: string): Promise<boolean> {
        const { error } = await this.supabase.from(this.tableNameFollows).insert([{ follow_id: followedId, user_id: userId }]);
        if (error) {
            throw error;
        }
        return true;
    }

    async deleteFollow(followedId: string, userId: string): Promise<boolean> {
        const { error } = await this.supabase.from(this.tableNameFollows).delete().eq('follow_id', followedId).eq('user_id', userId);
        if (error) {
            throw error;
        }
        return true;
    }
}