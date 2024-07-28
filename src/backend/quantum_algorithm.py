import pennylane as qml
import numpy as np

dev = qml.device("default.qubit", wires=4)

@qml.qnode(dev)
def quantum_circuit(params, x):
    qml.RX(x[0], wires=0)
    qml.RY(x[1], wires=1)
    qml.RZ(x[2], wires=2)
    qml.CNOT(wires=[0, 1])
    qml.CNOT(wires=[1, 2])
    qml.RX(params[0], wires=0)
    qml.RY(params[1], wires=1)
    qml.RZ(params[2], wires=2)
    qml.CNOT(wires=[2, 3])
    return qml.expval(qml.PauliZ(3))

def quantum_optimization(polymer_length):
    def cost(params):
        x = np.random.random(3) * polymer_length
        return quantum_circuit(params, x)

    opt = qml.GradientDescentOptimizer(stepsize=0.4)
    params = np.random.random(3)

    for _ in range(100):
        params = opt.step(cost, params)

    return params

# Add this line to make the parameters trainable
quantum_circuit.func.grad_argnum = 0