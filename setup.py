from setuptools import setup, find_packages

setup(
    name="quantumwaste",
    version="0.1.0",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "flask",
        "flask-cors",
        "pennylane",
        "numpy",
        "scikit-learn",
        "joblib",
        "pyyaml",
        "python-dotenv",
    ],
    extras_require={
        "dev": [
            "pytest",
            "black",
            "flake8",
        ],
    },
    entry_points={
        "console_scripts": [
            "quantumwaste=backend.app:main",
        ],
    },
)