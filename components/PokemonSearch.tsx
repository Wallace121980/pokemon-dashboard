'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { PokemonDetailsCard } from './PokemonDetailsCard';
import { PokemonDetails } from './PokemonDetails';

export const PokemonSearch = () => {
  const [query, setQuery] = useState('');
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      const data = await response.json();
      setPokemons([data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Search Pokémon</h1>
      <div className="bg-white shadow sm:rounded-lg mb-4">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Search your Pokemon
          </h3>

          <form
            className="mt-5 sm:flex sm:items-center"
            onSubmit={handleSearch}
          >
            <div className="w-full sm:max-w-xs">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="pikachu"
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>

      {pokemons.length ? (
        <div className="p-4 flex justify-center items-center">
          {pokemons.map((pokemon, index) => (
            <PokemonDetailsCard key={index} details={pokemon} />
          ))}
        </div>
      ) : (
        <p className="text-white">No results found</p>
      )}
    </div>
  );
};
