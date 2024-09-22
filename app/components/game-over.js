import Link from "next/link";

function GameOver({ state, mode }) {
  return (
    <div className='gameOverContainer'>
      {state === "lost" ? <p>Lost</p> : <p>Won</p>}
      <Link
        onClick={() => playClick(settings.sound_effects)}
        className='restart btn'
        href={`/game?mode=${mode}`}
      >
        Restart
      </Link>
    </div>
  );
}

export default GameOver;
