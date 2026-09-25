'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  isDeconstructed?: boolean;
}

function TopologyNetwork({ isDeconstructed = false }: Props) {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => [
    { label: 'Chime SDK', base: [-2.2, 0.9, 0] },
    { label: 'Lambda', base: [-0.8, -0.6, 0.4] },
    { label: 'DynamoDB', base: [1.2, -0.8, -0.2] },
    { label: 'Lex AI', base: [2.1, 0.7, 0.2] },
    { label: 'S3 / KMS', base: [0.0, 1.3, -0.3] },
  ], []);

  // Connection lines buffer
  const linePositions = useMemo(() => {
    const pairs = [
      [0, 1], [1, 2], [1, 4], [0, 4], [3, 2], [3, 4]
    ];
    const pos = new Float32Array(pairs.length * 2 * 3);
    return { pairs, pos };
  }, []);

  const linesRef = useRef<THREE.LineSegments>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.12;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;

    if (linesRef.current) {
      const spread = isDeconstructed ? 1.4 : 1.0;
      const attr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;

      linePositions.pairs.forEach((pair, idx) => {
        const p1 = nodes[pair[0]].base;
        const p2 = nodes[pair[1]].base;
        const o = idx * 6;
        arr[o] = p1[0] * spread;
        arr[o + 1] = p1[1] * spread;
        arr[o + 2] = p1[2] * spread;
        arr[o + 3] = p2[0] * spread;
        arr[o + 4] = p2[1] * spread;
        arr[o + 5] = p2[2] * spread;
      });

      attr.needsUpdate = true;
    }
  });

  const spread = isDeconstructed ? 1.4 : 1.0;

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <group
          key={node.label}
          position={[
            node.base[0] * spread,
            node.base[1] * spread,
            node.base[2] * spread,
          ]}
        >
          <mesh>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshBasicMaterial color="#6366F1" transparent opacity={0.65} />
          </mesh>
          <mesh scale={1.9}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshBasicMaterial color="#818CF8" transparent opacity={0.2} wireframe />
          </mesh>
        </group>
      ))}

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.pairs.length * 2}
            array={linePositions.pos}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#6366F1" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

export function EduConnectArchitectureCanvas({ isDeconstructed = false }: Props) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-45 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.9} />
        <TopologyNetwork isDeconstructed={isDeconstructed} />
      </Canvas>
    </div>
  );
}

export default EduConnectArchitectureCanvas;
