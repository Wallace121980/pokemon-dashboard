'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PokemonCards } from './PokemonCards';

export type Pokemon = {
  name: string;
  url: string;
};

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
      <h1 className="text-2xl font-bold mb-4 text-white">Pokemon List</h1>
      <PokemonCards pokemon={pokemon} />
    </div>
  );
};
