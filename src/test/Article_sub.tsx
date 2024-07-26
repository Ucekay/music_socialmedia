// General.test.js
import { insertGeneral, deleteGeneral, updateGeneral, getArticle } from '../backend/components/DB_Access/Article/General'; 
import { supabase } from '../backend/lib/supabase'

// モックデータ
const mockArticle = { ArticleID: 1, Title: 'Test Article', Body: 'This is a test article.', UserID: 'testuser' };
const mockUpdateData = { Title: 'Updated Title' };

// Supabase クライアントのモック
jest.mock('../backend/lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn(), 
    delete: jest.fn(),
    update: jest.fn(),
    select: jest.fn().mockReturnThis(),
    match: jest.fn().mockReturnThis(),
    single: jest.fn(),
  }
}));

// checkAuthのモック
jest.mock('./checkAuth', () => ({
  checkAuth: jest.fn().mockResolvedValue('testuser'),
}));

describe('General functions test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should insert a new article', async () => {
    supabase.insert.mockResolvedValueOnce({ data: [mockArticle], error: null });

    const result = await insertGeneral({ Title: mockArticle.Title, Body: mockArticle.Body });

    expect(result).toBe(true);
    expect(supabase.from).toHaveBeenCalledWith('General');
    expect(supabase.insert).toHaveBeenCalledWith({ ...mockArticle, UserID: 'testuser' });
  });

  it('should handle insert error', async () => {
    const errorMessage = 'Error inserting article';
    supabase.insert.mockRejectedValueOnce(new Error(errorMessage));

    await expect(insertGeneral({ Title: mockArticle.Title, Body: mockArticle.Body }))
      .rejects.toThrowError(errorMessage);
  });

  it('should delete an existing article', async () => {
    supabase.delete.mockResolvedValueOnce({ error: null });

    const result = await deleteGeneral(mockArticle.ArticleID);

    expect(result).toBe(true);
    expect(supabase.from).toHaveBeenCalledWith('General');
    expect(supabase.delete).toHaveBeenCalled();
    expect(supabase.match).toHaveBeenCalledWith({ ArticleID: mockArticle.ArticleID, UserID: 'testuser' });
  });

  // deleteのエラーケース
  it('should handle delete error', async () => {
    const errorMessage = 'Error deleting article';
    supabase.delete.mockRejectedValueOnce(new Error(errorMessage));

    await expect(deleteGeneral(mockArticle.ArticleID))
      .rejects.toThrowError(errorMessage);
  });

  it('should update an existing article', async () => {
    supabase.update.mockResolvedValueOnce({ data: [mockArticle], error: null });
    const result = await updateGeneral(mockArticle.ArticleID, mockUpdateData);

    expect(result).toBe(true);
    expect(supabase.from).toHaveBeenCalledWith('General');
    expect(supabase.update).toHaveBeenCalledWith(mockUpdateData);
    expect(supabase.match).toHaveBeenCalledWith({ ArticleID: mockArticle.ArticleID, UserID: 'testuser' });
  });

  // updateのエラーケース
  it('should handle update error', async () => {
    const errorMessage = 'Error updating article';
    supabase.update.mockRejectedValueOnce(new Error(errorMessage));

    await expect(updateGeneral(mockArticle.ArticleID, mockUpdateData))
      .rejects.toThrowError(errorMessage);
  });

  it('should get an existing article', async () => {
    supabase.single.mockResolvedValueOnce({ data: mockArticle, error: null });

    const result = await getArticle(mockArticle.ArticleID);

    expect(result).toEqual(mockArticle);
    expect(supabase.from).toHaveBeenCalledWith('General');
    expect(supabase.select).toHaveBeenCalled();
    expect(supabase.match).toHaveBeenCalledWith({ ArticleID: mockArticle.ArticleID });
    expect(supabase.single).toHaveBeenCalled();
  });

    // getのエラーケース
  it('should handle get error', async () => {
    const errorMessage = 'Error getting article';
    supabase.single.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getArticle(mockArticle.ArticleID))
      .rejects.toThrowError(errorMessage);
  });
});