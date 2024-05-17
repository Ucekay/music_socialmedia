import { View, Text } from 'react-native';
import UserProfileTop from '@/src/components/UserProfileTop';
import FloatingActionButton from '@/src/components/FloatingActionButton';

const profileScreen = () => {
  return (
    <>
      <UserProfileTop />
      <FloatingActionButton />
    </>
  );
};

export default profileScreen;
