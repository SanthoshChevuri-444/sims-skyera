# ADR-0001: Supersede ROS 2 / Gazebo / Docker Phase 0 for local development

**Date**: 2026-09-14  
**Status**: accepted  
**Deciders**: SKYERA team

## Context

Architecture discovery found that the prior “frozen” Phase 0 (sibling `sims-drone/drone-simulation`) centered on ROS 2 Humble, Gazebo Fortress, Docker/Ubuntu, `ros_gz_bridge`, and `rosbridge_suite`. That stack cannot be the local development runtime on macOS under current constraints, and it is not a desktop-first 3D application (Gazebo headless; Three.js planned only as a tactical map).

## Decision

The ROS 2 + Gazebo + Docker Phase 0 architecture is **superseded** for the current development phase.

Local development and the SKYERA desktop application **must not** install, configure, run, or depend on ROS 2, Gazebo, Docker, Ubuntu, `ros_gz_bridge`, or `rosbridge_suite`.

Those systems may exist later **only** as optional adapter/integration targets. Domain contracts (HITL, P1–P3, dual routes, mission phases) may be **reused as concepts**, not as a ROS runtime.

## Alternatives Considered

### Alternative 1: Continue ROS/Gazebo Phase 0 on Mac via Docker
- **Pros**: Continuity with prior skeleton
- **Cons**: Violates non-negotiable local constraints; weak desktop 3D story
- **Why not**: Explicitly forbidden for this development phase

### Alternative 2: Dual-stack (ROS core + desktop UI) from day one
- **Pros**: Earlier robotics integration
- **Cons**: Couples core to middleware; blocks Mac-native iteration
- **Why not**: Simulation core must stay independent of robotics infrastructure

## Consequences

### Positive
- Clear Mac-native desktop development path
- Simulation core can be tested without containers or ROS
- SIH demos can be rehearsed on the development machine

### Negative
- Prior `ros2_ws` C++ packages are not the runtime base
- Future ROS re-integration requires deliberate adapter work

### Risks
- Accidental copy of ROS code into the new runtime — mitigated by ADR-0003 adapter boundary and “no copy” rule
