'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PokemonDetailsCard } from './PokemonDetailsCard';

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
  const pathName = usePathname();

  useEffect(() => {
    const fetchDetails = async () => {
      if (pathName) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon${pathName}`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setDetails(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchDetails();
  }, [pathName]);

  return (
    <div className="p-4 flex justify-center items-center">
      {details ? <PokemonDetailsCard details={details} /> : <p>Loading...</p>}
    </div>
  );
};
