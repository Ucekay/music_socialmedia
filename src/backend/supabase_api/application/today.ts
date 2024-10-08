import { TodayDataParams, TodayInteg } from "../../schema/supabase_api";
import { TodayRepository } from "../dao/today";
import { GetTodayError, GetUserError, InternalError } from "../../schema/error";
import { UserRepository } from "../dao/user";
import { initialCalculations } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";
import { initializeSensor } from "react-native-reanimated/lib/typescript/reanimated2/core";

export interface InsertTodayApplication {
    createToday(todayData: TodayDataParams): Promise<boolean>;
    deleteToday(todayId: number, userId: string): Promise<boolean>;
    getTodays(prevcursor: string | null, latest: boolean | null,
    ): Promise<{
        todays: TodayInteg[];
        cursor: string | null;
        latestcursor: string | null;
    }>;
    getToday(todayId: number): Promise<TodayInteg>;
}

export class TodayApplication implements InsertTodayApplication {
    private todayDao: TodayRepository;
    private userDao: UserRepository;
    constructor(todayRepository: TodayRepository, userRepository: UserRepository) {
        this.todayDao = todayRepository;
        this.userDao = userRepository;
    }

    async createToday(todayData: TodayDataParams): Promise<boolean> {
        try {
            const data = {
                content: todayData.content,
                music_id: todayData.music_id,
                user_id: todayData.user_id,
            };
            const todayId = await this.todayDao.createToday(data);
            if (todayId === null) {
                throw InternalError
            }

            return true;
        } catch (error) {
            console.error('データの挿入中にエラーが発生しました', error);
            throw error;
        }
    }

    async deleteToday(todayId: number, userId: string): Promise<boolean> {
        try {
            const result = await this.todayDao.deleteToday(todayId, userId);
            if (!result) {
                throw InternalError
            }

            return true;
        } catch (error) {
            console.error('データの削除中にエラーが発生しました', error)
            throw error;
        }
    }

    async getTodays(
        prevcursor: string | null,
        latest: boolean | null,
    ): Promise<{
        todays: TodayInteg[];
        cursor: string | null;
        latestcursor: string | null;
    }> {
        let cursor: string | null = null;
        let latestcursor: string | null = null;
        let result;

        try {
            if (prevcursor == null) {
                result = await this.todayDao.getInitialToday();
                if (result.todays == null) {
                    throw GetTodayError;
                }

                cursor = result.todays.length > 0 ? result.todays[result.todays.length - 1].created_at : null;
                latestcursor  = result.todays.length > 0 ? result.todays[0].created_at : null;
            } else if (latest === false) {
                result = await this.todayDao.getOlderTodays(prevcursor);
                if (result.todays == null) {
                    throw GetTodayError;
                }
                cursor = result.todays.length > 0 ? result.todays[result.todays.length - 1].created_at : null;
            } else {
                result = await this.todayDao.getNewerTodays(prevcursor);
                if (result.todays == null) {
                    throw GetTodayError;
                }
                latestcursor = result.todays.length > 0 ? result.todays[0].created_at : null;
            }
        } catch (error) {
            throw GetTodayError;
        }

        try {
            const todays: TodayInteg[] = await Promise.all(
                result.todays.map(async (today) => {
                    const data = await this.userDao.getUserProfile(today.user_id);
                    const like = await this.todayDao.getTodayLikes(today.todays_song_id, today.user_id);

                    return {
                        today: {
                            todayId: today.todays_song_id,
                            userId: today.user_id,
                            content: today.content,
                            createdAt: today.created_at,
                            musicId: today.music_id,
                            likes: today.likes,
                            views: today.views,
                            deletedAt: today.deleted_at
                        },
                        user: {
                            userId: data.ProfileID,
                            userName: data.UserName,
                            userAvatarUrl: data.IconImageUrl
                        },
                        like: {
                            status: like,
                        },
                    };
                }),
            );

            return {
                todays: todays,
                cursor: cursor,
                latestcursor: latestcursor,
            };
        } catch (error) {
            throw GetTodayError;
        }
    }

    async getToday(todayId: number): Promise<TodayInteg> {
        try {
            const today = await this.todayDao.getToday(todayId);
            if (today == null) {
                throw GetTodayError;
            }
            
            const user = await this.userDao.getUserProfile(today.user_id);
            if (user == null) {
                throw GetTodayError;
            }

            const like = await this.todayDao.getTodayLikes(today.todays_song_id, today.user_id);
            if (like == null) {
                throw GetTodayError;
            }

            return {
                today: {
                    todayId: today.todays_song_id,
                    userId: today.user_id,
                    content: today.content,
                    createdAt: today.created_at,
                    deletedAt: today.deleted_at,
                    musicId: today.music_id,
                    likes: today.likes,
                    views: today.views,
                },
                user: {
                    userId: user.ProfileID,
                    userName: user.UserName,
                    userAvatarUrl: user.IconImageUrl,
                },
                like: {
                    status: like,
                },
            };
        } catch (error) {
            throw GetTodayError;
        }
    }

}