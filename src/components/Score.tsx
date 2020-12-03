import React from 'react';
import styled from 'styled-components';

interface Props {
  score: number;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.greyDark};
  border-radius: 50%;
`;

export default function Score({ score }: Props) {
  return <Wrapper>{score}</Wrapper>;
}
