import random

class PolymerChain:
    def __init__(self, length, composition):
        self.length = length
        self.composition = self._generate_composition(composition)
        self.bond_strengths = self._generate_bond_strengths()

    def _generate_composition(self, composition_type):
        if composition_type == 'random':
            return [random.choice(['A', 'B', 'C']) for _ in range(self.length)]
        else:
            return ['A'] * self.length

    def _generate_bond_strengths(self):
        return [random.uniform(0.5, 1.5) for _ in range(self.length - 1)]

    def get_features(self):
        return {
            'length': self.length,
            'composition': self.composition,
            'avg_bond_strength': sum(self.bond_strengths) / len(self.bond_strengths)
        }

    def to_dict(self):
        return {
            'length': self.length,
            'composition': self.composition,
            'bond_strengths': self.bond_strengths
        }

def simulate_polymer(length, composition):
    return PolymerChain(length, composition)