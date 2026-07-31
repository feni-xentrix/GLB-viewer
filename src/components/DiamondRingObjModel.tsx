import { useLoader } from '@react-three/fiber';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function DiamondRingObjModel(props: any) {
  const materials = useLoader(MTLLoader, '/models/round-cut-diamond-tapered-shank-ring-(obj).mtl');
  const obj = useLoader(OBJLoader, '/models/round-cut-diamond-tapered-shank-ring-(obj).obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  
  const groupRef = useRef<THREE.Group>(null);

  const copiedScene = useMemo(() => {
    const clone = obj.clone();

    // Create realistic PBR materials
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 1,
      opacity: 1,
      metalness: 0,
      roughness: 0,
      ior: 2.4,
      thickness: 1.5,
      dispersion: 1,
      envMapIntensity: 2.5,
      clearcoat: 1,
      clearcoatRoughness: 0,
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3f3f3,
      metalness: 1,
      roughness: 0.1,
      envMapIntensity: 1.5,
    });

    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        const matName = child.material?.name || '';
        if (matName.includes('WhiteMetal')) {
          child.material = metalMaterial;
        } else {
          child.material = diamondMaterial;
        }
      }
    });

    // Reset rotation and position inside the clone so Center works perfectly
    clone.position.set(0, 0, 0);
    return clone;
  }, [obj]);

  useEffect(() => {
    if (groupRef.current) {
      // Entrance animation similar to the yellow ring
      gsap.fromTo(groupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 0.1, y: 0.1, z: 0.1, duration: 1.5, ease: 'back.out(1.2)' }
      );
    }
  }, [copiedScene]);

  return (
    // Rotate -90 degrees on X-axis to fix Z-up models (lying flat) to Y-up (standing up)
    <group ref={groupRef} {...props} rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={copiedScene} />
    </group>
  );
}