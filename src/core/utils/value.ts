import { Value } from '../types/Card';
import {
  ACE_CARD,
  ACE_VALUE_OVER_21,
  ACE_VALUE_UNDER_21,
  FACE_CARDS,
  FACE_CARDS_VALUE,
  GameState,
  SCORE_LIMIT,
} from './constants';

function getValue(value: Value) {
  const hasFaceCard = FACE_CARDS.includes(value);

  return hasFaceCard ? FACE_CARDS_VALUE : Number(value);
}

function getAceValue(aceNumber: number, score: number) {
  if (aceNumber > 1 || score + ACE_VALUE_UNDER_21 > SCORE_LIMIT) {
    return ACE_VALUE_OVER_21 * aceNumber;
  } else {
    return ACE_VALUE_UNDER_21;
  }
}

export function getScore(values: Value[]) {
  const aceNumber = values.filter((value) => value === ACE_CARD).length;

  const score = values
    .filter((value) => value !== ACE_CARD)
    .reduce((acc, value) => acc + getValue(value), 0);

  const aceValue = aceNumber ? getAceValue(aceNumber, score) : 0;

  return score + aceValue;
}

export function evaluateScoreResults(
  playerScore: number,
  bankScore: number,
  playerStood: boolean
): GameState {
  if (playerScore <= SCORE_LIMIT && playerStood && bankScore > SCORE_LIMIT) {
    return GameState.WIN;
  } else if (playerScore > SCORE_LIMIT || bankScore === SCORE_LIMIT) {
    return GameState.GAME_OVER;
  } else if (playerStood) {
    return GameState.PLAYER_STOOD;
  }

  return GameState.IN_PROGRESS;
}
