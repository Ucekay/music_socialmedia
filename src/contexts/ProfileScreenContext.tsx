import { createContext, useContext, useState } from 'react';

type ProfileScreenContextType = {
  profileDismissed: boolean;
  setProfileDismissed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileScreenContext = createContext<ProfileScreenContextType>({
  profileDismissed: false,
  setProfileDismissed: () => {},
});

export const ProfileScreenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profileDismissed, setProfileDismissed] = useState(false);
  return (
    <ProfileScreenContext.Provider
      value={{ profileDismissed, setProfileDismissed }}
    >
      {children}
    </ProfileScreenContext.Provider>
  );
};

export const useProfileScreen = () => {
  return useContext(ProfileScreenContext);
};
