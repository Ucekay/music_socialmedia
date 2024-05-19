import React from 'react';
import { useFocusEffect } from 'expo-router';
import UserProfileTop from '@/src/components/UserProfileTop';
import { useProfileScreen } from '@/src/contexts/ProfileScreenContext';
import { useTabAction } from '@/src/contexts/ActionButtonContext';

const profileScreen = () => {
  const { setActionVisible } = useTabAction();
  const { setProfileDismissed } = useProfileScreen();
  useFocusEffect(
    React.useCallback(() => {
      setProfileDismissed(true);
      return () => {
        setActionVisible(false);
      };
    }, [])
  );
  return (
    <>
      <UserProfileTop />
    </>
  );
};

export default profileScreen;
