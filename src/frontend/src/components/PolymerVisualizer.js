import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

const textures = {
  a: `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <circle cx="32" cy="32" r="30" fill="red" />
      <text x="32" y="38" font-size="24" text-anchor="middle" fill="white">A</text>
    </svg>
  `,
  b: `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <circle cx="32" cy="32" r="30" fill="green" />
      <text x="32" y="38" font-size="24" text-anchor="middle" fill="white">B</text>
    </svg>
  `,
  c: `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <circle cx="32" cy="32" r="30" fill="blue" />
      <text x="32" y="38" font-size="24" text-anchor="middle" fill="white">C</text>
    </svg>
  `,
};

function Atom({ element, position }) {
  const meshRef = useRef();
  const texture = useMemo(() => {
    const svgString = textures[element.toLowerCase()];
    const encodedSvg = encodeURIComponent(svgString);
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
    return new THREE.TextureLoader().load(dataUrl);
  }, [element]);

  useFrame((state) => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <motion.mesh
      ref={meshRef}
      position={position}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: position[0] * 0.1 }}
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </motion.mesh>
  );
}

function Bond({ start, end, strength }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="white" linewidth={1 + strength * 3} />
    </line>
  );
}

function Polymer({ structure }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  if (!structure) return null;

  const { composition, bond_strengths } = structure;

  return (
    <group ref={groupRef}>
      {composition.map((element, index) => (
        <React.Fragment key={index}>
          <Atom 
            element={element} 
            position={[index * 0.8 - composition.length * 0.4, 0, 0]} 
          />
          {index < composition.length - 1 && (
            <Bond 
              start={[index * 0.8 - composition.length * 0.4, 0, 0]}
              end={[(index + 1) * 0.8 - composition.length * 0.4, 0, 0]}
              strength={bond_strengths[index]}
            />
          )}
        </React.Fragment>
      ))}
    </group>
  );
}

function Stars() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 100;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.01} color="white" />
    </points>
  );
}

function PolymerVisualizer({ simulationResults }) {
  console.log('PolymerVisualizer rendering', simulationResults);
  return (
    <div className="w-full h-96 mb-6 bg-gray-900 rounded-lg shadow-inner">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {simulationResults && <Polymer structure={simulationResults.polymer_structure} />}
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <Stars />
      </Canvas>
    </div>
  );
}

export default PolymerVisualizer;