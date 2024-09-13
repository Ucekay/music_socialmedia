// イメージとしてはdaoではsuoabaaseのスキーマをつkクァっているが、DBの都合上必須としたいデータを必須とできていない
// したがってhandler。applicationで用いるのはこのファイルのスキーマとして、必須paramsを担保する

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

export type ArticleMetaData = {
    thumbnail_url: string;
    type: string;
    title: string;
    info_1: string | null;
    info_2: string | null;
    user_id?: string;
}

export type Article = {
  ArticleID: number;
  Title: string;
  ThumbnailUrl: string;
  userID: string;
  user: string;
  userAvatarUrl: string;
  Info1: string | null;
  Info2: string | null;
  Type: string;
  createdAt: string;
};

export type ArticleAdditionalData = {
    body: Json;
    playlist_id: number | null;
    likes: number;
    view: number;
}