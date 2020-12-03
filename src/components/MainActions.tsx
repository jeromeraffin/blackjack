import React, { useContext, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

import { getNewCard, getNewDeck } from '../core/services/api';
import context from '../core/store/context';
import { Actions } from '../core/store/reducer';
import { GameState, SCORE_LIMIT } from '../core/utils/constants';
import device from '../styles/device';

import Button from './Button';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  margin: 30px;

  > div:last-child > button:first-child {
    margin-right: 10px;
  }

  > div:first-child {
    margin-top: 20px;
  }

  @media ${device.tablet} {
    flex-direction: row;

    > div:first-child {
      margin-top: 0;
      margin-right: 50px;
    }
  }
`;

export default function MainActions() {
  const [state, dispatch] = useContext(context);

  const { deckId, bank, playerStood, gameState } = state;

  const disabled = useMemo(
    () =>
      !deckId ||
      playerStood ||
      gameState === GameState.GAME_OVER ||
      gameState === GameState.WIN,
    [playerStood, gameState, deckId]
  );

  const interval = useRef<null | number>(null);

  const startNewGame = () => {
    if (interval.current) {
      stopBankHitting();
    }

    getNewDeck().then((data) => {
      dispatch({ type: Actions.NEW_GAME, payload: data.deck_id });
    });
  };

  const playerHitting = () => {
    getNewCard(deckId!)
      .then((data) => dispatch({ type: Actions.PLAYER_HIT, payload: data }))
      .catch((err) => err);
  };

  const playerStanding = () => {
    dispatch({ type: Actions.PLAYER_STAND });
  };

  const stopBankHitting = () => {
    clearInterval(interval.current!);
    interval.current = null;
  };

  useEffect(() => {
    if (!deckId) {
      startNewGame();
    }
  });

  useEffect(() => {
    if (playerStood && !interval.current) {
      interval.current = setInterval(() => {
        getNewCard(deckId!)
          .then((data) => dispatch({ type: Actions.BANK_HIT, payload: data }))
          .catch((err) => err);
      }, 2000);
    } else if (bank.score >= SCORE_LIMIT) {
      stopBankHitting();
    }
  }, [playerStood, bank.score, deckId, dispatch]);

  return (
    <Wrapper>
      <div>
        <Button aria-label="Get a refresh" onClick={startNewGame}>
          Start new game
        </Button>
      </div>
      <div>
        <Button
          aria-label="Hit, draw a card"
          disabled={disabled}
          onClick={playerHitting}
        >
          Hit
        </Button>
        <Button
          aria-label="Stand, end your turn"
          disabled={disabled}
          onClick={playerStanding}
        >
          Stand
        </Button>
      </div>
    </Wrapper>
  );
}
