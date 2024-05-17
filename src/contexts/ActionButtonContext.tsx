import { createContext, useContext, useState } from 'react';

type TabActionContextType = {
  actionVisible: boolean;
  setActionVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const TabActionContext = createContext<TabActionContextType>({
  actionVisible: false,
  setActionVisible: () => {},
});

export const TabActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [actionVisible, setActionVisible] = useState(false);
  return (
    <TabActionContext.Provider value={{ actionVisible, setActionVisible }}>
      {children}
    </TabActionContext.Provider>
  );
};

export const useTabAction = () => {
  return useContext(TabActionContext);
};
