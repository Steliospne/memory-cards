import { Button } from '@/components/ui/button';
import { useGlobalData } from '@/context/global-context';
import { champions } from '@/data/champions';
import { GlobalState } from '@/hooks/use-global-state';
import { getChampions } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import Logo from '@/public/assets/logo-L.png';
import Image from 'next/image';

export default function MainMenu() {
  const { globalState } = useGlobalData();
  const { state, handler } = globalState;
  const { difficulty } = state;
  const { setDifficulty, setGameStatus, setChampions } = handler;

  function handleSelectDifficulty(e: React.MouseEvent) {
    const selectedDifficulty = e.currentTarget
      .id as GlobalState['state']['difficulty'];
    setDifficulty(selectedDifficulty);
  }

  function handleGameStart() {
    const selectedChampions = getChampions(champions, difficulty);
    setChampions(selectedChampions);
    setGameStatus('started');
  }

  return (
    <div className='grid grid-rows-8 grid-cols-12 h-screen w-full'>
      <div className='relative h-full w-full max-sm:col-start-1 max-sm:-col-end-1 max-xl:col-start-3 max-xl:col-span-8 col-start-5 col-span-4 row-start-2 row-span-3'>
        <Image
          alt='Main logo.'
          src={Logo}
          fill
          className='absolute object-contain'
        />
      </div>

      <div className='flex flex-col gap-4 row-start-6 row-span-2 col-start-5 col-span-4 max-sm:col-start-2 max-sm:col-span-10 max-xl:col-start-4 max-xl:col-span-6'>
        <div className='flex justify-between'>
          <Button
            id='easy'
            variant='outline'
            onClick={handleSelectDifficulty}
            className={cn(
              'max-sm:h-[40px] max-sm:w-[90px] h-[75px] w-[125px] bg-gold-6/80! text-hextech-black! border-gold-4! text-2xl max-sm:text-xl rounded-none',
              difficulty === 'easy' &&
                'bg-blue-6/80! text-gold-4! border-blue-6!'
            )}
          >
            Easy
          </Button>
          <Button
            id='medium'
            variant='outline'
            onClick={handleSelectDifficulty}
            className={cn(
              'max-sm:h-[40px] max-sm:w-[90px] h-[75px] w-[125px] bg-gold-6/80! text-hextech-black! border-gold-4! text-2xl max-sm:text-xl rounded-none',
              difficulty === 'medium' &&
                'bg-blue-6/80! text-gold-4! border-blue-6!'
            )}
          >
            Medium
          </Button>
          <Button
            id='hard'
            variant='outline'
            onClick={handleSelectDifficulty}
            className={cn(
              'max-sm:h-[40px] max-sm:w-[90px] h-[75px] w-[125px] bg-gold-6/80! text-hextech-black! border-gold-4! text-2xl max-sm:text-xl rounded-none',
              difficulty === 'hard' &&
                'bg-blue-6/80! text-gold-4! border-blue-6!'
            )}
          >
            Hard
          </Button>
        </div>
        {difficulty !== '' && (
          <Button
            onClick={handleGameStart}
            className='text-2xl max-sm:text-xl rounded-none max-sm:h-[30px] h-[60px] text-hextech-black border-blue-6! border-2'
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
}
