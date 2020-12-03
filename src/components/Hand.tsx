import React from 'react';
import styled from 'styled-components';

import Card from '../core/types/Card';
import device from '../styles/device';

import Cards from './Cards';
import Score from './Score';

interface Props {
  title: string;
  game: {
    cards: Card[];
    score: number;
  };
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.greyDark};
  width: 100%;
  height: 400px;
  border-radius: 5px;
  padding: 20px;

  @media ${device.tablet} {
    width: 400px;
  }
`;

const Title = styled.h2``;

const Hand = React.forwardRef<HTMLDivElement, Props>(({ title, game }, ref) => (
  <Wrapper ref={ref}>
    <Title>{title}</Title>
    <Cards cards={game.cards} />
    <Score score={game.score} />
  </Wrapper>
));

export default Hand;
