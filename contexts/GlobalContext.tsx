import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Theme } from '@/types';
import { utils } from '@/lib';

// state
interface GlobalState {
  theme: Theme;
}
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

// dispatch
type Action = { type: 'SET_LIGHT_THEME' } | { type: 'SET_DARK_THEME' };
type GlobalStateDispatch = Dispatch<Action>;
const GlobalStateDispatchContext = createContext<
  GlobalStateDispatch | undefined
>(undefined);

function globalContextReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'SET_LIGHT_THEME':
      utils.setThemeForDocumentAndStorage('light');
      return {
        ...state,
        theme: 'light',
      };
    case 'SET_DARK_THEME':
      utils.setThemeForDocumentAndStorage('dark');
      return {
        ...state,
        theme: 'dark',
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(globalContextReducer, {
    theme: 'light',
  });

  return (
    <GlobalStateDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalStateDispatchContext.Provider>
  );
}

export function useGlobalContextState() {
  const state = useContext(GlobalStateContext);
  if (!state) throw new Error('GlobalStateProvider not found');
  return state;
}

export function useGlobalContextDispatch() {
  const dispatch = useContext(GlobalStateDispatchContext);
  if (!dispatch) throw new Error('GlobalStateProvider not found');
  return dispatch;
}
