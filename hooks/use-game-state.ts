import { Champion } from '@/types/models';
import { useReducer } from 'react';

type State = {
  score: number;
  gameStatus: 'ready' | 'started' | 'ended';
  difficulty: 'easy' | 'medium' | 'hard' | '';
  champions: Champion[];
};

const initialState: State = {
  difficulty: '',
  gameStatus: 'ready',
  score: 0,
  champions: [],
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
    case 'setScore':
      return { ...state, score: action.payload };
    case 'setGameStatus':
      return { ...state, gameStatus: action.payload };
    case 'setChampions':
      return { ...state, champions: action.payload };
  }
}

export type GameState = ReturnType<typeof useGameState>;

export default function useGameState() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  function setScore(payload: State['score']) {
    dispatch({ type: 'setScore', payload });
  }

  function setGameStatus(payload: State['gameStatus']) {
    dispatch({ type: 'setGameStatus', payload });
  }

  function setDifficulty(payload: State['difficulty']) {
    dispatch({ type: 'setDifficulty', payload });
  }

  function setChampions(payload: State['champions']) {
    dispatch({ type: 'setChampions', payload });
  }

  return {
    state,
    handler: {
      setScore,
      setGameStatus,
      setDifficulty,
      setChampions,
    },
  };
}
