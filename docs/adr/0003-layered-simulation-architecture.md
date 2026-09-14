# ADR-0003: Layered simulation architecture with adapter ports

**Date**: 2026-09-14  
**Status**: accepted  
**Deciders**: SKYERA team

## Context

The product must behave like an operational system (mission flow, HITL, deterministic updates) while keeping 3D presentation replaceable and robotics infrastructure optional. Mixing Three.js or ROS types into mission logic would destroy testability and lock the wrong dependency graph.

## Decision

SKYERA uses these conceptual layers:

```
SKYERA Desktop Application (Tauri)
  → Presentation Layer (Three.js)
  → Simulation Core (deterministic; no Three.js)
  → Domain / Mission Logic (no Three.js)
  → Adapter Interfaces
  → Local Simulation Adapter (default)

Future only:
  → ROS2/Gazebo Adapter
  → Hardware Adapter
```

Rules:

1. **Presentation** renders and displays; it does **not** own mission decisions.
2. **Simulation Core** owns clock, world/drone/mission state snapshots, events, fixed-timestep updates, and state-transition mechanics — **no Three.js imports**.
3. **Domain / Mission Logic** owns scenarios, search, detection, triage, routes, HITL — **no Three.js imports**.
4. **Adapters** isolate local sim vs future ROS/Gazebo vs hardware.
5. **Deterministic simulation** is a core requirement (fixed timestep; logic independent of render frame rate).
6. The AI recommends; the **human** is the final rescue decision authority.

Mission functionality is **not** implemented in the architecture-reset phase — only boundaries and contracts.

## Alternatives Considered

### Alternative 1: Monolithic Three.js app (logic in render loop)
- **Pros**: Fast prototype
- **Cons**: Non-deterministic; untestable; presentation owns decisions
- **Why not**: Violates determinism and layer rules

### Alternative 2: ROS nodes as the simulation core
- **Pros**: Matches superseded Phase 0
- **Cons**: Forbidden local dependency; couples domain to middleware
- **Why not**: ADR-0001

## Consequences

### Positive
- Headless unit tests for core/domain
- Clear future robotics integration path without mandatory local ROS
- HITL preserved as an architectural gate

### Negative
- More boilerplate early (ports, snapshots, events)
- Dual mental models (render vs sim tick)

### Risks
- Leakage of Three.js into core — enforce via package/folder import rules and review
