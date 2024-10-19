// イメージとしてはdaoではsupabaseのスキーマを使っているが、DBの都合上必須としたいデータを必須とできていない
// したがってhandler。applicationで用いるのはこのファイルのスキーマとして、必須paramsを担保する

import { Artist } from "../supabase_apis/model/artists";

import { Json } from "./supabasetypes";


export type CUArticleDataParams = {
    user_id: string;
    thumbnail_url: string;
    type: string;
    title: string;
    info_1: string | null;
    info_2: string | null;
    body: string;
    playlist_id?: number | null;
}

export type Article = {
    articleID: number;
    title: string;
    thumbnailUrl: string;
    userID: string;
    info1: string | null;
    info2: string | null;
    type: string;
    createdAt: string;
    likes: number;
    view: number;
};

export type ArticleInteg = {
    article: Article;
    user: profileSummary;
}

export type ArticleAdditionalData = {
    body: Json;
    playlist_id: number | null;
    likes: number;
    view: number;
}

export type CProfileDataParams = {
    icon_image_url: string;
    user_name: string;
    profile_id: string;
    bio: string;
    is_private: boolean;
}

export type UProfileDataParams = {
    icon_image_url?: string;
    user_name?: string;
    profile_id?: string;
    bio?: string;
    is_private?: boolean;
    user_id: string;
}

export type Profile = {
    bio: string;
    follow: number;
    followed: number;
    iconImageUrl: string;
    profileId: string;
    userId: string;
    userName: string;
    favArtists: Artist[];
}

export type Post = {
    body: string;
    createdAt: string;
    entryId: number;
    imageUrl: string[];
    likes: number;
    userId: string;
    view: number;
}

type profileSummary = {
    userAvatarUrl: string;
    userName: string;
    userId: string;
}

type likeStatus = {
    status: boolean;
}

export type PostInteg = {
    post: Post;
    user: profileSummary;
    like: likeStatus;
}

export type CUPostDataParams = {
    body: string;
    image_url: string[];
    user_id: string;
}

export type Reply = {
    body: string;
    createdAt: string;
    entryId: number;
    imageUrl: string[];
    likes: number;
    parentId: number;
    userId: string;
    view: number;
}

export type ReplyInteg = {
    reply: Reply;
    user: profileSummary;
    like: likeStatus;
}

export type CUReplyDataParams = {
    body: string;
    image_url: string[];
    user_id: string;
    parent_id: number;
}
