'use client';
import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

export default function WhiteRingModel(props: any) {
  const { scene, materials } = useGLTF('/models/ring/white.glb') as any;
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    // Enhance materials for realism
    if (materials) {
      Object.values(materials).forEach((mat: any) => {
        mat.envMapIntensity = 2.5;
      });
    }

    // Animate in
    if (group.current) {
      gsap.fromTo(group.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 75, y: 75, z: 75, duration: 1.5, ease: 'back.out(1.2)' }
      );
    }
  }, [materials]);  

  return (
    <group ref={group} {...props} dispose={null} scale={75} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/ring/white.glb');
