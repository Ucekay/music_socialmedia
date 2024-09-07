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
    fontSize: 16,
    width: '100%',
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderCurve: 'continuous',
    borderRadius: 12,
    borderWidth: 1,
  },
});
