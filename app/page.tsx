'use client';
import ChampionCard from '@/components/champion-card';
import { Button } from '@/components/ui/button';
import { useGlobalData } from '@/context/global-context';
import { champions } from '@/data/champions';
import { getChampions, shuffle } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const { gameState } = useGlobalData();
  const { state } = gameState;

  function SceneRouter() {
    switch (state.gameStatus) {
      case 'ready':
        return <MainMenu />;
      case 'started':
        return <Game />;
      case 'ended':
        return null;
    }
  }

  return (
    <main className='flex items-center justify-center h-screen'>
      <SceneRouter />
    </main>
  );
}

function MainMenu() {
  const { gameState } = useGlobalData();
  const { state, handler } = gameState;
  const { difficulty } = state;
  const { setDifficulty, setGameStatus, setChampions } = handler;

  return (
    <div>
      {/* Logo */}
      <div></div>

      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            onClick={() => {
              setDifficulty('easy');
              const champs = getChampions(champions, 'easy');
              setChampions(champs);
            }}
            className={cn(
              difficulty === 'easy' && 'bg-primary border-blue-600'
            )}
          >
            Easy
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              setDifficulty('medium');
              const champs = getChampions(champions, 'medium');
              setChampions(champs);
            }}
            className={cn(
              difficulty === 'medium' && 'bg-primary border-blue-600'
            )}
          >
            Medium
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              setDifficulty('hard');
              const champs = getChampions(champions, 'hard');
              setChampions(champs);
            }}
            className={cn(
              difficulty === 'hard' && 'bg-primary border-blue-600'
            )}
          >
            Hard
          </Button>
        </div>
        {difficulty !== '' && (
          <Button onClick={() => setGameStatus('started')}>Start</Button>
        )}
      </div>
    </div>
  );
}

function Game() {
  const { gameState } = useGlobalData();
  const { state, handler } = gameState;
  const { champions } = state;
  const { setChampions } = handler;
  const [flipped, setFlipped] = useState(false);

  const [positions, setPositions] = useState<number[]>([]);

  // Initialize positions on mount
  useEffect(() => {
    setPositions(champions.map((_, i) => i));
  }, [champions.length]);

  function handleCardClick() {
    setFlipped(true);

    setTimeout(() => {
      setPositions(shuffle([...Array(champions.length).keys()]));
      setFlipped(false);
    }, 600);
  }

  return (
    <div className='flex gap-4'>
      {champions.map((c, originalIndex) => {
        const newPosition = positions.indexOf(originalIndex);
        return (
          <ChampionCard
            key={c.id}
            champion={c}
            flipped={flipped}
            style={{ order: newPosition, transition: 'order 0s' }}
            onClick={handleCardClick}
          />
        );
      })}
    </div>
  );
}
