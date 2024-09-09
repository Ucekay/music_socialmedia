import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import palette from '@evilmartians/harmony/dist/base';
import chroma from 'chroma-js';
import { Heart } from 'iconoir-react-native';

import Colors from '@/src/constants/Colors';

type HeartIconProps = {
  width: number;
  height: number;
  strokeWidth?: number;
  isPost?: boolean;
  isArticle?: boolean;
  isToday?: boolean;
  id?: number;
  initialColor?: string;
};

const HeartIcon = ({
  width,
  height,
  strokeWidth,
  isPost,
  isArticle,
  isToday,
  id,
  initialColor,
}: HeartIconProps) => {
  const colorScheme = useColorScheme();
  const [color, setColor] = useState<string>(
    colorScheme === 'light'
      ? Colors.light.secondaryText
      : Colors.dark.secondaryText,
  );
  const [fill, setFill] = useState<string>('none');
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    if (status) return;
    setColor(
      colorScheme === 'light'
        ? Colors.light.secondaryText
        : Colors.dark.secondaryText,
    );
  }, [colorScheme, status]);

  //読み込み時にdetabase参照して管理する
  const onPress = () => {
    if (isPost && id) {
      if (status === false) {
        //insertlike(id);
        setColor(chroma(palette.rose['500']).hex());
        setFill(chroma(palette.rose['500']).hex());
        setStatus(true);
      } else if (status === true) {
        //deleteLike(id);
        setColor(
          colorScheme === 'light'
            ? Colors.light.secondaryText
            : Colors.dark.secondaryText,
        );
        setFill('none');
        setStatus(false);
      }
    }
  };
  return (
    <Heart
      width={width}
      height={height}
      color={initialColor || color}
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      fill={fill}
      onPress={onPress}
    />
  );
};

export default HeartIcon;
