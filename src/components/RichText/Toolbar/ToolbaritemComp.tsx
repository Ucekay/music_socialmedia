import { Image, TouchableOpacity, View } from 'react-native';

import type { EditorBridge } from '@10play/tentap-editor';
import type { ToolbarItem } from './actions';

export const ToolbarItemComp = ({
  onPress,
  disabled,
  active,
  image,
  editor,
  args,
}: ToolbarItem & {
  editor: EditorBridge;
  args: Parameters<ToolbarItem['onPress']>[0];
}) => {
  return (
    <TouchableOpacity
      onPress={onPress(args)}
      disabled={disabled(args)}
      style={[editor.theme.toolbar.toolbarButton]}
    >
      <View
        style={[
          editor.theme.toolbar.iconWrapper,
          active(args) ? editor.theme.toolbar.iconWrapperActive : undefined,
          disabled(args) ? editor.theme.toolbar.iconWrapperDisabled : undefined,
        ]}
      >
        <Image
          source={image(args)}
          style={[
            editor.theme.toolbar.icon,
            active(args) ? editor.theme.toolbar.iconActive : undefined,
            disabled(args) ? editor.theme.toolbar.iconDisabled : undefined,
          ]}
          resizeMode='contain'
        />
      </View>
    </TouchableOpacity>
  );
};
