import theme from '../../styles/theme';
import { Value } from '../types/Card';

export const SCORE_LIMIT = 21;

export const FACE_CARDS = [Value.KING, Value.QUEEN, Value.JACK];
export const FACE_CARDS_VALUE = 10;

export const ACE_CARD = Value.ACE;
export const ACE_VALUE_UNDER_21 = 11;
export const ACE_VALUE_OVER_21 = 1;

export enum GameState {
  GAME_OVER = 'GAME_OVER',
  WIN = 'WIN',
  IN_PROGRESS = 'IN_PROGRESS',
  PLAYER_STOOD = 'PLAYER_STOOD',
}

export const gameStateText = {
  [GameState.GAME_OVER]: 'Game Over',
  [GameState.WIN]: 'You win',
  [GameState.IN_PROGRESS]: `It's your turn`,
  [GameState.PLAYER_STOOD]: 'Bank is playing',
};

export const gameStateColor = {
  [GameState.GAME_OVER]: theme.colors.red,
  [GameState.WIN]: theme.colors.green,
  [GameState.IN_PROGRESS]: theme.colors.purple,
  [GameState.PLAYER_STOOD]: theme.colors.greyDark,
};

export enum DeviceSize {
  MOBILE_S = 320,
  MOBILE_M = 375,
  MOBILE_L = 425,
  TABLET = 768,
  LAPTOP = 1024,
  LAPTOP_L = 1440,
  DESKTOP = 2560,
}
