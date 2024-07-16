'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './button/button';

export const PokemonSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((response) => setResults([response.data]))
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Pokémon</h1>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded text-black"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <ul className="list-disc list-inside">
        {results.map((result, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded text-black">
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
