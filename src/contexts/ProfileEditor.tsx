import type React from 'react';
import { createContext, useEffect, useState } from 'react';

import { set } from 'date-fns';

import { GetUserProfile } from '../backend/supabase_apis/handler/user';
import { UpdateUserProfile } from '../backend/supabase_apis/handler/user';

type ProfileStateType = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  userAvatar: string;
  setUserAvatar: React.Dispatch<React.SetStateAction<string>>;
  tag: string[];
  setTag: React.Dispatch<React.SetStateAction<string[]>>;
};

// Contextを作成
export const ProfileEditorContext = createContext<ProfileStateType | undefined>(
  undefined,
);

// Providerコンポーネントを作成
export const ProfileStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [bio, setBio] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [tag, setTag] = useState<string[]>([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileData = await GetUserProfile(
          '123e4567-e89b-12d3-a456-426614174001',
        );
        console.log(profileData);
        setName(profileData.userName);
        setId(profileData.profileId);
        setBio(profileData.bio);
        setUserAvatar(profileData.iconImageUrl);
        const tags = profileData.favArtists.map((artist) => artist.artistName);
        setTag(tags);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);

  return (
    <ProfileEditorContext.Provider
      value={{
        name,
        setName,
        id,
        setId,
        bio,
        setBio,
        tag,
        setTag,
        userAvatar,
        setUserAvatar,
      }}
    >
      {children}
    </ProfileEditorContext.Provider>
  );
};
