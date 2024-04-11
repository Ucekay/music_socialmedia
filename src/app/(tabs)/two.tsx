import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabTwoScreen() {
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <BottomSheet snapPoints={snapPoints}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>This is awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
