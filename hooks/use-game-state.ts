import { useEffect, useReducer } from 'react';
import { GlobalState } from './use-global-state';

type State = {
  flipped: boolean;
  positions: number[];
};

const initialState: State = {
  flipped: false,
  positions: [],
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
  }
}

export type GameState = ReturnType<typeof useGameState>;

interface useGameStateProps {
  globalState: GlobalState['state'];
  globalHandler: GlobalState['handler'];
}

export default function useGameState({ globalState }: useGameStateProps) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const { champions } = globalState;

  function setFlipped(payload: State['flipped']) {
    dispatch({ type: 'setFlipped', payload });
  }

  function setPositions(payload: State['positions']) {
    dispatch({ type: 'setPositions', payload });
  }

  useEffect(() => {
    setPositions(champions.map((_, i) => i));
  }, [champions]);

  return {
    state,
    handler: {
      setFlipped,
      setPositions,
    },
  };
}
