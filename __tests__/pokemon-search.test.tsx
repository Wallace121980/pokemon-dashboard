import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonSearch } from '../components/PokemonSearch';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('PokemonSearch', () => {
  beforeEach(() => {
    // Resets the fetch mock before each test
    fetchMock.resetMocks();
  });

  it('searches for a pokemon and displays the result', async () => {
    // Mock the fetch call for this test
    fetchMock.mockResponseOnce(
      JSON.stringify({
        name: 'pikachu',
        sprites: {
          front_default: 'http://example.com/pikachu.png',
        },
        abilities: [
          { ability: { name: 'static', url: 'http://example.com/ability/7' } },
          {
            ability: {
              name: 'lightning-rod',
              url: 'http://example.com/ability/31',
            },
          },
        ],
      })
    );

    const { getByPlaceholderText, getByText } = render(<PokemonSearch />);

    // Simulate user typing 'pikachu' into the input field
    fireEvent.change(getByPlaceholderText('pikachu'), {
      target: { value: 'pikachu' },
    });

    // Simulate user clicking the 'Search' button
    fireEvent.click(getByText('Search'));

    // Wait for the component to update based on the fetch mock
    await waitFor(() => expect(getByText('pikachu')).toBeInTheDocument());

    // Assert that fetch was called with the correct URL
    expect(fetchMock).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });
});
