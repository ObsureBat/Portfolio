'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { getSubProgress, smoothStep, smootherStep } from '@/components/sections/research/ResearchTimelineController';

// -------------------------------------------------------------
// 1. Virtual Camera Rig (Continuous C1 Catmull-Rom Spline Path)
// -------------------------------------------------------------
function VirtualCameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const isReducedMotion = useAppStore((s) => s.isReducedMotion);

  // Pre-generate smooth, continuous 3D camera trajectory across all 8 chapters.
  // Catmull-Rom splines eliminate discrete coordinate jumps and velocity hiccups.
  const { cameraCurve, lookAtCurve } = useMemo(() => {
    const camPoints = [
      new THREE.Vector3(-0.35, 0.05, 4.6),  // Ch 01: Signal (wide left overview)
      new THREE.Vector3(-0.18, 0.05, 3.8),  // Ch 01 -> 02 transition
      new THREE.Vector3(0.05, 0.05, 2.9),   // Ch 02: Traffic (gliding through packet streams)
      new THREE.Vector3(0.22, 0.12, 3.4),   // Ch 03: Detection Triad (subtle angle)
      new THREE.Vector3(0.00, 0.00, 2.3),   // Ch 04: Fusion Core (pushing in close)
      new THREE.Vector3(0.00, 0.00, 3.5),   // Ch 05: Benchmark Result (balanced hero view)
      new THREE.Vector3(-0.25, 0.00, 4.0),  // Ch 06: AGESIFY Membrane (angled for incoming packet)
      new THREE.Vector3(0.00, 0.32, 4.6),   // Ch 07: Cloud Topology (elevated isometric view)
      new THREE.Vector3(0.00, 0.10, 5.4),   // Ch 08: Final Synthesis & Defense Overview
    ];

    const lookPoints = [
      new THREE.Vector3(0.20, 0.00, 0.0),   // Ch 01
      new THREE.Vector3(0.08, 0.00, 0.0),   // Ch 02
      new THREE.Vector3(0.00, 0.02, 0.0),   // Ch 03
      new THREE.Vector3(0.00, 0.00, 0.0),   // Ch 04
      new THREE.Vector3(0.00, 0.00, 0.0),   // Ch 05
      new THREE.Vector3(0.00, 0.00, 0.0),   // Ch 06
      new THREE.Vector3(0.00, 0.05, 0.0),   // Ch 07
      new THREE.Vector3(0.00, 0.00, 0.0),   // Ch 08
    ];

    return {
      cameraCurve: new THREE.CatmullRomCurve3(camPoints, false, 'centripetal'),
      lookAtCurve: new THREE.CatmullRomCurve3(lookPoints, false, 'centripetal'),
    };
  }, []);

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const tempPos = useMemo(() => new THREE.Vector3(), []);
  const tempLook = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const mousePos = useAppStore.getState().mousePos;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    cameraCurve.getPoint(clampedProgress, tempPos);
    lookAtCurve.getPoint(clampedProgress, tempLook);

    // Subtle restrained mouse parallax (max 0.16 units)
    const parallaxX = isReducedMotion ? 0 : mousePos.x * 0.16;
    const parallaxY = isReducedMotion ? 0 : mousePos.y * 0.10;

    tempPos.x += parallaxX;
    tempPos.y += parallaxY;

    // Smooth lerp for buttery camera feel
    camera.position.lerp(tempPos, 0.12);
    currentLookAt.current.lerp(tempLook, 0.12);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// -------------------------------------------------------------
// 2. Neural Network Mesh with Zero-Allocation Spring Physics
// -------------------------------------------------------------
interface NodeData {
  home: [number, number, number];
  homeVec: THREE.Vector3;
  current: THREE.Vector3;
  velocity: THREE.Vector3;
  anchorType?: 'transformer' | 'bilstm' | 'cnn';
}

function NeuralNetworkMesh({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const setIsHoveringInteractive = useAppStore((s) => s.setIsHoveringInteractive);
  const isReducedMotion = useAppStore((s) => s.isReducedMotion);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-allocated vectors for frame loop calculations (zero GC churn)
  const tempMouseTarget = useMemo(() => new THREE.Vector3(), []);
  const tempPullDir = useMemo(() => new THREE.Vector3(), []);
  const tempDisplacement = useMemo(() => new THREE.Vector3(), []);
  const tempSpringForce = useMemo(() => new THREE.Vector3(), []);

  // Opacity & visibility: smooth fade across chapter 01 and early chapter 02
  const opacity = useMemo(() => {
    if (progress < 0.12) return 1.0;
    if (progress < 0.25) {
      return 1.0 - smootherStep(getSubProgress(progress, [0.12, 0.25]));
    }
    return 0.0;
  }, [progress]);

  // Generate 78 nodes across multiple depth layers
  const { nodes, linePairs, linePositions } = useMemo(() => {
    const list: NodeData[] = [];
    const count = 78;

    // Fixed model anchor positions (asymmetrical, spatial layout)
    list.push({
      home: [-0.85, 0.75, 0.4],
      homeVec: new THREE.Vector3(-0.85, 0.75, 0.4),
      current: new THREE.Vector3(-0.85, 0.75, 0.4),
      velocity: new THREE.Vector3(),
      anchorType: 'transformer',
    });
    list.push({
      home: [1.25, 0.15, 0.5],
      homeVec: new THREE.Vector3(1.25, 0.15, 0.5),
      current: new THREE.Vector3(1.25, 0.15, 0.5),
      velocity: new THREE.Vector3(),
      anchorType: 'cnn',
    });
    list.push({
      home: [0.10, -0.85, -0.1],
      homeVec: new THREE.Vector3(0.10, -0.85, -0.1),
      current: new THREE.Vector3(0.10, -0.85, -0.1),
      velocity: new THREE.Vector3(),
      anchorType: 'bilstm',
    });

    // Random but seeded spatial field nodes
    for (let i = 3; i < count; i++) {
      const u = (i / count) * Math.PI * 2;
      const rad = 0.5 + (((i * 17) % 100) / 100) * 1.5;
      const x = Math.cos(u) * rad * 1.2 + (((i * 31) % 50) - 25) / 60;
      const y = Math.sin(u) * rad * 0.9 + (((i * 47) % 50) - 25) / 60;
      const z = (((i * 53) % 100) - 50) / 45;

      list.push({
        home: [x, y, z],
        homeVec: new THREE.Vector3(x, y, z),
        current: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(),
      });
    }

    // Connect nodes that are close to each other
    const pairs: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      let connections = 0;
      for (let j = i + 1; j < count; j++) {
        const dx = list[i].home[0] - list[j].home[0];
        const dy = list[i].home[1] - list[j].home[1];
        const dz = list[i].home[2] - list[j].home[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 0.65 && connections < 4) {
          pairs.push([i, j]);
          connections++;
        }
      }
    }

    const posArray = new Float32Array(pairs.length * 2 * 3);
    return { nodes: list, linePairs: pairs, linePositions: posArray };
  }, []);

  const hoveredAnchor = useRef<string | null>(null);

  useFrame((state) => {
    if (opacity <= 0.001 || !meshRef.current) return;

    const mousePos = useAppStore.getState().mousePos;
    // Convert mouse 2D into approximate 3D plane at z=0.2 (no allocations)
    tempMouseTarget.set(mousePos.x * 2.2, mousePos.y * 1.6, 0.2);

    let nearestAnchor: string | null = null;
    let minAnchorDist = Infinity;

    const springK = 0.14;
    const damping = 0.82;

    for (let idx = 0; idx < nodes.length; idx++) {
      const node = nodes[idx];

      if (!isReducedMotion) {
        // Proximity attraction: nodes move subtly toward mouse if within radius
        const distToMouse = node.current.distanceTo(tempMouseTarget);
        if (distToMouse < 0.95) {
          tempPullDir.subVectors(tempMouseTarget, node.current).normalize();
          const force = (1 - distToMouse / 0.95) * 0.08;
          node.velocity.addScaledVector(tempPullDir, force);

          if (node.anchorType && distToMouse < minAnchorDist) {
            minAnchorDist = distToMouse;
            nearestAnchor = node.anchorType;
          }
        }
      }

      // Spring force returning to home (zero GC)
      tempDisplacement.subVectors(node.homeVec, node.current);
      tempSpringForce.copy(tempDisplacement).multiplyScalar(springK);
      node.velocity.add(tempSpringForce);
      node.velocity.multiplyScalar(damping);
      node.current.add(node.velocity);

      // Subtle ambient breathe
      const ambientY = Math.sin(state.clock.elapsedTime * 1.2 + idx * 0.3) * 0.012;

      // Update InstancedMesh transform
      dummy.position.copy(node.current);
      dummy.position.y += ambientY;

      const scale = node.anchorType ? 0.075 : 0.042;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(idx, dummy.matrix);
    }

    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    // Update lines geometry efficiently
    if (linesRef.current) {
      const attr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = attr.array as Float32Array;

      for (let i = 0; i < linePairs.length; i++) {
        const p1 = nodes[linePairs[i][0]].current;
        const p2 = nodes[linePairs[i][1]].current;
        const idx = i * 6;
        array[idx] = p1.x;
        array[idx + 1] = p1.y;
        array[idx + 2] = p1.z;
        array[idx + 3] = p2.x;
        array[idx + 4] = p2.y;
        array[idx + 5] = p2.z;
      }

      attr.needsUpdate = true;
    }

    // Contextual cursor interactive hover state
    if (nearestAnchor !== hoveredAnchor.current) {
      hoveredAnchor.current = nearestAnchor;
      setIsHoveringInteractive(!!nearestAnchor);
    }
  });

  useEffect(() => {
    return () => setIsHoveringInteractive(false);
  }, [setIsHoveringInteractive]);

  if (opacity <= 0.001) {
    if (hoveredAnchor.current) {
      hoveredAnchor.current = null;
      setIsHoveringInteractive(false);
    }
    return null;
  }

  return (
    <group>
      {/* Node Instanced Spheres */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, nodes.length]}
      >
        <sphereGeometry args={[1, 14, 14]} />
        <meshPhysicalMaterial
          color="#4F46E5"
          emissive="#6366F1"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          transparent
          opacity={opacity * 0.92}
        />
      </instancedMesh>

      {/* Connection Lines Buffer */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePairs.length * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366F1"
          transparent
          opacity={opacity * 0.22}
          linewidth={1}
        />
      </lineSegments>

      {/* Floating Spatial 3D HTML Labels */}
      {opacity > 0.3 && (
        <>
          <Html position={[-0.85, 0.95, 0.4]} center distanceFactor={6}>
            <div className="pointer-events-none select-none px-2.5 py-1 rounded-full bg-neutral-900/90 text-neutral-100 font-mono text-[10px] tracking-widest uppercase border border-indigo-400/40 shadow-md flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span>TRANSFORMER</span>
            </div>
          </Html>
          <Html position={[1.25, 0.35, 0.5]} center distanceFactor={6}>
            <div className="pointer-events-none select-none px-2.5 py-1 rounded-full bg-neutral-900/90 text-neutral-100 font-mono text-[10px] tracking-widest uppercase border border-indigo-400/40 shadow-md flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span>CNN</span>
            </div>
          </Html>
          <Html position={[0.10, -1.05, -0.1]} center distanceFactor={6}>
            <div className="pointer-events-none select-none px-2.5 py-1 rounded-full bg-neutral-900/90 text-neutral-100 font-mono text-[10px] tracking-widest uppercase border border-indigo-400/40 shadow-md flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span>BiLSTM</span>
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// 3. Traffic Stream Particles (Chapter 02 & 03: Normal vs Suspicious)
// -------------------------------------------------------------
interface ParticleData {
  type: 'normal' | 'ddos' | 'sqli' | 'path';
  offset: number;
  speed: number;
  lane: number;
  radius: number;
  currentPos: THREE.Vector3;
}

function TrafficStreamParticles({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Active during chapter 02 and smoothly converges into chapter 03
  const opacity = useMemo(() => {
    if (progress < 0.10) return 0;
    if (progress < 0.15) return smootherStep(getSubProgress(progress, [0.10, 0.15]));
    if (progress < 0.24) return 1.0;
    if (progress < 0.32) return 1.0 - smootherStep(getSubProgress(progress, [0.24, 0.32]));
    return 0.0;
  }, [progress]);

  const particleCount = 240;
  const particles = useMemo<ParticleData[]>(() => {
    const list: ParticleData[] = [];
    for (let i = 0; i < particleCount; i++) {
      const isSuspicious = i % 4 === 0;
      let type: ParticleData['type'] = 'normal';
      if (isSuspicious) {
        if (i % 3 === 0) type = 'ddos';
        else if (i % 3 === 1) type = 'sqli';
        else type = 'path';
      }
      list.push({
        type,
        offset: (i / particleCount) * Math.PI * 4,
        speed: isSuspicious ? 0.024 : 0.012,
        lane: (i % 6) - 2.5,
        radius: 0.6 + (i % 5) * 0.28,
        currentPos: new THREE.Vector3(),
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    if (opacity <= 0.001 || !meshRef.current) return;

    const time = state.clock.elapsedTime;
    const convergeFactor = progress > 0.24 ? Math.min(1, (progress - 0.24) / 0.14) : 0;

    for (let idx = 0; idx < particles.length; idx++) {
      const p = particles[idx];
      // Flow along multi-lane spatial spline toward center
      const t = (p.offset + time * p.speed * 60) % (Math.PI * 2);
      const laneSpread = (1 - convergeFactor * 0.75) * (p.lane * 0.35);

      const x = Math.sin(t) * p.radius * (1 - convergeFactor * 0.6) + laneSpread;
      const y = Math.cos(t * 1.5) * 0.6 * (1 - convergeFactor * 0.6);
      const z = Math.cos(t) * 1.2 * (1 - convergeFactor * 0.5) - convergeFactor * 0.4;

      dummy.position.set(x, y, z);

      const s = p.type === 'normal' ? 0.024 : 0.038;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(idx, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (opacity <= 0.001) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial
        color="#6366F1"
        transparent
        opacity={opacity * 0.85}
      />
    </instancedMesh>
  );
}

// -------------------------------------------------------------
// 4. Model Triad Convergence, Spherical Fusion & Benchmark Halo (Ch 03, 04, 05)
// -------------------------------------------------------------
function FusionCore({ progress }: { progress: number }) {
  const coreRef = useRef<THREE.Group>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Group>(null!);

  // Visible across Chapter 03, 04, and prominently celebrated through Chapter 05 (0.24 -> 0.70)
  // Eliminates previous dead gaps in Chapter 5!
  const opacity = useMemo(() => {
    if (progress < 0.24) return 0;
    if (progress < 0.30) return smootherStep(getSubProgress(progress, [0.24, 0.30]));
    if (progress < 0.63) return 1.0;
    if (progress < 0.69) return 1.0 - smootherStep(getSubProgress(progress, [0.63, 0.69]));
    return 0.0;
  }, [progress]);

  // Convergence parameter: converges smoothly during Chapter 04 (0.38 -> 0.48)
  const mergeFactor = useMemo(() => {
    return smootherStep(getSubProgress(progress, [0.38, 0.48]));
  }, [progress]);

  // Pre-allocate geometries to avoid GC churn
  const octaGeom = useMemo(() => new THREE.OctahedronGeometry(0.24, 0), []);
  const icosaGeom = useMemo(() => new THREE.IcosahedronGeometry(0.24, 0), []);
  const dodecaGeom = useMemo(() => new THREE.DodecahedronGeometry(0.24, 0), []);
  const octaEdges = useMemo(() => new THREE.EdgesGeometry(octaGeom), [octaGeom]);
  const icosaEdges = useMemo(() => new THREE.EdgesGeometry(icosaGeom), [icosaGeom]);
  const dodecaEdges = useMemo(() => new THREE.EdgesGeometry(dodecaGeom), [dodecaGeom]);

  useFrame((state) => {
    if (opacity <= 0.001) return;
    const t = state.clock.elapsedTime;

    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.4;
      sphereRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      const pulse = 1 + Math.sin(t * 2.5) * 0.04;
      sphereRef.current.scale.setScalar(0.75 * pulse);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.35;
      ringRef.current.rotation.y = t * 0.20;
    }
  });

  if (opacity <= 0.001) return null;

  const triadSpread = (1 - mergeFactor) * 1.5;

  return (
    <group ref={coreRef} position={[0, 0, 0]}>
      {/* 3 Converging Frosted Polyhedra (Transformer, BiLSTM, CNN) */}
      {mergeFactor < 0.96 && (
        <>
          {/* Transformer node cluster */}
          <group position={[-triadSpread * 1.05, triadSpread * 0.48, 0]}>
            <mesh geometry={octaGeom}>
              <meshPhysicalMaterial
                color="#FFFFFF"
                emissive="#6366F1"
                emissiveIntensity={0.25}
                roughness={0.15}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                metalness={0.05}
                transparent
                opacity={opacity * 0.9}
              />
            </mesh>
            <lineSegments geometry={octaEdges}>
              <lineBasicMaterial color="#6366F1" transparent opacity={opacity * 0.8} />
            </lineSegments>
            <Html position={[0, -0.38, 0]} center distanceFactor={5.5}>
              <div className="pointer-events-none select-none px-2.5 py-0.5 rounded-full bg-white/90 border border-neutral-300/80 text-neutral-900 font-mono text-[9px] font-bold tracking-wider shadow-2xs">
                TRANSFORMER
              </div>
            </Html>
          </group>

          {/* BiLSTM node cluster */}
          <group position={[0, -triadSpread * 0.85, 0]}>
            <mesh geometry={icosaGeom}>
              <meshPhysicalMaterial
                color="#FFFFFF"
                emissive="#4F46E5"
                emissiveIntensity={0.25}
                roughness={0.15}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                metalness={0.05}
                transparent
                opacity={opacity * 0.9}
              />
            </mesh>
            <lineSegments geometry={icosaEdges}>
              <lineBasicMaterial color="#4F46E5" transparent opacity={opacity * 0.8} />
            </lineSegments>
            <Html position={[0, 0.38, 0]} center distanceFactor={5.5}>
              <div className="pointer-events-none select-none px-2.5 py-0.5 rounded-full bg-white/90 border border-neutral-300/80 text-neutral-900 font-mono text-[9px] font-bold tracking-wider shadow-2xs">
                BiLSTM
              </div>
            </Html>
          </group>

          {/* CNN node cluster */}
          <group position={[triadSpread * 1.05, triadSpread * 0.48, 0]}>
            <mesh geometry={dodecaGeom}>
              <meshPhysicalMaterial
                color="#FFFFFF"
                emissive="#818CF8"
                emissiveIntensity={0.25}
                roughness={0.15}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                metalness={0.05}
                transparent
                opacity={opacity * 0.9}
              />
            </mesh>
            <lineSegments geometry={dodecaEdges}>
              <lineBasicMaterial color="#818CF8" transparent opacity={opacity * 0.8} />
            </lineSegments>
            <Html position={[0, -0.38, 0]} center distanceFactor={5.5}>
              <div className="pointer-events-none select-none px-2.5 py-0.5 rounded-full bg-white/90 border border-neutral-300/80 text-neutral-900 font-mono text-[9px] font-bold tracking-wider shadow-2xs">
                CNN
              </div>
            </Html>
          </group>
        </>
      )}

      {/* Central Spherical Translucent Fusion Core */}
      {mergeFactor > 0.3 && (
        <group scale={mergeFactor}>
          <mesh ref={sphereRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              color="#F8FAFC"
              emissive="#6366F1"
              emissiveIntensity={0.25}
              roughness={0.15}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              metalness={0.05}
              transparent
              opacity={opacity * 0.95}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Chapter 05: Benchmark Accuracy Orbital Ring & Telemetry Halo */}
          {mergeFactor > 0.8 && (
            <group ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
              <mesh>
                <torusGeometry args={[1.32, 0.012, 16, 64]} />
                <meshBasicMaterial
                  color="#6366F1"
                  transparent
                  opacity={opacity * 0.65}
                />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 4]}>
                <torusGeometry args={[1.52, 0.008, 16, 64]} />
                <meshBasicMaterial
                  color="#818CF8"
                  transparent
                  opacity={opacity * 0.45}
                />
              </mesh>
            </group>
          )}

          {/* FUSED Badge inside Core - Persistent CSS opacity without mounting thrash */}
          <Html position={[0, 0, 0]} center distanceFactor={5}>
            <div 
              style={{ 
                opacity: mergeFactor > 0.85 ? Math.min(1, (mergeFactor - 0.85) / 0.1) : 0,
                transition: 'opacity 0.2s ease',
              }}
              className="pointer-events-none select-none text-center"
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-indigo-950 bg-white/95 px-3 py-1 rounded-full border border-indigo-200 shadow-lg">
                FUSED
              </span>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// 5. AGESIFY Abstract Elliptical Defense Membrane (Chapter 06)
// -------------------------------------------------------------
function DefenseMembrane({ progress }: { progress: number }) {
  const membraneRef = useRef<THREE.Mesh>(null!);
  const packetRef = useRef<THREE.Mesh>(null!);
  const policyBadgeRef = useRef<HTMLDivElement>(null!);
  const policyTextRef = useRef<HTMLSpanElement>(null!);

  // Active during Chapter 06 (0.63 to 0.80) - continuous overlap with Chapter 5 & 7
  const opacity = useMemo(() => {
    if (progress < 0.63) return 0;
    if (progress < 0.68) return smootherStep(getSubProgress(progress, [0.63, 0.68]));
    if (progress < 0.74) return 1.0;
    if (progress < 0.80) return 1.0 - smootherStep(getSubProgress(progress, [0.74, 0.80]));
    return 0.0;
  }, [progress]);

  useFrame((state) => {
    if (opacity <= 0.001) return;
    const time = state.clock.elapsedTime;

    // Membrane subtle continuous breathing ripple
    if (membraneRef.current) {
      const breath = 1 + Math.sin(time * 2.0) * 0.025;
      membraneRef.current.scale.set(1.45 * breath, 0.95 * breath, 0.6);
      membraneRef.current.rotation.z = Math.sin(time * 0.5) * 0.03;
    }

    // Packet collision & repulsion cycle (~2.5s loop) - zero React state updates!
    const cycle = (time % 2.5) / 2.5; // 0 to 1
    if (packetRef.current) {
      let stepText: string | null = null;
      if (cycle < 0.45) {
        // Approaching from left (-2.5 to -0.8)
        const x = -2.5 + (cycle / 0.45) * 1.7;
        packetRef.current.position.set(x, 0, 0);
        packetRef.current.scale.setScalar(0.08);
        stepText = cycle < 0.18 ? 'DETECTING' : 'PATTERN DETECTED';
      } else if (cycle < 0.55) {
        // Impact & physical ripple
        packetRef.current.position.set(-0.8, 0, 0);
        packetRef.current.scale.setScalar(0.12);
        stepText = 'RULE GENERATED';
      } else {
        // Deflected backwards and dissolving
        const defT = (cycle - 0.55) / 0.45;
        packetRef.current.position.set(-0.8 - defT * 1.4, defT * 0.6, 0);
        packetRef.current.scale.setScalar(0.08 * (1 - defT));
        stepText = cycle < 0.85 ? 'ENFORCED: BLOCKED' : null;
      }

      // Update DOM directly without triggering React re-renders in useFrame
      if (policyBadgeRef.current && policyTextRef.current) {
        if (stepText) {
          policyBadgeRef.current.style.opacity = '1';
          if (policyTextRef.current.textContent !== stepText) {
            policyTextRef.current.textContent = stepText;
          }
        } else {
          policyBadgeRef.current.style.opacity = '0';
        }
      }
    }
  });

  if (opacity <= 0.001) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Abstract Translucent Elliptical Security Membrane */}
      <mesh ref={membraneRef}>
        <sphereGeometry args={[1, 40, 28]} />
        <meshPhysicalMaterial
          color="#EEF2FF"
          emissive="#6366F1"
          emissiveIntensity={0.2}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          metalness={0.05}
          transparent
          opacity={opacity * 0.88}
        />
      </mesh>

      {/* AI ADAPTIVE FIREWALL Center Nucleus */}
      <Html position={[0, 0, 0]} center distanceFactor={5}>
        <div className="pointer-events-none select-none text-center">
          <div className="px-3.5 py-1.5 rounded-xl bg-neutral-900/90 text-white font-mono text-[10px] font-bold tracking-widest uppercase border border-indigo-400/30 shadow-md">
            ADAPTIVE FIREWALL CORE
          </div>
        </div>
      </Html>

      {/* Incoming Malicious Packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={opacity} />
      </mesh>

      {/* Live Temporary Policy Label - DOM updated directly without React re-render spikes */}
      <Html position={[-0.8, -0.5, 0]} center distanceFactor={5}>
        <div 
          ref={policyBadgeRef}
          style={{ opacity: 0, transition: 'opacity 0.15s ease' }}
          className="pointer-events-none select-none px-2.5 py-1 rounded bg-neutral-950 text-white font-mono text-[9.5px] font-bold tracking-widest uppercase border border-red-500/40 shadow-lg flex items-center gap-1.5 whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          <span ref={policyTextRef}>DETECTING</span>
        </div>
      </Html>
    </group>
  );
}

// -------------------------------------------------------------
// 6. Cloud Topology Architecture (Chapter 07 & Macro Ch 08 Backdrop)
// -------------------------------------------------------------
function CloudTopology({ progress }: { progress: number }) {
  const setIsHoveringInteractive = useAppStore((s) => s.setIsHoveringInteractive);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    return () => setIsHoveringInteractive(false);
  }, [setIsHoveringInteractive]);

  // Active during Chapter 07 (0.75 to 0.88), settles into calm backdrop in Ch 08 (~0.35 opacity)
  // Eliminates dead 3D scene gaps in Chapter 8!
  const opacity = useMemo(() => {
    if (progress < 0.75) return 0;
    if (progress < 0.80) return smootherStep(getSubProgress(progress, [0.75, 0.80]));
    if (progress < 0.88) return 1.0;
    if (progress < 0.96) return 1.0 - smootherStep(getSubProgress(progress, [0.88, 0.96])) * 0.65;
    return 0.0;
  }, [progress]);

  const nodes = useMemo(() => [
    { id: 'waf', label: 'AWS WAF', pos: [-2.0, 0.8, 0] as [number, number, number], meta: 'Layer 7 Filter · Edge Enforcement' },
    { id: 'guardduty', label: 'GuardDuty', pos: [2.0, 0.8, 0] as [number, number, number], meta: 'Continuous Threat Anomaly Feed' },
    { id: 'cloudwatch', label: 'CloudWatch', pos: [2.0, -0.8, 0] as [number, number, number], meta: 'Real-Time Telemetry & Alarms' },
    { id: 'lambda', label: 'Lambda', pos: [-2.0, -0.8, 0] as [number, number, number], meta: 'Automated Response & IP Block' },
  ], []);

  // Pre-allocate geometries
  const boxGeom = useMemo(() => new THREE.BoxGeometry(0.44, 0.44, 0.44), []);
  const boxEdgesGeom = useMemo(() => new THREE.EdgesGeometry(boxGeom), [boxGeom]);
  const cylinderGeom = useMemo(() => new THREE.CylinderGeometry(0.45, 0.45, 0.14, 32), []);
  const cylinderEdgesGeom = useMemo(() => new THREE.EdgesGeometry(cylinderGeom), [cylinderGeom]);
  const sphereNucleusGeom = useMemo(() => new THREE.SphereGeometry(1, 16, 16), []);

  const connectionLines = useMemo(() => {
    return nodes.map((node) => {
      const geom = new THREE.BufferGeometry();
      geom.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array([0, 0, 0, -node.pos[0], -node.pos[1], -node.pos[2]]), 3)
      );
      return geom;
    });
  }, [nodes]);

  if (opacity <= 0.001) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Central Hub: AGESIFY */}
      <mesh geometry={cylinderGeom}>
        <meshPhysicalMaterial
          color="#0F172A"
          emissive="#6366F1"
          emissiveIntensity={0.25}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          metalness={0.1}
          transparent
          opacity={opacity * 0.95}
        />
      </mesh>
      <lineSegments geometry={cylinderEdgesGeom}>
        <lineBasicMaterial color="#6366F1" transparent opacity={opacity * 0.6} />
      </lineSegments>

      <Html position={[0, 0.35, 0]} center distanceFactor={5.5}>
        <div className="pointer-events-none select-none px-3.5 py-1.5 rounded-lg bg-neutral-900/95 text-white font-mono text-[10px] font-bold tracking-widest uppercase border border-indigo-400/40 shadow-lg">
          AGESIFY CORE
        </div>
      </Html>

      {/* Orbiting Service Nodes with Contextual Hover */}
      {nodes.map((node, idx) => {
        const isHovered = hoveredNode === node.id;
        return (
          <group key={node.id} position={node.pos}>
            {/* Connection line to center */}
            <lineSegments geometry={connectionLines[idx]}>
              <lineBasicMaterial color="#6366F1" transparent opacity={opacity * 0.35} />
            </lineSegments>

            {/* Node Frosted Glass Object with Hairline Outline */}
            <group scale={isHovered ? 1.25 : 1.0}>
              <mesh
                geometry={boxGeom}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHoveredNode(node.id);
                  setIsHoveringInteractive(true);
                }}
                onPointerOut={() => {
                  setHoveredNode(null);
                  setIsHoveringInteractive(false);
                }}
              >
                <meshPhysicalMaterial
                  color={isHovered ? '#6366F1' : '#FFFFFF'}
                  emissive={isHovered ? '#4338CA' : '#6366F1'}
                  emissiveIntensity={isHovered ? 0.35 : 0.08}
                  roughness={0.15}
                  clearcoat={1.0}
                  clearcoatRoughness={0.1}
                  metalness={0.05}
                  transparent
                  opacity={opacity * 0.92}
                />
              </mesh>

              {/* Crisp hairline edges outline */}
              <lineSegments geometry={boxEdgesGeom}>
                <lineBasicMaterial color={isHovered ? '#4F46E5' : '#CBD5E1'} transparent opacity={opacity * 0.8} />
              </lineSegments>

              {/* Micro glowing inner nucleus */}
              <mesh geometry={sphereNucleusGeom} scale={0.12}>
                <meshBasicMaterial color={isHovered ? '#818CF8' : '#6366F1'} transparent opacity={opacity * 0.85} />
              </mesh>
            </group>

            {/* Floating Spatial Label + Contextual Meta on Hover */}
            <Html position={[0, 0.45, 0]} center distanceFactor={5}>
              <div className="pointer-events-none select-none flex flex-col items-center gap-1 transition-transform duration-200">
                <span className="px-2.5 py-1 rounded bg-white/95 border border-neutral-300/80 text-neutral-900 font-mono text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                  {node.label}
                </span>
                {isHovered && (
                  <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-200 font-mono text-[8px] whitespace-nowrap border border-white/10 shadow-md animate-fade-in">
                    {node.meta}
                  </span>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// -------------------------------------------------------------
// 7. Master Research 3D Scene Root
// -------------------------------------------------------------
export function ResearchSceneCanvas({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-10">
      <Canvas
        camera={{ position: [-0.35, 0.05, 4.6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} />
        <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#6366F1" />

        {/* Dynamic Scroll-Driven Continuous Spline Camera Rig */}
        <VirtualCameraRig progress={progress} />

        {/* 3D Visual Narrative Components */}
        <NeuralNetworkMesh progress={progress} />
        <TrafficStreamParticles progress={progress} />
        <FusionCore progress={progress} />
        <DefenseMembrane progress={progress} />
        <CloudTopology progress={progress} />
      </Canvas>
    </div>
  );
}

export default ResearchSceneCanvas;
