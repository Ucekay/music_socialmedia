import BgView from '@/src/components/ThemedBgView';
import { Redirect } from 'expo-router';

export default function TabIndex() {
  return (
    <BgView style={{ flex: 1 }}>
      <Redirect href='/(tabs)/home' />
    </BgView>
  );
}
