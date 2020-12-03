import React, { useContext, useEffect, useMemo, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import theme from './styles/theme';
import device from './styles/device';
import GlobalStyle from './styles/GlobalStyle';

import context from './core/store/context';
import { Actions } from './core/store/reducer';
import { gameStateColor, gameStateText } from './core/utils/constants';
import { evaluateScoreResults } from './core/utils/value';
import useDeviceDetect from './core/hooks/useDeviceDetect';

import Hand from './components/Hand';
import MainActions from './components/MainActions';

const Container = styled.div`
  text-align: center;
  padding-bottom: 200px;

  @media ${device.tablet} {
    padding-bottom: 100px;
  }
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 40px 20px 0;

  > *:first-child {
    margin-bottom: 20px;
  }

  @media ${device.tablet} {
    flex-direction: row;
    align-items: center;
    justify-content: center;

    > *:first-child {
      margin-bottom: 0;
      margin-right: 20px;
    }
  }
`;

const GameInfo = styled.h2<{ backgroundColor: string }>`
  position: sticky;
  padding: 10px;
  margin: 0 0 40px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  transition: background-color 0.5s ease;
  top: 0;
  z-index: 2;

  @media ${device.tablet} {
    position: relative;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 10px 0 0;
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  margin: 0;
`;

function App() {
  const [state, dispatch] = useContext(context);
  const { player, bank, playerStood, gameState } = state;
  const bankHandComponent = useRef<HTMLDivElement>(null);
  const isMobile = useDeviceDetect();

  const newState = useMemo(
    () => evaluateScoreResults(player.score, bank.score, playerStood),
    [player.score, bank.score, playerStood]
  );

  useEffect(() => {
    if (newState !== gameState) {
      dispatch({ type: Actions.UPDATE_GAME, payload: newState });
    }
  }, [gameState, newState, dispatch]);

  useEffect(() => {
    if (bankHandComponent.current && isMobile && playerStood) {
      // Get mobile user to the bank's hand without action from him
      bankHandComponent.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isMobile, playerStood]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GameInfo backgroundColor={gameStateColor[gameState]}>
          {gameStateText[gameState]}
        </GameInfo>
        <header>
          <Title>BlackJack</Title>
          <Subtitle>Beat the bank's hand without going over 21</Subtitle>
        </header>
        <Wrapper>
          <Hand title="Your hand" game={player} />
          <Hand ref={bankHandComponent} title="Bank's hand" game={bank} />
        </Wrapper>
        <footer>
          <MainActions />
        </footer>
      </Container>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
