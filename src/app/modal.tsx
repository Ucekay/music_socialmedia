import { Stack, useFocusEffect, useNavigation } from 'expo-router';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ModalScreen() {
  const navigation = useNavigation();
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
  });
  const { top } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const headerHeight = isLandscape ? 32 : 44;
  const keyboardVerticalOffset = headerHeight + top;
  useFocusEffect(() => {
    console.log('focused');
  });
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title='Close'
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </View>
  );
}
const initialContent = '<p>This is a basic example!</p>';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    width: '80%',
    height: 1,
    marginVertical: 30,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
