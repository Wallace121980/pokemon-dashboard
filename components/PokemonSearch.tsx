'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './button/button';

export const PokemonSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((response) => setResults([response.data]))
      .catch((error) => console.error(error));
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

      {results.length ? (
        <ul className="list-disc list-inside">
          {results.map((result, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded text-black">
              {result.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No results found</p>
      )}
    </div>
  );
};
