'use client';

import React, { useState, useEffect } from 'react';
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
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';

export const PokemonCharts = () => {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([
    'weight',
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=20'
        );
        if (!response.ok) {
          setError('Network response was not ok');
        }
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (poke: any) => {
            const pokeResponse = await fetch(poke.url);
            if (!pokeResponse.ok) {
              setError('Network response was not ok');
            }
            return pokeResponse.json();
          })
        );
        setPokemon(pokemonDetails);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchData();
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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Pokemon Charts</h1>
      <fieldset className="mb-4">
        <legend className="sr-only">Choose your filter</legend>
        <div className="space-y-5">
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="weight"
                name="weight"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                checked={selectedAttributes.includes('weight')}
                onChange={() => handleAttributeChange('weight')}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-white">
                Weight
              </label>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="height"
                name="height"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                checked={selectedAttributes.includes('height')}
                onChange={() => handleAttributeChange('height')}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="candidates" className="font-medium text-white">
                Height
              </label>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="base_experience"
                name="base_experience"
                type="checkbox"
                aria-describedby="offers-description"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                checked={selectedAttributes.includes('base_experience')}
                onChange={() => handleAttributeChange('base_experience')}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="offers" className="font-medium text-white">
                Base Experience
              </label>
            </div>
          </div>
        </div>
      </fieldset>

      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: '20px' }}
          />
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
