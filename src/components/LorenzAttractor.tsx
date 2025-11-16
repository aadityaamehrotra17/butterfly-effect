import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group } from 'three'

import { generateLorenzPoints, type LorenzParameters } from '../lorenz'

type LorenzAttractorProps = {
  params: LorenzParameters
}

export function LorenzAttractor({ params }: LorenzAttractorProps) {
  const { sigma, beta, rho, dt, steps, speed, initial } = params
  const attractorRef = useRef<Group>(null)
  const initialKey = initial.join(':')

  const points = useMemo(
    () => generateLorenzPoints(params),
    [sigma, beta, rho, dt, steps, initialKey]
  )

  useFrame((_, delta) => {
    if (!attractorRef.current) return
    attractorRef.current.rotation.y += delta * speed
    attractorRef.current.rotation.x += delta * speed * 0.2
  })

  return (
    <group ref={attractorRef} position={[0, 0, 0]}>
      <Line
        points={points}
        color="#ff6ad5"
        lineWidth={2}
        dashed={false}
        toneMapped={false}
      />
    </group>
  )
}
