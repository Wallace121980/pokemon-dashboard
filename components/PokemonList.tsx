'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Pokemon {
  name: string;
  url: string;
}

export const PokemonList = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then((response) => setPokemon(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon List</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemon.map((poke, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
            <Link
              href={`/${poke.name}`}
              className="text-blue-600 hover:underline"
            >
              {poke.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
