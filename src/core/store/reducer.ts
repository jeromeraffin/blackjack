import { initialState, State } from './context';
import Card from '../types/Card';
import { getScore } from '../utils/value';
import { GameState } from '../utils/constants';

export enum Actions {
  NEW_GAME = 'NEW_GAME',
  PLAYER_HIT = 'PLAYER_HIT',
  PLAYER_STAND = 'PLAYER_STAND',
  BANK_HIT = 'BANK_HIT',
  UPDATE_GAME = 'UPDATE_GAME',
}

export type Action =
  | { type: Actions.NEW_GAME; payload: string }
  | { type: Actions.PLAYER_HIT; payload: Card }
  | { type: Actions.PLAYER_STAND }
  | { type: Actions.BANK_HIT; payload: Card }
  | { type: Actions.UPDATE_GAME; payload: GameState };

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.NEW_GAME:
      return {
        ...initialState,
        deckId: action.payload,
      };
    case Actions.PLAYER_HIT:
      const newPlayerCards = state.player.cards.concat(action.payload);
      const newPlayerScore = getScore(newPlayerCards.map((card) => card.value));

      return {
        ...state,
        player: {
          ...state.player,
          cards: newPlayerCards,
          score: newPlayerScore,
        },
      };
    case Actions.BANK_HIT:
      const newBankCards = state.bank.cards.concat(action.payload);
      const newBankScore = getScore(newBankCards.map((card) => card.value));

      return {
        ...state,
        bank: {
          ...state.bank,
          cards: newBankCards,
          score: newBankScore,
        },
      };
    case Actions.PLAYER_STAND:
      return {
        ...state,
        playerStood: true,
      };
    case Actions.UPDATE_GAME:
      return {
        ...state,
        gameState: action.payload,
      };
    default:
      return state;
  }
}
