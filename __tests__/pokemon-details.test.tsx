import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonDetails } from '../components/PokemonDetails';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks(); // Enable fetch mocking

beforeEach(() => {
  fetchMock.resetMocks(); // Reset mocks before each test
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/pokemon/pikachu'), // Mock usePathname to return a specific path
}));

describe('PokemonDetails', () => {
  it('fetches and displays pokemon details', async () => {
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

    render(<PokemonDetails />);

    // Wait for the component to finish loading data
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByAltText('pikachu')).toHaveAttribute(
        'src',
        '/_next/image?url=http%3A%2F%2Fexample.com%2Fpikachu.png&w=256&q=75'
      );
      expect(screen.getByText('static')).toBeInTheDocument();
      expect(screen.getByText('lightning-rod')).toBeInTheDocument();
    });
  });
});
