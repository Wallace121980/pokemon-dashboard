import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonDetailsCard } from '../components/PokemonDetailsCard';

describe('PokemonDetailsCard', () => {
  const mockDetails = {
    name: 'Pikachu',
    weight: 60,
    height: 40,
    base_experience: 112,
    abilities: [
      { ability: { name: 'Static' } },
      { ability: { name: 'Lightning Rod' } },
    ],
    sprites: {
      front_default: 'https://example.com/pikachu.png',
    },
  };

  it('renders correctly with given details', () => {
    render(<PokemonDetailsCard details={mockDetails} />);

    // Check for the Pokemon's name
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    // Check for the Pokemon's weight, height, and base experience
    expect(screen.getByText('60 kg')).toBeInTheDocument();
    expect(screen.getByText('40 cm')).toBeInTheDocument();
    expect(screen.getByText('112')).toBeInTheDocument();

    // Check for abilities
    expect(screen.getByText('Static')).toBeInTheDocument();
    expect(screen.getByText('Lightning Rod')).toBeInTheDocument();

    // Check for the image
    const image = screen.getByRole('img', { name: 'Pikachu' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fexample.com%2Fpikachu.png&w=256&q=75'
    );
  });
});
