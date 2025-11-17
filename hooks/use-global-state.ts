import { champions } from '@/data/champions';
import { getChampions } from '@/lib/helpers';
import { Champion } from '@/types/models';
import { useReducer } from 'react';

type State = {
  gameStatus: 'ready' | 'started' | 'won' | 'lost';
  difficulty: 'easy' | 'medium' | 'hard' | '';
  champions: Champion[];
};

const initialState: State = {
  difficulty: '',
  gameStatus: 'ready',
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
    case 'setGameStatus':
      return { ...state, gameStatus: action.payload };
    case 'setChampions':
      return { ...state, champions: action.payload };
  }
}

export type GlobalState = ReturnType<typeof useGlobalState>;

export default function useGlobalState() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  function setGameStatus(payload: State['gameStatus']) {
    dispatch({ type: 'setGameStatus', payload });
  }

  function setDifficulty(payload: State['difficulty']) {
    const selectedChampions = getChampions(champions, payload);
    setChampions(selectedChampions);
    dispatch({ type: 'setDifficulty', payload });
  }

  function setChampions(payload: State['champions']) {
    dispatch({ type: 'setChampions', payload });
  }

  return {
    state,
    handler: {
      setGameStatus,
      setDifficulty,
      setChampions,
    },
  };
}
