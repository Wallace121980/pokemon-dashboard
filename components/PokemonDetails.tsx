'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface PokemonDetails {
  name: string;
  abilities: Array<{ ability: { name: string } }>;
  weight: number;
  height: number;
  base_experience: number;
  sprites: { front_default: string };
}

export const PokemonDetails = () => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon${pathName}`)
        .then((response) => setDetails(response.data))
        .catch((error) => console.error(error));
    }
  }, [pathName]);

  console.log(details);

  return (
    <div className="p-4 flex justify-center items-center">
      {details ? (
        <>
          <div className="w-1/3 divide-y divide-gray-200 rounded-lg bg-white shadow relative">
            <Image
              src={details.sprites.front_default}
              width={100}
              height={100}
              alt={details.name}
              className="absolute right-0 top-0 mt-6 mr-6 h-100 w-100 flex-shrink-0 rounded-full bg-gray-300"
            />
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <h1 className="truncate text-3xl font-bold text-gray-900 mb-4">
                  {details.name}
                </h1>

                <div className="flex items-center text-lg font-medium text-gray-400 pt-1">
                  Weight:
                  <span className="font-semibold ml-1">
                    {details.weight} kg
                  </span>
                </div>

                <div className="flex items-center text-lg font-medium text-gray-400 pt-1">
                  Height:
                  <span className="font-semibold ml-1">
                    {details.height} cm
                  </span>
                </div>

                <div className="flex items-center text-lg font-medium text-gray-400 pt-1">
                  Base Experience:
                  <span className="font-semibold ml-1">
                    {details.base_experience}
                  </span>
                </div>
                <h2 className="text-xl font-semibold my-4">Abilities</h2>
                <ul className="list-none">
                  {details.abilities.map((ability, index) => (
                    <li key={index} className="mb-2 last:mb-0">
                      <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full shadow">
                        {ability.ability.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
