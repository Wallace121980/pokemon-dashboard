'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PokemonDetailsCard } from './PokemonDetailsCard';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

export type PokemonDetails = {
  name: string;
  abilities: Array<{ ability: { name: string } }>;
  weight: number;
  height: number;
  base_experience: number;
  sprites: { front_default: string };
};

export const PokemonDetails = () => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    const fetchDetails = async () => {
      if (pathName) {
        try {
          setLoading(true);
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon${pathName}`
          );
          if (!response.ok) {
            setError('Network response was not ok');
          }
          const data = await response.json();
          setDetails(data);
          setLoading(false);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('An unexpected error occurred');
          }
        }
      }
    };

    fetchDetails();
  }, [pathName]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-4 flex justify-center items-center">
      {details ? <PokemonDetailsCard details={details} /> : <p>Loading...</p>}
    </div>
  );
};
