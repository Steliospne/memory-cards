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
  const { champions, difficulty, bestScore, score } = globalState;
  const { setGameStatus, incrementScore } = globalHandler;
  const { state, handler } = useGameState({
    globalState,
    globalHandler,
  });
  const { flipped, positions } = state;
  const { setFlipped, setPositions } = handler;

  function handleCardClick(clicked: boolean) {
    if (clicked) return setGameStatus('lost');
    setFlipped(true);
    setTimeout(() => {
      setPositions(shuffle(positions));
      setFlipped(false);
    }, 600);

    incrementScore();
  }

  function handleBackButton() {
    setGameStatus('ready');
  }

  return (
    <div
      className={cn(
        'relative grid h-full grid-cols-12 grid-rows-2 max-sm:grid-rows-3',
      )}
    >
      <Button
        variant='ghost'
        size='icon-lg'
        onClick={handleBackButton}
        className='absolute top-8 left-8 scale-200 hover:scale-180 max-sm:top-4 max-sm:left-4 max-sm:scale-120'
      >
        <Image
          alt='Back arrow'
          src={HexArrow}
          width={50}
          height={0}
          className='absolute'
        />
      </Button>
      <div className='bg-hextech-black border-gold-4 text-gold-4 xs:max-sm:col-span-8 xs:max-sm:col-start-3 col-span-6 col-start-4 row-start-1 flex w-full flex-col items-start justify-center place-self-center border-4 px-8 py-6 text-9xl font-bold max-xl:text-4xl max-sm:px-4 max-sm:py-2 max-sm:text-xl'>
        <div className='flex gap-4'>
          <span>BEST SCORE:</span>
          <span>3{bestScore}</span>
        </div>

        <div className='flex gap-4'>
          <span>SCORE:</span>
          <span>3{score}</span>
        </div>
      </div>
      <div
        className={cn(
          'col-span-4 col-start-5 row-start-2 flex items-center gap-4 p-4 max-xl:col-start-1 max-xl:-col-end-1 max-xl:row-span-2 max-xl:flex-wrap-reverse max-xl:justify-center max-sm:col-start-1 max-sm:-col-end-1 max-sm:row-span-2 max-sm:flex-wrap-reverse max-sm:justify-center',
          difficulty === 'medium' &&
            'col-span-6 col-start-4 max-xl:col-start-1 max-xl:-col-end-1 max-sm:col-start-1 max-sm:-col-end-1',
          difficulty === 'hard' &&
            'col-span-8 col-start-3 max-xl:col-start-1 max-xl:-col-end-1 max-sm:col-start-1 max-sm:-col-end-1',
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
                difficulty === 'hard' && 'max-sm:w-[65px]',
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
