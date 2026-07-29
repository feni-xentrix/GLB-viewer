'use client';
import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import * as THREE from 'three';
import gsap from 'gsap';

export default function RingModel(props: any) {
  const { scene, nodes, materials } = useGLTF('/models/ring/scene.gltf') as any;
  const selectedShape = useConfiguratorStore((state) => state.selectedShape);
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    // Enhance materials for realism
    Object.values(materials).forEach((mat: any) => {
      mat.envMapIntensity = 2.5;
    });

    if (group.current) {
      group.current.scale.set(0.015, 0.015, 0.015);
    }
  }, [materials]);  

  // Handle Shape Switching
  useEffect(() => {
    // 1. ALWAYS show the main ring band and center diamond
    if (nodes['Prongs']) nodes['Prongs'].visible = true;
    if (nodes['ThinRing']) nodes['ThinRing'].visible = true;

    // 2. Side stones configuration (Cumulative addition)
    const sideStones = ['ThinRing1', 'ThinRing2', 'ThinRing3'];
    
    sideStones.forEach((nodeName) => {
      const node = nodes[nodeName];
      if (node) {
        if (!node.userData.initialScale) {
          node.userData.initialScale = node.scale.clone();
        }

        // Determine if this side stone should be visible based on cumulative logic
        let shouldShow = false;
        if (selectedShape === 'ThinRing1' && nodeName === 'ThinRing1') shouldShow = true;
        if (selectedShape === 'ThinRing2' && (nodeName === 'ThinRing1' || nodeName === 'ThinRing2')) shouldShow = true;
        if (selectedShape === 'ThinRing3' && (nodeName === 'ThinRing1' || nodeName === 'ThinRing2' || nodeName === 'ThinRing3')) shouldShow = true;

        if (shouldShow) {
          node.visible = true;
          node.scale.copy(node.userData.initialScale);
        } else {
          node.visible = false;
        }
      }
    });
  }, [selectedShape, nodes]);

  // Use a smaller scale since the model bounds are large
  return (
    <group ref={group} {...props} dispose={null} scale={0.015} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/ring/scene.gltf');
