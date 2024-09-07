import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native';

interface EditorMetadataInputProps extends TextInputProps {
  borderColor: string;
}

const EditorMetadataInput = (props: EditorMetadataInputProps) => {
  const { borderColor, style, ...otherProps } = props;

  return (
    <View style={[styles.option, { borderColor }]}>
      <TextInput {...otherProps} style={[styles.inputText, style]} />
    </View>
  );
};

export default EditorMetadataInput;

const styles = StyleSheet.create({
  inputText: {
    width: '100%',
    fontSize: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderCurve: 'continuous',
  },
});
