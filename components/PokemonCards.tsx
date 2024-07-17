import Link from 'next/link';
import { Pokemon } from './PokemonList';

type TPokemonCardsProps = {
  pokemon: Pokemon[];
};

export const PokemonCards = ({ pokemon }: TPokemonCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {pokemon.map((poke, index) => (
        <div
          key={index}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="min-w-0 flex-1">
            <Link
              href={`/${poke.name}`}
              className="text-gray-900 focus:outline-none"
            >
              {poke.name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
