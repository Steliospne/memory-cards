'use client';

import useGameState, { GameState } from '@/hooks/use-game-state';
import { createContext, ReactNode, useContext } from 'react';

interface GlobalDataProviderProps {
  children: ReactNode;
}

interface GlobalDataContextValue {
  gameState: GameState;
}

const GlobalDataContext = createContext<GlobalDataContextValue | null>(null);

export const GlobalDataProvider = ({ children }: GlobalDataProviderProps) => {
  const gameState = useGameState();

  return (
    <GlobalDataContext.Provider value={{ gameState }}>
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
