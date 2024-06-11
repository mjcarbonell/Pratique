import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Car({ radius = 5, speed = 0.01, centerX = 0, centerZ = 0, centerY = 0.5, ...props }) {
  const { nodes, materials } = useGLTF('./models/car/model.gltf');
  const carRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const x = centerX + radius * Math.cos(t);
    const z = centerZ + radius * Math.sin(t);
    if (carRef.current) {
      carRef.current.position.set(x, centerY, z);

      // Calculate the angle based on the car's position
      const angle = Math.atan2(z - centerZ, x - centerX);
      carRef.current.rotation.y = angle + Math.PI / 1; // Adjust to orient the car correctly
    }
  });

  return (
    <group ref={carRef} {...props} dispose={null}>
      <mesh geometry={nodes.tmplj4peh38.geometry} material={materials['Material.006']} scale={0.546} />
    </group>
  );
}

useGLTF.preload('./models/car/model.gltf');
