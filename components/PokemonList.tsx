'use client';

import React, { useEffect, useState } from 'react';
import { PokemonCards } from './PokemonCards';

export type Pokemon = {
  name: string;
  url: string;
};

export const PokemonList = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=50'
        );
        const data = await response.json();
        setPokemon(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Pokemon List</h1>
      <PokemonCards pokemon={pokemon} />
    </div>
  );
};
