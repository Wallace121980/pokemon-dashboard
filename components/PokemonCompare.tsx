'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './button/button';

export const PokemonCompare = () => {
  const [firstPokemon, setFirstPokemon] = useState('');
  const [secondPokemon, setSecondPokemon] = useState('');
  const [firstDetails, setFirstDetails] = useState<any>(null);
  const [secondDetails, setSecondDetails] = useState<any>(null);

  const handleCompare = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${firstPokemon}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon/${secondPokemon}`),
    ])
      .then(([firstResponse, secondResponse]) => {
        setFirstDetails(firstResponse.data);
        setSecondDetails(secondResponse.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Compare Pokémon</h1>

      <div className="bg-white shadow sm:rounded-lg mb-4">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Compare your Pokemon
          </h3>

          <form
            className="mt-5 sm:flex sm:items-center"
            onSubmit={handleCompare}
          >
            <div className="w-full sm:max-w-xs mr-4">
              <input
                type="text"
                value={firstPokemon}
                onChange={(e) => setFirstPokemon(e.target.value)}
                placeholder="pikachu"
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="w-full sm:max-w-xs">
              <input
                type="text"
                value={secondPokemon}
                onChange={(e) => setSecondPokemon(e.target.value)}
                placeholder="bulbasaur"
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <Button type="submit">Compare</Button>
          </form>
        </div>
      </div>
      {firstDetails && secondDetails && (
        <div className="bg-white p-4 rounded-lg shadow-md text-black">
          <h2 className="text-xl font-bold">
            {firstDetails.name} vs {secondDetails.name}
          </h2>
          <p>
            Weight: {firstDetails.weight} vs {secondDetails.weight}
          </p>
          <h3 className="text-lg font-semibold mt-4">Abilities</h3>
          <div className="flex">
            <ul className="list-disc list-inside mr-4">
              {firstDetails.abilities.map((ability: any, index: number) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
            <ul className="list-disc list-inside">
              {secondDetails.abilities.map((ability: any, index: number) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
