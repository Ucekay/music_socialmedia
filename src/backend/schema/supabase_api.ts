export type ArticleData = {
    user_id: string;
    thumbnail_url: string;
    type: string;
    title: string;
    info_1: string | null;
    info_2: string | null;
    body: string;
    playlist_id?: number | null;
}

export type ArticleMetaData = {
    thumbnail_url: string;
    type: string;
    title: string;
    info_1: string | null;
    info_2: string | null;
    user_id?: string;
}