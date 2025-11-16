import { AdaptiveDpr, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useCallback, useState } from 'react'

import { LorenzAttractor } from './components/LorenzAttractor'
import { Sidebar } from './components/Sidebar'
import {
    defaultLorenzParameters,
    parameterBounds,
    type AdjustableParameter,
    type LorenzParameters
} from './lorenz'

const adjustableKeys: AdjustableParameter[] = ['sigma', 'rho', 'beta', 'dt', 'steps', 'speed']

function snapToStep(value: number, step: number) {
  return Math.round(value / step) * step
}

function randomizeParameters(previous: LorenzParameters): LorenzParameters {
  const next: LorenzParameters = { ...previous, initial: [...previous.initial] as [number, number, number] }

  adjustableKeys.forEach((key) => {
    const { min, max, step } = parameterBounds[key]
    const raw = min + Math.random() * (max - min)
    const snapped = snapToStep(raw, step)

    next[key] = key === 'steps'
      ? Math.round(snapped)
      : Number(snapped.toFixed(step < 1 ? 3 : 2))
  })

  return next
}

export default function App() {
  const [params, setParams] = useState<LorenzParameters>(defaultLorenzParameters)

  const handleParamChange = useCallback((key: AdjustableParameter, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleReset = useCallback(() => {
    setParams(defaultLorenzParameters)
  }, [])

  const handleSurprise = useCallback(() => {
    setParams((prev) => randomizeParameters(prev))
  }, [])

  return (
    <div className="app-shell">
      <div className="canvas-pane">
        <Canvas camera={{ position: [0, 0, 60], fov: 55 }} dpr={[1, 2]}>
          <color attach="background" args={["#03010b"]} />
          <fog attach="fog" args={["#03010b", 60, 140]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[20, 10, 5]} intensity={1.1} />

          <Suspense fallback={null}>
            <LorenzAttractor params={params} />
          </Suspense>

          <OrbitControls enablePan={false} enableZoom enableRotate />
          <AdaptiveDpr pixelated />
        </Canvas>
      </div>

      <Sidebar
        params={params}
        onParamChange={handleParamChange}
        onReset={handleReset}
        onSurprise={handleSurprise}
      />
    </div>
  )
}
