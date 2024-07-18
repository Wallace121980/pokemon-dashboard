import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonCards } from '../components/PokemonCards';

describe('PokemonCards', () => {
  const mockPokemon = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  ];

  it('renders the correct number of Pokemon cards', () => {
    render(<PokemonCards pokemon={mockPokemon} />);

    const cards = screen.getAllByRole('link');
    expect(cards).toHaveLength(mockPokemon.length);
  });

  it('displays the correct Pokemon names', () => {
    render(<PokemonCards pokemon={mockPokemon} />);

    mockPokemon.forEach((poke) => {
      expect(screen.getByText(poke.name)).toBeInTheDocument();
    });
  });

  it('links to the correct URLs for each Pokemon', () => {
    render(<PokemonCards pokemon={mockPokemon} />);

    mockPokemon.forEach((poke) => {
      const link = screen.getByRole('link', { name: poke.name });
      expect(link).toHaveAttribute('href', `/${poke.name}`);
    });
  });
});
