/**
 * 小文字にすべきでない単語のセット
 */
const minorWords: Set<string> = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'but',
  'by',
  'en',
  'for',
  'from',
  'how',
  'if',
  'in',
  'neither',
  'nor',
  'of',
  'on',
  'only',
  'onto',
  'out',
  'or',
  'per',
  'so',
  'than',
  'that',
  'the',
  'to',
  'until',
  'up',
  'upon',
  'v',
  'v.',
  'versus',
  'vs',
  'vs.',
  'via',
  'when',
  'with',
  'without',
  'yet',
]);

/**
 * 文字列をタイトルケースに変換します。
 * @param {string} str - 変換する文字列
 * @returns {string} タイトルケースに変換された文字列
 */
function toTitleCase(str: string): string {
  // Unicode対応の単語分割正規表現
  const wordSplitRegex: RegExp = /[\p{L}\p{N}']+|[^\p{L}\p{N}']+/gu;

  return str
    .trim()
    .replace(wordSplitRegex, (match: string, index: number): string => {
      // 区切り文字はそのまま返す
      if (!/[\p{L}\p{N}']+/u.test(match)) {
        return match;
      }

      // 最初の単語、または小文字にすべきでない単語以外の場合
      if (index === 0 || !minorWords.has(match.toLowerCase())) {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
      }

      // それ以外の場合は小文字のまま
      return match.toLowerCase();
    });
}

export { toTitleCase };
