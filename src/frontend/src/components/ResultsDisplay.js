import React from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ResultsDisplay({ results }) {
  if (!results) return null;

  const { optimized_params, recycling_difficulty, feature_importances } = results;

  const chartData = {
    labels: Object.keys(feature_importances),
    datasets: [
      {
        label: 'Feature Importance',
        data: Object.values(feature_importances),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Feature Importance in Recycling Difficulty',
        font: {
          size: 18
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Importance'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Features'
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Simulation Results</h2>
      <div className="space-y-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h3 className="text-lg font-medium">Optimized Parameters:</h3>
          <p className="text-gray-600">{optimized_params.map(p => p.toFixed(4)).join(', ')}</p>
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <h3 className="text-lg font-medium">Recycling Difficulty:</h3>
          <p className="text-4xl font-bold text-indigo-600">{recycling_difficulty.toFixed(2)}</p>
          <p className="text-sm text-gray-500">
            (0 - Easy to recycle, 10 - Extremely difficult to recycle)
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="h-80"
        >
          <h3 className="text-lg font-medium mb-2">Feature Importance:</h3>
          <Bar data={chartData} options={chartOptions} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <h3 className="text-lg font-medium">Interpretation:</h3>
          <p className="text-gray-600">
            The chart above shows the importance of each feature in determining the recycling difficulty. 
            Longer bars indicate that the feature has a greater impact on the recycling process.
            Features with higher importance should be the focus for optimizing the recycling process.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ResultsDisplay;