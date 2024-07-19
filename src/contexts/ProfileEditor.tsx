import React, { createContext, useState } from 'react';

type ProfileStateType = {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>;
    bio: string;
    setBio: React.Dispatch<React.SetStateAction<string>>;
  };

// Contextを作成
export const ProfileEditorContext = createContext<ProfileStateType | undefined>(undefined);

// Providerコンポーネントを作成
export const ProfileStateProvider = ({ children }) => {
  const [name, setName] = useState('Initial State');
  const [id, setId] = useState('');
  const [bio, setBio] = useState('')

  return (
    <ProfileEditorContext.Provider value={{ name, setName, id, setId, bio ,setBio }}>
      {children}
    </ProfileEditorContext.Provider>
  );
};