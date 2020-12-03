export enum Value {
  ACE = 'ACE',
  KING = 'KING',
  QUEEN = 'QUEEN',
  JACK = 'JACK',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
}

export default interface Card {
  image: string;
  value: Value;
  suit: string;
  code: string;
}
