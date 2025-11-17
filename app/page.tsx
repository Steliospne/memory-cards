'use client';

import { useGlobalData } from '@/context/global-context';
import Game from './(pages)/game';
import MainMenu from './(pages)/main-menu';
import Won from './(pages)/won';
import Lost from './(pages)/lost';

export default function Home() {
  const { globalState } = useGlobalData();
  const { state } = globalState;

  function SceneRouter() {
    switch (state.gameStatus) {
      case 'ready':
        return <MainMenu />;
      case 'started':
        return <Game />;
      case 'won':
        return <Won />;
      case 'lost':
        return <Lost />;
    }
  }

  return (
    <main className='flex items-center justify-center h-screen'>
      <SceneRouter />
    </main>
  );
}
