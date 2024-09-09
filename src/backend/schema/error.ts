class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = this.constructor.name;
  }
}

// 入力が不正な場合のエラー
export const BadRequestError = new CustomError('入力が不正です', 400);

// 不明なエラー
export const InternalError = new CustomError('サーバーエラーが発生しました', 500);

// 挿入系エラー
export const CreateArticleError = new CustomError('記事の作成に失敗しました', 1000);
export const CreatePostError = new CustomError('投稿の作成に失敗しました', 1001);