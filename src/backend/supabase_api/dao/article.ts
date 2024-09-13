import { GetGeneralDetailRes, CreateGeneralParams, UpdateGeneralParams } from "../dbdriver/General";
import { CreateReviewParams, GetReviewDetailRes, UpdateReviewParams } from "../dbdriver/Review";
import { CreateLiveReportParams, GetLiveReportDetailRes, UpdateLiveReportParams } from "../dbdriver/LiveReport";
import { CreatePlaylistArticleParams, GetPlaylistArticleDetailRes, UpdatePlaylistArticleParams } from "../dbdriver/PlaylistArticle";
import { CreateArticleParams, GetArticleRes } from "../dbdriver/Article";
import { supabase } from "../../lib/supabase";


export interface ArticleRepsitory {
	createArticleData(articleData: CreateArticleParams): Promise<number>;
	deleteArticleData(articleId: number, userId: string): Promise<boolean>;
	updateArticleData(articleId: number, updateData: Partial<CreateArticleParams>): Promise<boolean>;
	getInitialData(): Promise<{ posts: GetArticleRes[] | null; }>
	getOlderData(cursor: string): Promise<{ posts: GetArticleRes[], err: Error | null }>
	getNewerData(latestCursor: string): Promise<{ posts: GetArticleRes[], err: Error | null }>
	
	createGeneralData(generalData: CreateGeneralParams ): Promise<boolean>;
	deleteGeneralData(articleId: number, userId: string): Promise<boolean>;
	updateGeneralData(articleId: number, updateData: Partial<UpdateGeneralParams>): Promise<boolean>;
	getGeneralData(articleId: number): Promise< GetGeneralDetailRes | null >;

	createReviewData(reviewData: CreateReviewParams): Promise<boolean>;
	deleteReviewData(articleId: number, userId: string): Promise<boolean>;
	updateReviewData(articleId: number, updateData: Partial<UpdateReviewParams>): Promise<boolean>;
	getReviewData(articleId: number): Promise<GetReviewDetailRes | null>;
	
	createLiveReportData(liveReportData: CreateLiveReportParams): Promise<boolean>;
	deleteLiveReportData(articleId: number, userId: string): Promise<boolean>;
	updateLiveReportData(articleId: number, updateData: Partial<UpdateLiveReportParams>): Promise<boolean>;
	getLiveReportData(articleId: number): Promise<GetLiveReportDetailRes | null>;

	createPlaylistArticleData(playlistArticleData: CreatePlaylistArticleParams): Promise<boolean>;
	deletePlaylistArticleData(articleId: number, userId: string): Promise<boolean>;
	updatePlaylistArticleData(articleId: number, updateData: Partial<UpdatePlaylistArticleParams>): Promise<boolean>;
	getPlaylistArticleData(articleId: number): Promise<GetPlaylistArticleDetailRes | null>;

	getLikeStatus(articleId: number, userId: string): Promise<boolean>
	
	getUserProfile(userId: string): Promise<{
	IconImageUrl: string;
	ProfileID: string;
	UserName: string;
	}>
}

export class ArticleDao implements ArticleRepsitory {
	private readonly tableNameArticle: string = 'article';
	private readonly tableNameArticleLikes: string = 'article_likes';
	private readonly tableNameGeneral: string = 'general';
	private readonly tableNameReview: string = 'review';
	private readonly tableNameLiveReport: string = 'live_report';
	private readonly tableNamePlaylistArticle: string = 'playlist_article';

	// データ挿入関数
	public async createArticleData(
		articleData: CreateArticleParams
	): Promise<number> {
		try {
			const { data: result, error } = await supabase
				.from(this.tableNameArticle)
				.insert({ ...articleData })
				.select('article_id');

			if (error) {
				throw new Error('データの挿入エラー: ' + error.message);
			}

			if (result === null || result.length !== 1) {
				throw new Error('データの挿入エラー');
			}

			return result[0].article_id;
		} catch (error) {
			console.error('データの挿入中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ削除関数
	public async deleteArticleData(
		articleId: number,
		userId: string
	): Promise<boolean> {
		try {
			const { error } = await supabase
				.from(this.tableNameArticle)
				.delete()
				.match({ article_id: articleId, user_id: userId });

			if (error) {
				throw new Error('データの削除エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの削除中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ更新関数
	public async updateArticleData(
		articleId: number,
		updateData: Partial<CreateArticleParams>
	): Promise<boolean> {
		try {
			const { error } = await supabase
				.from(this.tableNameArticle)
				.update({ ...updateData })
				.match({ article_id: articleId });

			if (error) {
				throw new Error('データの更新エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの更新中にエラーが発生しました:', error);
			throw error;
		}
	}

	  // データ取得関数 (最初)
  public async getInitialData(): Promise<{
    posts: GetArticleRes[];
  }> {
    try {
      const LIMIT = 10;
      const { data: posts, error } = await supabase
        .from(this.tableNameArticle)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(LIMIT);

      if (error) {
        throw new Error('データの取得エラー: ' + error.message);
      }

      return { posts };
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      throw error;
    }
  }  

	public async getOlderData(
    cursor: string
  ): Promise<{ posts: GetArticleRes[], err: Error | null }> {
      const LIMIT = 10;
      const { data: nextArticles, error } = await supabase
        .from(this.tableNameArticle)
        .select('*')
        .order('created_at', { ascending: false })
        .lt('created_at', cursor)
        .limit(LIMIT);

      if (error) {
        console.error('Error fetching more posts:', error);
        return { posts: [], err: Error(error.message) };
	  }
		
      return { posts: nextArticles, err: null };
	}
	
	public async getNewerData(
		latestCursor: string
  ): Promise<{ posts: GetArticleRes[], err: Error | null }> {
      const LIMIT = 10;
      const { data: nextArticles, error } = await supabase
        .from(this.tableNameArticle)
        .select('*')
        .order('created_at', { ascending: false })
        .gt('created_at', latestCursor)
        .limit(LIMIT);

      if (error) {
        console.error('Error fetching more posts:', error);
        return { posts: [], err: Error(error.message) };
      }

      return { posts: nextArticles, err: null };
  }

	// general
	// データ挿入関数
	public async createGeneralData(
		generalData: CreateGeneralParams | null,
	): Promise<boolean> {
		try {
			if (generalData === null) {
				return true;
			}

			const { error } = await supabase
				.from(this.tableNameGeneral)
				.insert({ ...generalData });

			if (error) {
				throw new Error('データの挿入エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの挿入中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ削除関数
	public async deleteGeneralData(
		articleId: number,
		userId: string
	): Promise<boolean> {
		try {
			const { error } = await supabase
				.from(this.tableNameGeneral)
				.delete()
				.match({ article_id: articleId, user_id: userId });

			if (error) {
				throw new Error('データの削除エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの削除中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ更新関数
	public async updateGeneralData(
		articleId: number,
		updateData: Partial<UpdateGeneralParams>
	): Promise<boolean> {
		try {
			const { error } = await supabase
				.from(this.tableNameGeneral)
				.update({ ...updateData })
				.match({ article_id: articleId });

			if (error) {
				throw new Error('データの更新エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの更新中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ取得関数
	public async getGeneralData(
		articleId: number
	): Promise<GetGeneralDetailRes | null> {
		try {
			const { data, error } = await supabase
				.from(this.tableNameGeneral)
				.select('*')
				.match({ article_id: articleId });

			if (error) {
				throw new Error('データの取得エラー: ' + error.message);
			}

			if (data === null || data.length !== 1) {
				return null;
			}

			return data[0];
		} catch (error) {
			console.error('データの取得中にエラーが発生しました:', error);
			throw error;
		}
	}

	// review
	// データ挿入関数
	public async createReviewData(
		reviewData: CreateReviewParams
	): Promise<boolean> {
		try {
			if (reviewData === null) {
				return true;
			}

			const { error } = await supabase
				.from(this.tableNameReview)
				.insert({ ...reviewData });

			if (error) {
				throw new Error('データの挿入エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの挿入中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ削除関数
	public async deleteReviewData(
		articleId: number,
		userId: string
	): Promise<boolean> {
		try {
			const { error } = await supabase
				.from(this.tableNameReview)
				.delete()
				.match({ article_id: articleId, user_id: userId });

			if (error) {
				throw new Error('データの削除エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの削除中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ更新関数
	public async updateReviewData(
		articleId: number,
		updateData: Partial<UpdateReviewParams>
	): Promise<boolean> {
		try {
			const { error } = await supabase
				.from(this.tableNameReview)
				.update({ ...updateData })
				.match({ article_id: articleId });

			if (error) {
				throw new Error('データの更新エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの更新中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ取得関数
	public async getReviewData(
		articleId: number
	): Promise<GetReviewDetailRes | null> {
		try {
			const { data, error } = await supabase
				.from(this.tableNameReview)
				.select('*')
				.match({ article_id: articleId });

			if (error) {
				throw new Error('データの取得エラー: ' + error.message);
			}

			if (data === null || data.length !== 1) {
				return null;
			}

			return data[0];
		} catch (error) {
			console.error('データの取得中にエラーが発生しました:', error);
			throw error;
		}
	}

	// live_report
	// データ挿入関数
	public async createLiveReportData(
		liveReportData: CreateLiveReportParams
	): Promise<boolean> {
		try {
			if (liveReportData === null) {
				return true;
			}

			const { error } = await supabase
				.from(this.tableNameLiveReport)
				.insert({ ...liveReportData });

			if (error) {
				throw new Error('データの挿入エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの挿入中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ削除関数
	public async deleteLiveReportData(
		articleId: number,
		userId: string
	): Promise<boolean> {
		try {
			const { error } = await supabase
				.from(this.tableNameLiveReport)
				.delete()
				.match({ article_id: articleId, user_id: userId });

			if (error) {
				throw new Error('データの削除エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの削除中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ更新関数
	public async updateLiveReportData(
		articleId: number,
		updateData: Partial<UpdateLiveReportParams>
	): Promise<boolean> {
		try {
			const { error } = await supabase
				.from(this.tableNameLiveReport)
				.update({ ...updateData })
				.match({ article_id: articleId });

			if (error) {
				throw new Error('データの更新エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの更新中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ取得関数
	public async getLiveReportData(
		articleId: number
	): Promise<GetLiveReportDetailRes | null> {
		try {
			const { data, error } = await supabase
				.from(this.tableNameLiveReport)
				.select('*')
				.match({ article_id: articleId });

			if (error) {
				throw new Error('データの取得エラー: ' + error.message);
			}

			if (data === null || data.length !== 1) {
				return null;
			}

			return data[0];
		} catch (error) {
			console.error('データの取得中にエラーが発生しました:', error);
			throw error;
		}
	}

	// playlist_article
	// データ挿入関数
	public async createPlaylistArticleData(
		playlistArticleData: CreatePlaylistArticleParams
	): Promise<boolean> {
		try {
			if (playlistArticleData === null) {
				return true;
			}

			const { error } = await supabase
				.from(this.tableNamePlaylistArticle)
				.insert({ ...playlistArticleData });

			if (error) {
				throw new Error('データの挿入エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの挿入中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ削除関数
	public async deletePlaylistArticleData(
		articleId: number,
		userId: string
	): Promise<boolean> {
		try {
			const { error } = await supabase
				.from(this.tableNamePlaylistArticle)
				.delete()
				.match({ article_id: articleId , user_id: userId });

			if (error) {
				throw new Error('データの削除エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの削除中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ更新関数
	public async updatePlaylistArticleData(
		articleId: number,
		updateData: Partial<UpdatePlaylistArticleParams>
	): Promise<boolean> {
		try {
			const { error } = await supabase
				.from(this.tableNamePlaylistArticle)
				.update({ ...updateData })
				.match({ article_id: articleId });

			if (error) {
				throw new Error('データの更新エラー: ' + error.message);
			}

			return true;
		} catch (error) {
			console.error('データの更新中にエラーが発生しました:', error);
			throw error;
		}
	}

	// データ取得関数
	public async getPlaylistArticleData(
		articleId: number
	): Promise<GetPlaylistArticleDetailRes | null> {
		try {
			const { data, error } = await supabase
				.from(this.tableNamePlaylistArticle)
				.select('*')
				.match({ article_id: articleId });

			if (error) {
				throw new Error('データの取得エラー: ' + error.message);
			}

			if (data === null || data.length !== 1) {
				return null;
			}

			return data[0];
		} catch (error) {
			console.error('データの取得中にエラーが発生しました:', error);
			throw error;
		}
	}

	public async getLikeStatus(
    articleId: number,
    userId: string
  ): Promise<boolean> {
    try {
      const { count, error } = await supabase
		.from(this.tableNameArticleLikes)
        .select('id', { count: 'exact' })
        .match({ article_id: articleId, user_id: userId });

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
	
	public async getUserProfile(userId: string): Promise<{
		IconImageUrl: string;
		ProfileID: string;
		UserName: string;
	}> {
		try {
    const { data, error } = await supabase // UserIDによる絞り込みを削除
      .from('users') // テーブル名を修正
      .select('icon_image_url, user_name, profile_id')
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new Error('データの取得エラー: ' + error.message);
    }

    return {IconImageUrl: data.icon_image_url, ProfileID: data.profile_id, UserName: data.user_name};
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
    throw error;
  }

}


