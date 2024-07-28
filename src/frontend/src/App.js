import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PolymerVisualizer from './components/PolymerVisualizer';
import SimulationForm from './components/SimulationForm';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [simulationResults, setSimulationResults] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-white">QuantumWaste Simulator</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Polymer Visualization</h2>
              <PolymerVisualizer simulationResults={simulationResults} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Simulation Parameters</h2>
              <SimulationForm setSimulationResults={setSimulationResults} />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <ResultsDisplay results={simulationResults} />
        </div>
      </motion.div>
    </div>
  );
}

export default App;