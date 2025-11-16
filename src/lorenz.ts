import { Vector3 } from 'three'

export type LorenzParameters = {
  sigma: number
  beta: number
  rho: number
  dt: number
  steps: number
  speed: number
  initial: [number, number, number]
}

export const defaultLorenzParameters: LorenzParameters = {
  sigma: 10,
  beta: 8 / 3,
  rho: 28,
  dt: 0.01,
  steps: 9000,
  speed: 0.18,
  initial: [0.01, 0, 0]
}

export type AdjustableParameter = Exclude<keyof LorenzParameters, 'initial'>

type Bound = {
  min: number
  max: number
  step: number
}

export const parameterBounds: Record<AdjustableParameter, Bound> = {
  sigma: { min: 0, max: 40, step: 0.1 },
  rho: { min: 0, max: 60, step: 0.5 },
  beta: { min: 0, max: 10, step: 0.05 },
  dt: { min: 0.001, max: 0.05, step: 0.001 },
  steps: { min: 2000, max: 20000, step: 100 },
  speed: { min: 0, max: 0.6, step: 0.01 }
}

export function generateLorenzPoints(params: LorenzParameters): Vector3[] {
  const { sigma, beta, rho, dt, steps, initial } = params
  let [x, y, z] = initial

  const points: Vector3[] = []

  for (let i = 0; i < steps; i++) {
    const dx = sigma * (y - x)
    const dy = x * (rho - z) - y
    const dz = x * y - beta * z

    x += dx * dt
    y += dy * dt
    z += dz * dt

    points.push(new Vector3(x, y, z))
  }

  return points
}
