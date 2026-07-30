import { useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function PlaceholderCar() {
  const parts = useMemo(() => [
    { position: [0, 0.3, 0], scale: [1.8, 0.3, 0.8], color: "#c0a060" },
    { position: [0.5, 0.6, 0], scale: [0.7, 0.3, 0.75], color: "#a08850" },
    { position: [-0.5, 0.6, 0], scale: [0.7, 0.3, 0.75], color: "#a08850" },
    { position: [-0.85, 0.15, 0.55], scale: [0.25, 0.3, 0.25], color: "#1a1a1a" },
    { position: [-0.85, 0.15, -0.55], scale: [0.25, 0.3, 0.25], color: "#1a1a1a" },
    { position: [0.85, 0.15, 0.55], scale: [0.25, 0.3, 0.25], color: "#1a1a1a" },
    { position: [0.85, 0.15, -0.55], scale: [0.25, 0.3, 0.25], color: "#1a1a1a" },
    { position: [0, 0.7, 0], scale: [0.6, 0.2, 0.6], color: "#87ceeb" },
  ], []);

  return (
    <group>
      {parts.map((part, i) => (
        <mesh key={i} position={part.position}>
          <boxGeometry args={part.scale} />
          <meshStandardMaterial
            color={part.color}
            metalness={i < 4 ? 0.8 : 0.2}
            roughness={i < 4 ? 0.2 : 0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function ThreeCar() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group scale={1.2} position={[0, -0.2, 0]}>
        <PlaceholderCar />
      </group>
    </Float>
  );
}

function LoadingFallback() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#c0a060" wireframe />
    </mesh>
  );
}

export default function CarScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [4, 2, 5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, 4, 2]} intensity={0.6} />
        <spotLight position={[0, 6, 0]} intensity={0.4} angle={0.6} penumbra={1} />
        <Suspense fallback={<LoadingFallback />}>
          <ThreeCar />
        </Suspense>
        <ContactShadows
          position={[0, -0.6, 0]}
          opacity={0.4}
          scale={8}
          blur={2.5}
          far={1}
        />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
          maxPolarAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 3}
        />
        <EffectComposer>
          <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} intensity={0.4} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
