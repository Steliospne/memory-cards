import { useReducer } from 'react';

type State = {
  clicked: boolean;
};

const initialState: State = {
  clicked: false,
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
    case 'setClicked':
      return { ...state, clicked: action.payload };
  }
}

export default function useCardState() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  function setClicked(payload: State['clicked']) {
    dispatch({ type: 'setClicked', payload });
  }
  return {
    state,
    handler: { setClicked },
  };
}
