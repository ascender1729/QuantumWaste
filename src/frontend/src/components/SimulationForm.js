import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function SimulationForm({ setSimulationResults }) {
  const [length, setLength] = useState(10);
  const [composition, setComposition] = useState('random');
  const [temperature, setTemperature] = useState(25);
  const [pressure, setPressure] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/simulate', { 
        length, 
        composition,
        temperature,
        pressure
      });
      setSimulationResults(response.data);
    } catch (error) {
      console.error('Error running simulation:', error);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label htmlFor="length" className="block text-sm font-medium text-gray-700">Polymer Length</label>
        <input
          type="number"
          id="length"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min="1"
          max="100"
        />
      </div>
      <div>
        <label htmlFor="composition" className="block text-sm font-medium text-gray-700">Composition</label>
        <select
          id="composition"
          value={composition}
          onChange={(e) => setComposition(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="random">Random</option>
          <option value="uniform">Uniform</option>
        </select>
      </div>
      <div>
        <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
        <input
          type="number"
          id="temperature"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min="0"
          max="100"
          step="0.1"
        />
      </div>
      <div>
        <label htmlFor="pressure" className="block text-sm font-medium text-gray-700">Pressure (atm)</label>
        <input
          type="number"
          id="pressure"
          value={pressure}
          onChange={(e) => setPressure(parseFloat(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min="0.1"
          max="10"
          step="0.1"
        />
      </div>
      <motion.button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Run Simulation
      </motion.button>
    </motion.form>
  );
}

export default SimulationForm;