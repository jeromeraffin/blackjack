import axios, { AxiosResponse } from 'axios';
import Deck from '../types/Deck';
import Card from '../types/Card';

// setup the base API URL
axios.defaults.baseURL = 'https://deckofcardsapi.com/api/';

export async function getNewDeck(): Promise<Deck> {
  const response: AxiosResponse<Deck> = await axios.get(
    'deck/new/shuffle/?deck_count=6'
  );

  return response.data;
}

export async function getNewCard(deckId: string): Promise<Card> {
  const response: AxiosResponse<{ cards: Card[] }> = await axios.get(
    `deck/${deckId}/draw/?count=1`
  );

  return response.data.cards[0];
}
