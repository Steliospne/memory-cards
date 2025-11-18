import { Button } from '@/components/ui/button';
import { useGlobalData } from '@/context/global-context';

export default function Lost() {
  const { globalState } = useGlobalData();
  const { handler } = globalState;
  const { setGameStatus, clearScore } = handler;

  function handleRestartButton() {
    setGameStatus('ready');
    clearScore();
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='bg-hextech-black border-gold-4 text-gold-4 border-4 px-8 py-4 text-6xl font-bold'>
        You Lost!
      </h1>
      <Button
        onClick={handleRestartButton}
        className='text-hextech-black border-blue-6! h-12 rounded-none border-4 text-2xl'
      >
        Restart
      </Button>
    </div>
  );
}
