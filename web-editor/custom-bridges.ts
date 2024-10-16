import { TenTapStartKit } from '@10play/tentap-editor';

// historyを除外した新しい拡張機能の配列を作成
export const customStarterKit = TenTapStartKit.filter((extension) => {
  // extensionがnameプロパティを持っているか確認
  if ('name' in extension && typeof extension.name === 'string') {
    return extension.name !== 'history';
  }

  // extensionがgetNameメソッドを持っているか確認
  if ('getName' in extension && typeof extension.getName === 'function') {
    return extension.getName() !== 'history';
  }

  // どちらも該当しない場合は、とりあえず含める
  return true;
});
