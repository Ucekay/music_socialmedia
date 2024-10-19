import { ProfileApplication } from "../application/user";
import { UserDao } from "../dao/user";
import { Profile, ProfileMeta, UProfileDataParams } from "../model/user";

const userDao = new UserDao();
const userApplication = new ProfileApplication(userDao);

export const GetUserProfile = async (userId: string): Promise<Profile> => {
    try {
        const profile = await userApplication.getProfile(userId);
        return profile;
    } catch (error) {
        throw error;
    }
}

export const UpdateUserProfile = async (profileData: UProfileDataParams): Promise<boolean | string> => {
    try {
        const result = await userApplication.updateProfile(profileData);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getFollowers = async (userId: string): Promise<ProfileMeta[]> => {
    try {
        const followers = await userApplication.getFollowersByUserId(userId);
        return followers
    } catch (error) {
        throw error;
    }
}

export const getFollowings = async (userId: string): Promise<ProfileMeta[]> => {
    try {
        const followings = await userApplication.getFollowingsByUserId(userId);
        return followings
    } catch (error) {
        throw error;
    }
}
