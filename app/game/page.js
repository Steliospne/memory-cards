"use client";
import Link from "next/link";
import { getChampions, shuffle } from "../lib/functions";
import Image from "next/image";
import backButtonLogo from "@/public/assets/arrow.png";
import { useSettings } from "../components/provider";
import { champions } from "../lib/data";
import Card from "../components/card";
import { useEffect, useState } from "react";
import GameOver from "../components/game-over";

export default function Game({ searchParams }) {
  const { settings, playClick } = useSettings();
  const [score, setScore] = useState(0);
  const mode = searchParams.mode;
  const [selectedChampions, setSelectedChampions] = useState(
    getChampions(champions, mode)
  );

  const [gameOver, setGameOver] = useState(false);

  const handleCardClick = (event) => {
    const name = event.target.parentElement.id
      ? event.target.parentElement.id
      : event.target.id;
    const clickedChampion = selectedChampions.filter(
      (champion) => champion.name === name
    )[0];

    if (clickedChampion.clicked) {
      setScore(0);
      setGameOver(true);
    } else {
      setScore((n) => n + 1);
    }

    score === selectedChampions.length - 1 && setGameOver(true);

    setSelectedChampions((selectedChampions) =>
      selectedChampions.map((champion) =>
        champion.name === name ? { ...champion, clicked: true } : champion
      )
    );

    playClick(settings.sound_effects);
    shuffle(selectedChampions);
  };

  // ================ TODO ================
  // Make an animation for the shuffle to do that probably we need to now the
  // previous position of each card the next every time they are being shuffled

  // useEffect(() => {
  //   const currentPos = [];

  //   selectedChampions.forEach((champion) => {
  //     const selection = document.querySelector("#" + champion.name);
  //   });
  // }, [selectedChampions]);

  return (
    <main className={gameOver ? "game over" : "game"}>
      {!gameOver ? (
        <>
          <h1 className='score'>{score}</h1>
          <div className='gameBoard'>
            {selectedChampions.map((champion) => (
              <Card
                key={champion.id}
                champion={champion}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </>
      ) : (
        <GameOver
          state={score === 0 ? "lost" : "won"}
          mode={searchParams.mode}
        />
      )}
      <Link
        onClick={() => playClick(settings.sound_effects)}
        className='back-btn'
        href={"/"}
      >
        Back
        <Image alt='back button logo' width={64} src={backButtonLogo} />
      </Link>
    </main>
  );
}
