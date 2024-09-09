import { SearchAll } from '../swift/NativeModules';


export const SearchForToday = async (term: string): Promise<string[]|undefined> => {
    try{
        const SearchAllReuslt = await new Promise<string[]>((resolve, reject) =>{
            SearchAll(term, resolve, reject);
    });
    return SearchAllReuslt
  } catch (error) {
    console.error("楽曲の検索に失敗しました:", error);
    return undefined
  }
}