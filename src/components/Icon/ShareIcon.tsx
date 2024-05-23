import React from "react";
import IconAntDesign from "./AntDesign";
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
      <IconAntDesign name='upload' size={props.size} onPress={onShare} style={props.style}/>
    );
};

export default ShareIcon;
