import { Champion } from '@/types/models';
import { useEffect, useReducer, useRef } from 'react';
import { GlobalState } from './use-global-state';

type State = {
  flipped: boolean;
  positions: number[];
  score: number;
};

const initialState: State = {
  flipped: false,
  positions: [],
  score: 0,
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
    case 'setFlipped':
      return { ...state, flipped: action.payload };
    case 'setPositions':
      return { ...state, positions: action.payload };
    case 'setScore':
      return { ...state, score: action.payload };
  }
}

export type GameState = ReturnType<typeof useGameState>;

interface useGameStateProps {
  globalState: GlobalState['state'];
  globalHandler: GlobalState['handler'];
}

export default function useGameState({
  globalState,
  globalHandler,
}: useGameStateProps) {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const scoreRef = useRef(0);
  const { champions } = globalState;
  const { setGameStatus } = globalHandler;

  useEffect(() => {
    setPositions(champions.map((_, i) => i));
  }, [champions.length]);

  useEffect(() => {
    if (scoreRef.current === champions.length) {
      setGameStatus('won');
    }
  }, [state.score]);

  function setFlipped(payload: State['flipped']) {
    dispatch({ type: 'setFlipped', payload });
  }

  function setPositions(payload: State['positions']) {
    dispatch({ type: 'setPositions', payload });
  }

  function setScore() {
    const newScore = state.score + 1;
    scoreRef.current = newScore;
    dispatch({ type: 'setScore', payload: newScore });
  }

  return {
    state,
    scoreRef,
    handler: {
      setFlipped,
      setPositions,
      setScore,
    },
  };
}
