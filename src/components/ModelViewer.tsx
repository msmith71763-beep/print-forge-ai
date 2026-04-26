"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Environment } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer({ url }: { url: string | null }) {
  if (!url) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-2xl border border-zinc-800 text-zinc-500">
        <p>Generated model will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
             <Model url={url} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-[10px] text-zinc-400 bg-black/50 px-2 py-1 rounded">
        PREVIEW MODE
      </div>
    </div>
  );
}