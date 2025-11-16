import type { AdjustableParameter, LorenzParameters } from '../lorenz'
import { parameterBounds } from '../lorenz'

type SidebarProps = {
  params: LorenzParameters
  onParamChange: (key: AdjustableParameter, value: number) => void
  onReset: () => void
  onSurprise: () => void
}

type ControlMeta = {
  key: AdjustableParameter
  label: string
  description: string
  suffix?: string
  formatter?: (value: number) => string
}

const CONTROL_CONFIG: ControlMeta[] = [
  {
    key: 'sigma',
    label: 'σ · Prandtl number',
    description: 'Controls velocity diffusion between fluid layers'
  },
  {
    key: 'rho',
    label: 'ρ · Rayleigh number',
    description: 'Energy injected into the convection system'
  },
  {
    key: 'beta',
    label: 'β · Geometric factor',
    description: 'Aspect ratio of the convection rolls'
  },
  {
    key: 'dt',
    label: 'Δt · Integration step',
    description: 'Time resolution for the numerical solver',
    suffix: 's'
  },
  {
    key: 'steps',
    label: 'Points traced',
    description: 'Number of samples drawn on the attractor',
    formatter: (value) => value.toLocaleString()
  },
  {
    key: 'speed',
    label: 'Orbit speed',
    description: 'Passive rotation speed of the attractor',
    suffix: 'x'
  }
]

function formatValue(value: number, formatter?: (value: number) => string) {
  if (formatter) return formatter(value)
  if (value >= 100) return value.toFixed(0)
  if (value >= 10) return value.toFixed(2)
  return value.toFixed(3)
}

export function Sidebar({ params, onParamChange, onReset, onSurprise }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div>
        <p className="status-chip">Live Lorenz Field</p>
        <h1>The Butterfly Effect</h1>
        <p>Manipulate σ, ρ, β and watch the chaotic attractor reshape itself in real time.</p>
      </div>

      <div className="controls-grid">
        {CONTROL_CONFIG.map(({ key, label, description, suffix, formatter }) => {
          const bounds = parameterBounds[key]
          const value = params[key]

          return (
            <div className="control-card" key={key}>
              <header>
                <span>{label}</span>
                <strong>
                  {formatValue(value, formatter)}
                  {suffix ? ` ${suffix}` : ''}
                </strong>
              </header>

              <input
                type="range"
                min={bounds.min}
                max={bounds.max}
                step={bounds.step}
                value={value}
                onChange={(event) => onParamChange(key, Number(event.target.value))}
              />

              <input
                type="number"
                min={bounds.min}
                max={bounds.max}
                step={bounds.step}
                value={value}
                onChange={(event) => {
                  const next = event.target.valueAsNumber
                  if (!Number.isNaN(next)) {
                    onParamChange(key, Math.min(bounds.max, Math.max(bounds.min, next)))
                  }
                }}
              />
              <small>{description}</small>
            </div>
          )
        })}
      </div>

      <div className="actions">
        <button className="secondary" type="button" onClick={onReset}>
          Reset defaults
        </button>
        <button className="primary" type="button" onClick={onSurprise}>
          Surprise me
        </button>
      </div>
    </aside>
  )
}
