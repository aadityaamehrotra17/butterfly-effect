# Butterfly Effect - Lorenz Attractor Playground

An immersive, full-screen Lorenz attractor simulator built with React, Vite, and Three.js.

## Features

- **High-fidelity 3D render** using `@react-three/fiber` and `@react-three/drei`, complete with soft lighting, fog, and subtle orbit animations.
- **Live parameter controls** for σ (Prandtl), ρ (Rayleigh), β (geometric factor), integration step Δt, total steps, and orbit speed.
- **Instant recomputation** of the Lorenz trajectory whenever a slider/number input changes - no refresh required.

## Quick start

```bash
npm install
npm run dev
```