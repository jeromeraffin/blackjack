import { createContext, Dispatch } from 'react';
import Card from '../types/Card';
import { GameState } from '../utils/constants';
import { Action } from './reducer';

interface Player {
  cards: Card[];
  score: number;
}
export interface State {
  deckId?: string;
  player: Player;
  bank: Player;
  playerStood: boolean;
  gameState: GameState;
}

export type Context = [State, Dispatch<Action>];

export const initialState: State = {
  deckId: undefined,
  player: {
    cards: [],
    score: 0,
  },
  bank: {
    cards: [],
    score: 0,
  },
  playerStood: false,
  gameState: GameState.IN_PROGRESS,
};

// @ts-ignore
const context = createContext<Context>([]);
const { Provider, Consumer } = context;

export { Provider, Consumer };
export default context;
