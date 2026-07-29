'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Center } from '@react-three/drei';
import RingModel from './RingModel';
import WhiteRingModel from './WhiteRingModel';
import YellowRingModel from './YellowRingModel';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { Suspense } from 'react';

export default function Viewer() {
  const ringType = useConfiguratorStore((state) => state.ringType);
  const isDiamond = ringType === 'white' || ringType === 'yellow';

  return (
    <div className="w-full h-full absolute inset-0 bg-[#0f1218] transition-colors duration-500">
      <Canvas camera={{ position: isDiamond ? [0, 0, 8] : [0, 2, 6], fov: 45 }}>
        <color attach="background" args={['#0f1218']} />
        
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
              color={isDiamond ? "#000000" : undefined}
            />
          </group>
          <Environment preset={isDiamond ? "studio" : "city"} />
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
