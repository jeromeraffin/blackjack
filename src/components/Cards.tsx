import React from 'react';
import styled from 'styled-components';

import Card from '../core/types/Card';
import device from '../styles/device';

interface Props {
  cards: Card[];
}

type ImageProps = {
  number: number;
};

const imagePerLine = {
  mobile: 5,
  desktop: 9,
};

const Wrapper = styled.figure`
  position: relative;
  height: 200px;
  width: 100%;
`;

const Image = styled.img<ImageProps>`
  position: absolute;
  border-radius: 4px;
  width: 70px;
  height: 100px;
  font-size: 0.8rem;
  box-shadow: 1px 0 8px ${({ theme }) => theme.colors.black};

  top: ${({ number }) => (number > imagePerLine.mobile ? '40px;' : '0px')};
  left: ${({ number }) =>
    number > imagePerLine.mobile
      ? (number - imagePerLine.mobile - 1) * 30
      : number * 30}px;

  @media ${device.mobileL} {
    top: ${({ number }) => (number > imagePerLine.desktop ? '40px;' : '0px')};
    left: ${({ number }) =>
      number > imagePerLine.desktop
        ? (number - imagePerLine.desktop - 1) * 30
        : number * 30}px;
  }
`;

export default function Cards({ cards }: Props) {
  return (
    <Wrapper>
      {cards.map((card, index) => (
        <Image
          key={`${card.value}_${card.suit}_${index}`}
          src={card.image}
          alt={`${card.value} of ${card.suit}`}
          number={index}
        />
      ))}
    </Wrapper>
  );
}
