import pytest
from src.backend.quantum_algorithm import quantum_optimization

def test_quantum_optimization():
    result = quantum_optimization(10)
    assert len(result) == 3
    assert all(isinstance(param, float) for param in result)

def test_quantum_optimization_different_lengths():
    result1 = quantum_optimization(5)
    result2 = quantum_optimization(20)
    assert not (result1 == result2).all()