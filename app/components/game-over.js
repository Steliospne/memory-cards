function GameOver({ state, onClick }) {
  return (
    <div className='gameOverContainer'>
      {state === "lost" ? <p>Lost</p> : <p>Won</p>}
      <button onClick={onClick} className='btn'>
        Restart
      </button>
    </div>
  );
}

export default GameOver;
