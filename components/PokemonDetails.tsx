'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface PokemonDetails {
  name: string;
  abilities: Array<{ ability: { name: string } }>;
  weight: number;
  sprites: { front_default: string };
}

const PokemonDetails: React.FC = () => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const pathName = usePathname();

  console.log(pathName);
  console.log(details);

  useEffect(() => {
    if (pathName) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon${pathName}`)
        .then((response) => setDetails(response.data))
        .catch((error) => console.error(error));
    }
  }, [pathName]);

  return (
    <div className="p-4">
      {details ? (
        <div className="bg-white p-4 rounded-lg shadow-md text-black">
          <h1 className="text-3xl font-bold mb-4">{details.name}</h1>
          <Image
            src={details.sprites.front_default}
            width={500}
            height={500}
            alt={details.name}
            className="mb-4"
          />
          <p className="text-lg">Weight: {details.weight}</p>
          <h2 className="text-xl font-semibold mt-4">Abilities</h2>
          <ul className="list-disc list-inside">
            {details.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetails;
