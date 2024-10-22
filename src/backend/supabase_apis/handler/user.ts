import { ProfileApplication } from '../application/user';
import { UserDao } from '../dao/user';

import type { Profile, ProfileMeta, UProfileDataParams } from '../model/user';

const userDao = new UserDao();
const userApplication = new ProfileApplication(userDao);

export const GetUserProfile = async (userId: string): Promise<Profile> => {
  const profile = await userApplication.getProfile(userId);
  return profile;
};

export const UpdateUserProfile = async (
  profileData: UProfileDataParams,
): Promise<boolean | string> => {
  const result = await userApplication.updateProfile(profileData);
  return result;
};

export const getFollowers = async (userId: string): Promise<ProfileMeta[]> => {
  const followers = await userApplication.getFollowersByUserId(userId);
  return followers;
};

export const getFollowings = async (userId: string): Promise<ProfileMeta[]> => {
  const followings = await userApplication.getFollowingsByUserId(userId);
  return followings;
};
