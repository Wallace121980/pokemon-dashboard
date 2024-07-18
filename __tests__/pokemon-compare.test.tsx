import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonCompare } from '../components/PokemonCompare';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('PokemonCompare', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('compares two Pokémon', async () => {
    fetchMock.mockResponses(
      [
        JSON.stringify({
          name: 'pikachu',
          sprites: {
            front_default: 'http://example.com/pikachu.png',
          },
          abilities: [
            {
              ability: { name: 'static', url: 'http://example.com/ability/7' },
            },
            {
              ability: {
                name: 'lightning-rod',
                url: 'http://example.com/ability/31',
              },
            },
          ],
        }),
        { status: 200 },
      ],
      [
        JSON.stringify({
          name: 'bulbasaur',
          sprites: {
            front_default: 'http://example.com/bulbasaur.png',
          },
          abilities: [
            {
              ability: {
                name: 'overgrown',
                url: 'http://example.com/ability/65',
              },
            },
            {
              ability: {
                name: 'chlorophyll',
                url: 'http://example.com/ability/34',
              },
            },
          ],
        }),
        { status: 200 },
      ]
    );

    render(<PokemonCompare />);

    fireEvent.change(screen.getByPlaceholderText('pikachu'), {
      target: { value: 'pikachu' },
    });
    fireEvent.change(screen.getByPlaceholderText('bulbasaur'), {
      target: { value: 'bulbasaur' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Compare' }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur'
      );
    });

    await waitFor(() => {
      expect(screen.getByAltText('pikachu')).toBeInTheDocument();
      expect(screen.getByAltText('bulbasaur')).toBeInTheDocument();
    });
  });
});
