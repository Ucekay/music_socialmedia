export const increaseSaturation = (
  hexColor: string,
  saturationFactor: number,
): string => {
  const rgb: number = Number.parseInt(hexColor.slice(1), 16);
  let r: number = (rgb >> 16) & 0xff;
  let g: number = (rgb >> 8) & 0xff;
  let b: number = rgb & 0xff;

  // RGBをHSLに変換
  r /= 255;
  g /= 255;
  b /= 255;
  const max: number = Math.max(r, g, b);
  const min: number = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d: number = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  //彩度を上げる
  s = Math.min(s * saturationFactor, 1);

  // HSLをRGBに変換
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  r = hue2rgb(p, q, h + 1 / 3);
  g = hue2rgb(p, q, h);
  b = hue2rgb(p, q, h - 1 / 3);

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  let newR = r.toString(16);
  let newG = g.toString(16);
  let newB = b.toString(16);

  //一桁の場合は0を追加
  if (newR.length === 1) {
    newR = '0' + newR;
  }
  if (newG.length === 1) {
    newG = '0' + newG;
  }
  if (newB.length === 1) {
    newB = '0' + newB;
  }

  return '#' + newR + newG + newB;
};

const hue2rgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

export const rgb2Hex = (
  rgbArray: { r: number; g: number; b: number }[],
): string[] => {
  return rgbArray.map(({ r, g, b }) => {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  });
};

//各色を16真数に変換
const toHex = (color: number): string => {
  const hex = color.toString(16).toUpperCase();
  return hex.length === 1 ? `0${hex}` : hex;
};

interface RGB {
  r: number;
  g: number;
  b: number;
}

export const rgbObjectToRgbaString = (rgb: RGB, alpha: number): string => {
  // RGBの値が有効範囲内かどうかを確認する
  const { r, g, b } = rgb;
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error('RGB values must be between 0 and 255.');
  }

  // 透明度のパーセンテージが有効範囲内かどうかを確認する
  if (alpha < 0 || alpha > 100) {
    throw new Error('Alpha must be between 0 and 100.');
  }

  // 透明度のパーセンテージを0〜1の範囲に変換
  const alphaDecimal = alpha / 100;

  // rgba()形式の文字列を生成して返す
  return `rgba(${r}, ${g}, ${b}, ${alphaDecimal})`;
};
