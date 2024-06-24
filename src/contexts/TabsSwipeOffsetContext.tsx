import { createContext, useContext, useState } from 'react';

type TabsSwipeOffsetContextType = {
  tabsSwipeOffset: number;
  setTabsSwipeOffset: React.Dispatch<React.SetStateAction<number>>;
};

const TabsSwipeOffsetContext = createContext<TabsSwipeOffsetContextType>({
  tabsSwipeOffset: 0,
  setTabsSwipeOffset: () => {},
});

export const TabsSwipeOffsetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tabsSwipeOffset, setTabsSwipeOffset] = useState(0);
  return (
    <TabsSwipeOffsetContext.Provider
      value={{ tabsSwipeOffset, setTabsSwipeOffset }}
    >
      {children}
    </TabsSwipeOffsetContext.Provider>
  );
};

export const useTabsSwipeOffset = () => {
  return useContext(TabsSwipeOffsetContext);
};
