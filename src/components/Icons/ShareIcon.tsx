import { ShareIos } from 'iconoir-react-native';
import type React from 'react';
import { Alert, Share } from 'react-native';

import { useTheme } from '@/src/contexts/ColorThemeContext';

interface ShareIconProps {
  width: number;
  height: number;
  strokeWidth?: number;
  color?: string;
}

const ShareIcon: React.FC<ShareIconProps> = ({
  width,
  height,
  strokeWidth,
  color,
}) => {
  const { colors } = useTheme();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <ShareIos
      width={width}
      height={height}
      color={color || colors.secondaryText}
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      onPress={onShare}
    />
  );
};

export default ShareIcon;
