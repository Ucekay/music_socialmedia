import { Artist } from "./artists";

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

export type ProfileMeta = {
    userId: string;
    userName: string;
    iconImageUrl: string;
    profileId: string;
}