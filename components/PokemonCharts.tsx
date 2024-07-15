'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const PokemonCharts = () => {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([
    'weight', // Start with 'weight' selected by default
  ]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((response) => {
        const requests = response.data.results.map((poke: any) =>
          axios.get(poke.url)
        );
        Promise.all(requests).then((results) => {
          setPokemon(results.map((result) => result.data));
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const data = pokemon.map((p) => ({
    name: p.name,
    weight: p.weight,
    base_experience: p.base_experience,
    height: p.height,
  }));

  const handleAttributeChange = (attribute: string) => {
    setSelectedAttributes((prevAttributes) =>
      prevAttributes.includes(attribute)
        ? prevAttributes.filter((attr) => attr !== attribute)
        : [...prevAttributes, attribute]
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon Charts</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedAttributes.includes('weight')}
            onChange={() => handleAttributeChange('weight')}
          />
          Weight
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedAttributes.includes('height')}
            onChange={() => handleAttributeChange('height')}
          />
          Height
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedAttributes.includes('base_experience')}
            onChange={() => handleAttributeChange('base_experience')}
          />
          Base Experience
        </label>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedAttributes.includes('weight') && (
            <Bar dataKey="weight" fill="#8884d8" />
          )}
          {selectedAttributes.includes('base_experience') && (
            <Bar dataKey="base_experience" fill="#82ca9d" />
          )}
          {selectedAttributes.includes('height') && (
            <Bar dataKey="height" fill="#ffc658" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
