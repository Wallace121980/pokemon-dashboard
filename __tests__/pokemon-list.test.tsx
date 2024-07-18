import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonList } from '../components/PokemonList';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('PokemonList', () => {
  it('fetches Pokemon and renders them in PokemonCards', async () => {
    const mockPokemonData = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));

    render(<PokemonList />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=50'
      );
    });

    await waitFor(() => {
      const bulbasaur = screen.getByText('bulbasaur');
      const ivysaur = screen.getByText('ivysaur');

      expect(bulbasaur).toBeInTheDocument();
      expect(ivysaur).toBeInTheDocument();
    });
  });
});
