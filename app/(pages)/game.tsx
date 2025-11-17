import ChampionCard from '@/components/champion-card';
import { Button } from '@/components/ui/button';
import { useGlobalData } from '@/context/global-context';
import useGameState from '@/hooks/use-game-state';
import { shuffle } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import HexArrow from '@/public/assets/arrow.png';
import Image from 'next/image';

export default function Game() {
  const { globalState: gState } = useGlobalData();
  const { state: globalState, handler: globalHandler } = gState;
  const { champions, difficulty } = globalState;
  const { setGameStatus } = globalHandler;
  const { state, handler, scoreRef } = useGameState({
    globalState,
    globalHandler,
  });
  const { flipped, positions, score } = state;
  const { setFlipped, setPositions, setScore } = handler;

  function handleCardClick(clicked: boolean) {
    if (clicked) setGameStatus('lost');
    setFlipped(true);
    setTimeout(() => {
      setPositions(shuffle(positions));
      setFlipped(false);
    }, 600);

    setScore();
  }

  function handleBackButton() {
    setGameStatus('ready');
  }

  return (
    <div
      className={cn(
        'grid grid-cols-12 grid-rows-2 h-full max-sm:grid-rows-3 relative'
      )}
    >
      <Button
        variant='ghost'
        size='icon-lg'
        onClick={handleBackButton}
        className='absolute top-8 left-8 max-sm:top-4 max-sm:left-4 max-sm:scale-120 scale-200 hover:scale-180'
      >
        <Image
          alt='Back arrow'
          src={HexArrow}
          width={50}
          height={0}
          className='absolute'
        />
      </Button>
      <div className='bg-hextech-black place-self-center px-12 py-6 border-4 border-gold-4 flex-col row-start-1 font-bold col-start-6 col-span-2 max-sm:text-4xl text-9xl text-gold-4 flex items-center justify-center'>
        <span>SCORE</span>
        {score}
      </div>
      <div
        className={cn(
          'flex items-center gap-4 col-start-5 col-span-4 row-start-2 max-sm:row-span-2 max-xl:row-span-2 max-sm:col-start-1 max-sm:-col-end-1 max-xl:col-start-1 max-xl:-col-end-1 max-sm:flex-wrap-reverse max-xl:flex-wrap-reverse max-xl:justify-center max-sm:justify-center p-4',
          difficulty === 'medium' &&
            'col-start-4 col-span-6 max-sm:col-start-1 max-sm:-col-end-1 max-xl:col-start-1 max-xl:-col-end-1',
          difficulty === 'hard' &&
            'col-start-3 col-span-8 max-sm:col-start-1 max-sm:-col-end-1 max-xl:col-start-1 max-xl:-col-end-1'
        )}
      >
        {champions.map((c, originalIndex) => {
          const newPosition = positions.indexOf(originalIndex);
          return (
            <ChampionCard
              key={c.id}
              champion={c}
              flipped={flipped}
              style={{
                order: newPosition,
                transition: 'order 0s',
              }}
              onClick={handleCardClick}
              className={cn(
                'max-sm:w-[100px]',
                difficulty === 'medium' && 'max-sm:w-[85px]',
                difficulty === 'hard' && 'max-sm:w-[65px]'
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
