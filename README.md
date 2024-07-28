# QuantumWaste: Quantum-Inspired Molecular Recycling Simulator

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [System Architecture](#system-architecture)
5. [Machine Learning Model](#machine-learning-model)
6. [Prerequisites](#prerequisites)
7. [Installation](#installation)
8. [Configuration](#configuration)
9. [Running the Application](#running-the-application)
10. [API Documentation](#api-documentation)
11. [Frontend Structure](#frontend-structure)
12. [Backend Structure](#backend-structure)
13. [Data Flow](#data-flow)
14. [Troubleshooting](#troubleshooting)
15. [Future Enhancements](#future-enhancements)
16. [Contributing](#contributing)
17. [License](#license)

## Introduction

QuantumWaste is an innovative project that leverages quantum-inspired algorithms and machine learning to simulate and optimize the recycling process for complex polymers. This cutting-edge application combines quantum computing concepts with materials science to explore new frontiers in sustainable waste management.

## Features

- Quantum-inspired optimization algorithm for polymer recycling
- Machine learning model for predicting recycling difficulty
- Interactive 3D visualization of polymer structures
- Real-time simulation of recycling processes
- Dynamic charts displaying recycling difficulty and feature importances
- Responsive web design for various device sizes

## Technologies Used

- Frontend:
  - React.js
  - Three.js (for 3D visualization)
  - Material-UI
  - Recharts (for data visualization)

- Backend:
  - Flask (Python)
  - PennyLane (for quantum-inspired algorithms)
  - Scikit-learn (for machine learning models)
  - NumPy (for numerical computations)
  - Joblib (for model serialization)

- Development Tools:
  - Git & GitHub (version control)
  - npm (package management)
  - Visual Studio Code (recommended IDE)

## System Architecture

QuantumWaste consists of two main components:

1. **Frontend**: A React-based web application that provides an interactive interface for visualizing polymer structures and simulation results.
2. **Backend**: A Flask server that handles quantum-inspired simulations, polymer modeling, and machine learning predictions.

These components interact as follows:

1. The frontend sends simulation parameters to the backend.
2. The backend processes these parameters using quantum-inspired algorithms and the machine learning model.
3. The results are sent back to the frontend for visualization.

## Machine Learning Model

The QuantumWaste project uses a Random Forest Regressor to predict the recycling difficulty of polymers. Here are the key aspects of the model:

- **Model Type**: Random Forest Regressor
- **Features**:
  - Polymer length
  - Composition (A, B, C components)
  - Average bond strength
  - Temperature
  - Pressure
- **Target**: Recycling difficulty score
- **Data Generation**: Synthetic data is generated to train the model
- **Data Preprocessing**: StandardScaler is used to normalize the input features
- **Model Parameters**:
  - Number of estimators: 200
  - Max depth: 10
- **Model Persistence**: The trained model and scaler are saved using joblib for quick loading

The model provides not only the recycling difficulty prediction but also the feature importances, giving insights into which factors most significantly affect the recycling process.

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.7+
- Node.js 14+
- npm 6+
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/QuantumWaste.git
   cd QuantumWaste
   ```

2. Set up the backend:
   ```
   cd src/backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```
   cd ../../src/frontend
   npm install
   ```

## Configuration

1. Backend Configuration:
   - Create a `.env` file in the `src/backend` directory with any necessary environment variables.

2. Frontend Configuration:
   - If your backend is running on a different port or host, update the API URL in `src/frontend/src/config.js`.

## Running the Application

1. Start the backend:
   ```
   cd src/backend
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   python app.py
   ```

2. Start the frontend (in a new terminal):
   ```
   cd src/frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Documentation

The backend provides the following API endpoints:

- `POST /simulate`: Run a quantum-inspired simulation and get recycling difficulty prediction
- `GET /model_info`: Retrieve information about the current machine learning model

For detailed API documentation, refer to the comments in the `app.py` file.

## Frontend Structure

The frontend is organized as follows:

- `src/`
  - `components/`: React components
    - `PolymerVisualizer.js`: 3D visualization component
    - `SimulationForm.js`: Form for inputting simulation parameters
    - `ResultsDisplay.js`: Component for displaying simulation results
  - `App.js`: Root component
  - `index.js`: Entry point

## Backend Structure

The backend is structured as follows:

- `app.py`: Flask application and route definitions
- `quantum_algorithm.py`: Implementation of quantum-inspired algorithms
- `polymer_simulator.py`: Polymer structure simulation logic
- `models/`: Directory for machine learning models
  - `recycling_model.py`: Random Forest model for recycling difficulty prediction

## Data Flow

1. User inputs simulation parameters in the frontend
2. Parameters are sent to the backend via API call
3. Backend runs quantum-inspired simulation
4. Machine learning model predicts recycling difficulty
5. Results (including prediction and feature importances) are sent back to the frontend
6. Frontend updates the 3D visualization and charts

## Troubleshooting

- If the frontend fails to connect to the backend, ensure the backend is running and the API URL is correct in `config.js`.
- For issues with the 3D visualization, check the browser console for Three.js-related errors.
- If the quantum simulation fails, verify that PennyLane is properly installed and configured.
- If the model fails to load, ensure that the `recycling_model.joblib` and `scaler.joblib` files exist in the correct directory.

## Future Enhancements

- Implement more complex quantum algorithms
- Add support for a wider range of polymer types
- Integrate with real-world recycling data
- Develop an API for external integrations
- Implement user authentication for saving simulations
- Enhance the machine learning model with more features and real-world data

## Contributing

We welcome contributions to QuantumWaste! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.