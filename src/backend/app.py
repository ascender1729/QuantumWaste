from flask import Flask, request, jsonify
from flask_cors import CORS
from src.backend.quantum_algorithm import quantum_optimization
from src.backend.polymer_simulator import simulate_polymer
from src.backend.models.recycling_model import predict_recycling_difficulty
from src.backend.utils.helpers import validate_input

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to QuantumWaste API"}), 200

@app.route('/simulate', methods=['POST'])
def simulate():
    try:
        data = request.json
        if not validate_input(data):
            return jsonify({"error": "Invalid input data"}), 400

        polymer_length = data.get('length', 10)
        polymer_composition = data.get('composition', 'random')
        temperature = data.get('temperature', 25)
        pressure = data.get('pressure', 1)

        optimized_params = quantum_optimization(polymer_length)
        polymer = simulate_polymer(polymer_length, polymer_composition)
        
        features = polymer.get_features()
        features['temperature'] = temperature
        features['pressure'] = pressure
        
        difficulty, feature_importances = predict_recycling_difficulty(features)

        return jsonify({
            "optimized_params": optimized_params.tolist(),
            "polymer_structure": polymer.to_dict(),
            "recycling_difficulty": float(difficulty),
            "feature_importances": feature_importances
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)