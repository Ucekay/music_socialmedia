import { InternalError } from '../../schema/error';
import { checkAuth } from '../dbdriver/checkAuth';

import type { FollowRepository } from '../dao/follows';

export interface IFollowApplication {
  insertFollow(followedId: string): Promise<boolean>;
  deleteFollow(followedId: string): Promise<boolean>;
}
export class FollowApplication implements IFollowApplication {
  constructor(private followDao: FollowRepository) {}

  async insertFollow(followedId: string): Promise<boolean> {
    try {
      const userId = await checkAuth();
      const exist = await this.followDao.existFollows(followedId, userId);
      if (exist) {
        return false;
      }
      return await this.followDao.insertFollow(followedId, userId);
    } catch (error) {
      throw InternalError;
    }
  }

  async deleteFollow(followedId: string): Promise<boolean> {
    try {
      const userId = await checkAuth();
      return await this.followDao.deleteFollow(followedId, userId);
    } catch (error) {
      throw InternalError;
    }
  }
}
