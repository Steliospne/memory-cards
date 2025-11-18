import { champions } from '@/data/champions';
import { getChampions } from '@/lib/helpers';
import { Champion } from '@/types/models';
import { useEffect, useReducer, useRef } from 'react';

type State = {
  gameStatus: 'ready' | 'started' | 'won' | 'lost';
  difficulty: 'easy' | 'medium' | 'hard' | '';
  champions: Champion[];
  score: number;
  bestScore: number;
  clickSound: {
    enabled: boolean;
    audio?: HTMLAudioElement;
  };
  bgMusic: {
    enabled: boolean;
    audio?: HTMLAudioElement;
  };
};

const initialState: State = {
  difficulty: '',
  gameStatus: 'ready',
  champions: [],
  score: 0,
  bestScore: 0,
  clickSound: { enabled: true },
  bgMusic: {
    enabled: true,
  },
};

type SetterName<K extends string> = K extends `is${infer Rest}`
  ? `set${Capitalize<Rest>}`
  : `set${Capitalize<K>}`;

type ActionsFromState<S> = {
  [K in keyof S & string]: { type: SetterName<K>; payload: S[K] };
}[keyof S & string];

type Action = ActionsFromState<State>;

function stateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setDifficulty':
      return { ...state, difficulty: action.payload };
    case 'setGameStatus':
      return { ...state, gameStatus: action.payload };
    case 'setChampions':
      return { ...state, champions: action.payload };
    case 'setScore':
      return { ...state, score: action.payload };
    case 'setBestScore':
      return { ...state, bestScore: action.payload };
    case 'setBgMusic':
      return { ...state, bgMusic: action.payload };
    case 'setClickSound':
      return { ...state, clickSound: action.payload };
  }
}

export type GlobalState = ReturnType<typeof useGlobalState>;

export default function useGlobalState() {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { bgMusic, clickSound, bestScore, score } = state;
  const scoreRef = useRef(0);
  function setGameStatus(payload: State['gameStatus']) {
    dispatch({ type: 'setGameStatus', payload });
  }

  function setDifficulty(payload: State['difficulty']) {
    dispatch({ type: 'setDifficulty', payload });
  }

  function setChampions(payload: State['champions']) {
    dispatch({ type: 'setChampions', payload });
  }

  function setBestScore(value: number) {
    dispatch({ type: 'setBestScore', payload: value });
  }

  function setClickSound(payload: State['clickSound']) {
    dispatch({ type: 'setClickSound', payload });
  }

  function toggleClickSound(active: boolean) {
    if (active) {
      return dispatch({
        type: 'setClickSound',
        payload: { audio: clickSound.audio, enabled: active },
      });
    }
    dispatch({
      type: 'setClickSound',
      payload: { audio: clickSound.audio, enabled: false },
    });
  }

  function setBgMusic(payload: State['bgMusic']) {
    dispatch({ type: 'setBgMusic', payload });
  }

  function incrementScore() {
    const newScore = score + 1;
    scoreRef.current = newScore;
    if (newScore >= bestScore) setBestScore(newScore);
    dispatch({ type: 'setScore', payload: newScore });
  }

  function clearScore() {
    dispatch({ type: 'setScore', payload: 0 });
  }

  useEffect(() => {
    if (state.champions.length === 0) return;
    if (scoreRef.current === state.champions.length) {
      setGameStatus('won');
    }
  }, [score, state.champions]);

  useEffect(() => {
    if (!clickSound.audio) {
      const audio = new Audio('/assets/click.mp3');
      audio.volume = 0.05;
      setClickSound({ enabled: true, audio });
    }
  }, [clickSound.audio]);

  useEffect(() => {
    const audio = new Audio('/assets/background-music.mp3');
    audio.volume = 0.05;
    audio.loop = true;
    if (!bgMusic.audio) {
      setBgMusic({ enabled: true, audio });
    }

    const handleUserInteraction = () => {
      if (bgMusic.audio?.paused && bgMusic.enabled) bgMusic.audio.play();
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    return () => document.removeEventListener('click', handleUserInteraction);
  }, [bgMusic]);

  return {
    state,
    handler: {
      incrementScore,
      setGameStatus,
      setDifficulty,
      setChampions,
      toggleClickSound,
      setBgMusic,
      setBestScore,
      clearScore,
    },
  };
}
