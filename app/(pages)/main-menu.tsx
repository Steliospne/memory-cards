import { Button } from '@/components/ui/button';
import { useGlobalData } from '@/context/global-context';
import { GlobalState } from '@/hooks/use-global-state';
import { cn } from '@/lib/utils';

export default function MainMenu() {
  const { globalState } = useGlobalData();
  const { state, handler } = globalState;
  const { difficulty } = state;
  const { setDifficulty, setGameStatus } = handler;

  function handleSelectDifficulty(e: React.MouseEvent) {
    const selectedDifficulty = e.currentTarget
      .id as GlobalState['state']['difficulty'];
    setDifficulty(selectedDifficulty);
  }

  return (
    <div>
      {/* Logo */}
      <div></div>

      <div className='flex flex-col gap-4'>
        <div className='flex gap-8'>
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
            onClick={() => setGameStatus('started')}
            className='text-2xl max-sm:text-xl rounded-none max-sm:h-[30px] h-[60px] text-hextech-black border-blue-6! border-2'
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
}
