import React, { createContext, useState } from 'react';

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
export const ProfileEditorContext = createContext<ProfileStateType | undefined>(undefined);

// Providerコンポーネントを作成
export const ProfileStateProvider = ({ children }) => {
  const [name, setName] = useState('Initial State');
  const [id, setId] = useState('');
  const [bio, setBio] = useState('')
  const [userAvatar, setUserAvatar] = useState('https://api.dicebear.com/8.x/bottts/png')
  const [tag, setTag] = useState(['Kana Nishino', 'Ikimono Gakari', 'AI', 'GReeeeN', 'Daichi Miura', 'Miwa', 'Fujifabric', 'Little Glee Monster', 'Sakanaction', 'Shota Shimizu'])

  return (
    <ProfileEditorContext.Provider value={{ name, setName, id, setId, bio ,setBio, tag, setTag, userAvatar, setUserAvatar }}>
      {children}
    </ProfileEditorContext.Provider>
  );
};