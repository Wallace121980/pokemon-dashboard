'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { PokemonDetailsCard } from './PokemonDetailsCard';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

export const PokemonCompare = () => {
  const [firstPokemon, setFirstPokemon] = useState('');
  const [secondPokemon, setSecondPokemon] = useState('');
  const [firstDetails, setFirstDetails] = useState<any>(null);
  const [secondDetails, setSecondDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Reset error state on new comparison

    try {
      const urls = [
        `https://pokeapi.co/api/v2/pokemon/${firstPokemon}`,
        `https://pokeapi.co/api/v2/pokemon/${secondPokemon}`,
      ];
      const responses = await Promise.all(urls.map((url) => fetch(url)));

      // Check for any non-OK responses and handle errors
      const failedResponseIndex = responses.findIndex(
        (response) => !response.ok
      );
      if (failedResponseIndex !== -1) {
        setError(
          `Failed to fetch details for ${
            failedResponseIndex === 0 ? 'the first' : 'the second'
          } Pokemon`
        );
        setLoading(false);
        return;
      }

      const [pokemon1, pokemon2] = await Promise.all(
        responses.map((response) => response.json())
      );

      setFirstDetails(pokemon1);
      setSecondDetails(pokemon2);
      setLoading(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Compare Pokémon</h1>

      <div className="bg-white shadow sm:rounded-lg mb-4">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Compare your Pokemon
          </h3>

          <form
            className="mt-5 sm:flex sm:items-center"
            onSubmit={handleCompare}
          >
            <div className="w-full sm:max-w-xs mr-4">
              <input
                type="text"
                value={firstPokemon}
                onChange={(e) => setFirstPokemon(e.target.value)}
                placeholder="pikachu"
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="w-full sm:max-w-xs">
              <input
                type="text"
                value={secondPokemon}
                onChange={(e) => setSecondPokemon(e.target.value)}
                placeholder="bulbasaur"
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <Button type="submit">Compare</Button>
          </form>
        </div>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && firstDetails && secondDetails && (
        <div className="flex justify-between">
          <PokemonDetailsCard details={firstDetails} />
          <div className="flex items-center">
            <h1 className="text-white text-8xl font-bold">VS</h1>
          </div>
          <PokemonDetailsCard details={secondDetails} />
        </div>
      )}
    </div>
  );
};
