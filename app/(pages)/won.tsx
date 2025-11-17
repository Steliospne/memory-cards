import { Button } from '@/components/ui/button';
import { useGlobalData } from '@/context/global-context';

export default function Won() {
  const { globalState } = useGlobalData();
  const { handler } = globalState;
  const { setGameStatus } = handler;

  function handleRestartButton() {
    setGameStatus('ready');
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className=' text-6xl bg-hextech-black border-4 border-gold-4 font-bold text-gold-4 px-8 py-4'>
        You Won!
      </h1>
      <Button
        onClick={handleRestartButton}
        className='rounded-none text-2xl h-12 text-hextech-black border-blue-6! border-4'
      >
        Restart
      </Button>
    </div>
  );
}
