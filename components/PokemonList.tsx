'use client';

import React, { useEffect, useState } from 'react';
import { PokemonCards } from './PokemonCards';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

export type Pokemon = {
  name: string;
  url: string;
};

export const PokemonList = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=50'
        );
        if (!response.ok) {
          setError('Network response was not ok');
        }
        const data = await response.json();
        setPokemon(data.results);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Pokemon List</h1>
      <PokemonCards pokemon={pokemon} />
    </div>
  );
};
