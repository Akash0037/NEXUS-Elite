
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FloatingObject = ({ position, color, speed, distort }: any) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time / 4);
    mesh.current.rotation.y = Math.cos(time / 4);
    mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} ref={mesh}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const ParticleSystem = () => {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  const mesh = useRef<THREE.Points>(null!);
  useFrame((state) => {
    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.x += 0.0005;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#facc15" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#facc15" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />

        <FloatingObject position={[-4, 2, 0]} color="#FACC15" speed={2} distort={0.4} />
        <FloatingObject position={[4, -1, -2]} color="#3B82F6" speed={1.5} distort={0.3} />
        <FloatingObject position={[0, -3, 2]} color="#ffffff" speed={2.5} distort={0.5} />
        
        <Sphere args={[2, 64, 64]} position={[0, 0, -5]}>
          <MeshWobbleMaterial color="#111" factor={0.6} speed={1} roughness={0} metalness={1} />
        </Sphere>

        <ParticleSystem />
        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
