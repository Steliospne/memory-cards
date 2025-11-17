'use client';

import useGlobalState, { GlobalState } from '@/hooks/use-global-state';
import { createContext, ReactNode, useContext } from 'react';

interface GlobalDataProviderProps {
  children: ReactNode;
}

interface GlobalDataContextValue {
  globalState: GlobalState;
}

const GlobalDataContext = createContext<GlobalDataContextValue | null>(null);

export const GlobalDataProvider = ({ children }: GlobalDataProviderProps) => {
  const globalState = useGlobalState();

  return (
    <GlobalDataContext.Provider value={{ globalState }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);

  if (!context) {
    throw new Error('useGlobalData must be used within GlobalDataProvider');
  }

  return context;
};
