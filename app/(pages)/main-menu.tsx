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
    <div className='grid h-svh w-full grid-cols-12 grid-rows-8'>
      <div className='relative col-span-4 col-start-5 row-span-3 row-start-2 h-full w-full max-xl:col-span-8 max-xl:col-start-3 max-sm:col-start-1 max-sm:-col-end-1'>
        <Image
          alt='Main logo.'
          src={Logo}
          fill
          className='absolute object-contain'
          loading='eager'
        />
      </div>

      <div className='col-span-4 col-start-5 row-span-2 row-start-6 flex flex-col gap-4 max-xl:col-span-6 max-xl:col-start-4 max-sm:col-span-10 max-sm:col-start-2'>
        <div className='flex justify-between'>
          <Button
            id='easy'
            variant='outline'
            onClick={handleSelectDifficulty}
            className={cn(
              'bg-gold-6/80! text-hextech-black! border-gold-4! h-[75px] w-[125px] rounded-none text-2xl max-sm:h-[40px] max-sm:w-[90px] max-sm:text-xl',
              difficulty === 'easy' &&
                'bg-blue-6/80! text-gold-4! border-blue-6!',
            )}
          >
            Easy
          </Button>
          <Button
            id='medium'
            variant='outline'
            onClick={handleSelectDifficulty}
            className={cn(
              'bg-gold-6/80! text-hextech-black! border-gold-4! h-[75px] w-[125px] rounded-none text-2xl max-sm:h-[40px] max-sm:w-[90px] max-sm:text-xl',
              difficulty === 'medium' &&
                'bg-blue-6/80! text-gold-4! border-blue-6!',
            )}
          >
            Medium
          </Button>
          <Button
            id='hard'
            variant='outline'
            onClick={handleSelectDifficulty}
            className={cn(
              'bg-gold-6/80! text-hextech-black! border-gold-4! h-[75px] w-[125px] rounded-none text-2xl max-sm:h-[40px] max-sm:w-[90px] max-sm:text-xl',
              difficulty === 'hard' &&
                'bg-blue-6/80! text-gold-4! border-blue-6!',
            )}
          >
            Hard
          </Button>
        </div>
        {difficulty !== '' && (
          <Button
            onClick={handleGameStart}
            className='text-hextech-black border-blue-6! h-[60px] rounded-none border-2 text-2xl max-sm:h-[30px] max-sm:text-xl'
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
}
