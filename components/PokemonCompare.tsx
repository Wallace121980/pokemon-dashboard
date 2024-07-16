'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './button/button';

export const PokemonCompare = () => {
  const [firstPokemon, setFirstPokemon] = useState('');
  const [secondPokemon, setSecondPokemon] = useState('');
  const [firstDetails, setFirstDetails] = useState<any>(null);
  const [secondDetails, setSecondDetails] = useState<any>(null);

  const handleCompare = () => {
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
      <h1 className="text-2xl font-bold mb-4">Compare Pokémon</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="First Pokémon"
          value={firstPokemon}
          onChange={(e) => setFirstPokemon(e.target.value)}
          className="border border-gray-300 p-2 rounded text-black"
        />
        <input
          type="text"
          placeholder="Second Pokémon"
          value={secondPokemon}
          onChange={(e) => setSecondPokemon(e.target.value)}
          className="ml-2 border border-gray-300 p-2 rounded text-black"
        />
        <Button onClick={handleCompare}>Compare</Button>
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
