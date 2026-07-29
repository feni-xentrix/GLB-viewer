'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Center, useProgress } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import RingModel from './RingModel';
import WhiteRingModel from './WhiteRingModel';
import YellowRingModel from './YellowRingModel';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import LoadingScreen from './LoadingScreen';

// Preload all models at startup for instant switching
useGLTF.preload('/models/ring/scene.gltf');
useGLTF.preload('/models/ring/white.glb');
useGLTF.preload('/models/ring/yellow.glb');

// ProgressTracker lives INSIDE Canvas — reads useProgress, updates parent via stable ref
function ProgressTracker({ onLoaded }: { onLoaded: () => void }) {
  const { active } = useProgress();
  // Store callback in a ref so the effect never re-runs due to a new function reference
  const onLoadedRef = useRef(onLoaded);
  useEffect(() => { onLoadedRef.current = onLoaded; });

  useEffect(() => {
    if (!active) {
      const t = setTimeout(() => onLoadedRef.current(), 400);
      return () => clearTimeout(t);
    }
  }, [active]); // ← only depends on `active`, not on the callback

  return null;
}

export default function Viewer() {
  const ringType = useConfiguratorStore((state) => state.ringType);
  const isDiamond = ringType === 'white' || ringType === 'yellow';
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoaded = useCallback(() => setIsLoaded(true), []);

  return (
    <div className="w-full h-full absolute inset-0 bg-[#0f1218] transition-colors duration-500">

      {/* Loading overlay — rendered as plain HTML OUTSIDE Canvas */}
      {!isLoaded && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
          <LoadingScreen />
        </div>
      )}

      <Canvas camera={{ position: isDiamond ? [0, 0, 8] : [0, 2, 6], fov: 45 }}>
        <color attach="background" args={['#0f1218']} />

        {/* ProgressTracker is safely inside Canvas */}
        <ProgressTracker onLoaded={handleLoaded} />

        {/* Dynamic Lighting Setup */}
        {isDiamond ? (
          <>
            <ambientLight intensity={0.4} />
            <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={2} castShadow color="#ffffff" />
            <spotLight position={[-5, 5, -5]} angle={0.2} penumbra={1} intensity={1} color="#a0aec0" />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#e2e8f0" />
          </>
        ) : (
          <>
            <ambientLight intensity={0.6} />
            <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
            <spotLight position={[-5, 5, -5]} angle={0.2} penumbra={1} intensity={0.8} />
          </>
        )}

        <Suspense fallback={null}>
          <group position={isDiamond ? [0, 0, 0] : [0, -0.5, 0]}>
            {ringType === 'original' && <RingModel />}
            {isDiamond && (
              <Center>
                {ringType === 'white' && <WhiteRingModel />}
                {ringType === 'yellow' && <YellowRingModel />}
              </Center>
            )}
            <ContactShadows
              position={isDiamond ? [0, -1.5, 0] : [0, -1, 0]}
              opacity={isDiamond ? 0.6 : 0.4}
              scale={10}
              blur={isDiamond ? 2.5 : 2}
              far={4}
              color={isDiamond ? '#000000' : undefined}
            />
          </group>
          <Environment preset={isDiamond ? 'studio' : 'city'} />
        </Suspense>

        <OrbitControls
          makeDefault
          autoRotate
          autoRotateSpeed={1.5}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          enablePan={isDiamond}
          minDistance={isDiamond ? 1 : 2}
          maxDistance={isDiamond ? 20 : 10}
        />
      </Canvas>
    </div>
  );
}
