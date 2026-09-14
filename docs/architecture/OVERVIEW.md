# SKYERA Architecture Overview

**Status:** Architecture reset accepted (2026-09-14)  
**Stack:** Tauri · Vite · TypeScript · Three.js  
**Prior Phase 0 (ROS 2 / Gazebo / Docker):** superseded for local development — see [ADR-0001](../adr/0001-supersede-ros-gazebo-phase0.md)

## Layer diagram

```
┌──────────────────────────────────────────────────────────┐
│  SKYERA Desktop Application (Tauri shell)                │
└────────────────────────────┬─────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────┐
│  Presentation Layer                                      │
│  Three.js scene, camera, lighting, environment, drone,   │
│  survivors, routes, danger zones, GCS/telemetry UI       │
│  MUST NOT own mission decisions                          │
└────────────────────────────┬─────────────────────────────┘
                             │ snapshots / commands
┌────────────────────────────▼─────────────────────────────┐
│  Simulation Core                                         │
│  SimulationClock, WorldState, DroneState, MissionState,  │
│  events, fixed timestep, deterministic updates           │
│  MUST NOT import Three.js                                │
└────────────────────────────┬─────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────┐
│  Domain / Mission Logic                                  │
│  scenarios, search, detection, inspection, triage P1–P3, │
│  route recommendations, HITL approval, mission FSM       │
│  MUST NOT import Three.js                                │
│  (contracts only in architecture reset — not implemented)│
└────────────────────────────┬─────────────────────────────┘
                             │ ports
┌────────────────────────────▼─────────────────────────────┐
│  Adapter Interfaces                                      │
│  LocalSimulationAdapter (default)                        │
│  Future: RosGazeboAdapter, HardwareAdapter               │
└──────────────────────────────────────────────────────────┘
```

## Source layout

```
src/
  presentation/     # Three.js only here (and thin app shell wiring)
  simulation/       # deterministic core — no three
  domain/           # mission contracts — no three; no logic yet
  adapters/         # ports + local stub; future ROS/hardware stubs
  app/              # Vite/Tauri frontend entry composition
src-tauri/          # Tauri native shell
docs/adr/           # architecture decisions
docs/architecture/  # this overview
```

## Import rules

| From → To | Allowed? |
|---|---|
| `presentation` → `simulation` / `domain` (read snapshots) | Yes |
| `simulation` → `three` / `presentation` | **No** |
| `domain` → `three` / `presentation` | **No** |
| `simulation` → `adapters` (via interfaces) | Yes |
| `adapters/local` → `simulation` types | Yes |
| `adapters/rosGazebo` or `hardware` | Future only; stub interfaces now |

## Determinism

- Simulation advances on a **fixed timestep** independent of render FPS.
- Presentation may interpolate for display only.
- Domain decisions must be reproducible given the same inputs and clock.

## Human-in-the-loop

AI may recommend priority and routes. The human remains the decision authority before rescue actions proceed. Domain contracts reserve an approval gate; behavior is not implemented in this reset.

## Explicitly out of scope (this reset)

- Mission state machine runtime
- Search / detection / triage / routing algorithms
- Disaster world assets
- Drone mesh / sensors
- ROS 2 / Gazebo / Docker setup
- Copying code from the superseded `sims-drone` ROS workspace
