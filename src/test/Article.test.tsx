import { Database } from "../backend/types/supabasetypes";
//import { supabase } from "../backend/lib/supabase";
//import { checkAuth } from "../backend/components/DB_Access/checkAuth";
import { insertGeneral, deleteGeneral, updateGeneral, getArticle } from '../backend/components/DB_Access/Article/General'; 

// モックデータ
type General = Database['public']['Tables']['General']['Row'];
type UpdateGeneral = Omit<General, 'ArticleID'| 'UserID'>
const testGeneralData: Omit<General, 'ArticleID' | 'UserID' | 'PlaylistID' | 'likes' | 'view' | 'created_at'> = {
  Title: 'テストタイトル',
  Body: 'テストコンテンツ',
  // その他必要なフィールド
};

jest.mock("../backend/lib/supabase"); 
jest.mock("../backend/components/DB_Access/checkAuth");

// Supabase Clientのモック
const mockSupabase = {
  from: jest.fn().mockReturnThis(),
  insert: jest.fn().mockResolvedValue({ data: [{ ArticleID: 1 }], error: null }),
  delete: jest.fn().mockResolvedValue({ data: null, error: null }),
  update: jest.fn().mockResolvedValue({ data: [{ ...testGeneralData, ArticleID: 1 }], error: null }),
  select: jest.fn().mockReturnThis(),
  match: jest.fn().mockReturnThis(),
  single: jest.fn().mockResolvedValue({ data: { ...testGeneralData, ArticleID: 1 }, error: null }),
};

//(supabase as any) = mockSupabase;

// checkAuthのモック
//(checkAuth as jest.Mock).mockResolvedValue(1);

describe('General APIのテスト', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('insertGeneral: 記事を挿入できる', async () => {
    const result = await insertGeneral(testGeneralData);
    expect(result).toBe(true);
    expect(mockSupabase.insert).toHaveBeenCalledWith({ ...testGeneralData, UserID: 1 }); 
  });

  it('deleteGeneral: 記事を削除できる', async () => {
    const result = await deleteGeneral(1);
    expect(result).toBe(true);
    expect(mockSupabase.delete).toHaveBeenCalled();
    expect(mockSupabase.match).toHaveBeenCalledWith({ ArticleID: 1, UserID: 1 });
  });

  it('updateGeneral: 記事を更新できる', async () => {
    const updatedData: Partial<UpdateGeneral> = { Title: '更新されたタイトル' };
    const result = await updateGeneral(1, updatedData);
    expect(result).toBe(true);
    expect(mockSupabase.update).toHaveBeenCalledWith(updatedData);
    expect(mockSupabase.match).toHaveBeenCalledWith({ ArticleID: 1, UserID: 1 });
  });

  it('getArticle: 記事を取得できる', async () => {
    const result = await getArticle(1);
    expect(result).toEqual({ ...testGeneralData, ArticleID: 1 }); 
    expect(mockSupabase.select).toHaveBeenCalled();
    expect(mockSupabase.match).toHaveBeenCalledWith({ ArticleID: 1 }); 
  });
});