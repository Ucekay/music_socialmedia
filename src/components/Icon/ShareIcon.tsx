import React from "react";
import { ShareIos } from "iconoir-react-native";
import { Share, Alert } from 'react-native';

const ShareIcon = (props: any): JSX.Element => {
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
      <ShareIos width={props.size} height={props.size} onPress={onShare} style={props.style} color={props.color || '#000000'}/>
    );
};

export default ShareIcon;
