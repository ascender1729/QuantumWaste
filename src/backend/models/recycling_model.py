import joblib
import numpy as np
from pathlib import Path
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

model_path = Path(__file__).parent / 'recycling_model.joblib'
scaler_path = Path(__file__).parent / 'scaler.joblib'

def create_and_save_model():
    # Generate more complex synthetic data
    n_samples = 10000
    np.random.seed(42)

    lengths = np.random.randint(5, 200, n_samples)
    composition_a = np.random.randint(0, lengths)
    composition_b = np.random.randint(0, lengths - composition_a)
    composition_c = lengths - composition_a - composition_b
    avg_bond_strengths = np.random.uniform(0.5, 2.0, n_samples)
    temperature = np.random.uniform(20, 100, n_samples)
    pressure = np.random.uniform(1, 10, n_samples)

    X = np.column_stack((lengths, composition_a, composition_b, composition_c, avg_bond_strengths, temperature, pressure))

    # Generate more complex synthetic recycling difficulty scores
    y = (
        0.5 * lengths +
        0.3 * composition_a +
        0.4 * composition_b +
        0.6 * composition_c +
        2.0 * avg_bond_strengths +
        0.1 * temperature +
        0.2 * pressure +
        np.random.normal(0, 0.1, n_samples)
    )

    # Normalize the data
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    # Train a Random Forest model
    model = RandomForestRegressor(n_estimators=200, max_depth=10, random_state=42)
    model.fit(X_train, y_train)

    # Save the model and scaler
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    print(f"Model saved as '{model_path}'")
    print(f"Scaler saved as '{scaler_path}'")

    return model, scaler

# Check if the model file exists, if not, create and save it
if not model_path.exists() or not scaler_path.exists():
    model, scaler = create_and_save_model()
else:
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)

def predict_recycling_difficulty(features):
    X = np.array([
        features['length'],
        features['composition'].count('A'),
        features['composition'].count('B'),
        features['composition'].count('C'),
        features['avg_bond_strength'],
        features.get('temperature', 25),  # Default room temperature
        features.get('pressure', 1)  # Default atmospheric pressure
    ]).reshape(1, -1)

    X_scaled = scaler.transform(X)
    difficulty = model.predict(X_scaled)[0]
    
    feature_importances = dict(zip(
        ['Length', 'Composition A', 'Composition B', 'Composition C', 'Avg Bond Strength', 'Temperature', 'Pressure'],
        model.feature_importances_
    ))

    return difficulty, feature_importances

if __name__ == "__main__":
    if not model_path.exists() or not scaler_path.exists():
        create_and_save_model()
    else:
        print(f"Model already exists at '{model_path}'")
        print(f"Scaler already exists at '{scaler_path}'")