# ADR-0002: Lock desktop stack — Tauri + Vite + TypeScript + Three.js

**Date**: 2026-09-14  
**Status**: accepted  
**Deciders**: SKYERA team

## Context

SKYERA requires a local desktop 3D disaster-response drone simulation on macOS. The stack must support real-time 3D presentation, a thin native shell, and a TypeScript application layer that can host a headless-testable simulation core.

## Decision

The locked technology stack is:

| Layer | Technology |
|---|---|
| Desktop shell | **Tauri** |
| App tooling / bundling | **Vite** |
| Application language | **TypeScript** |
| 3D visualization | **Three.js** |

Do **not** substitute Electron, Unity, Godot, React, or another framework unless a blocking technical reason is discovered. If blocked, stop and report — do not silently change the stack.

## Alternatives Considered

### Alternative 1: Electron + Three.js
- **Pros**: Familiar web desktop packaging
- **Cons**: Heavier runtime; not selected
- **Why not**: Team locked Tauri

### Alternative 2: Unity / Godot
- **Pros**: Strong 3D/physics tooling
- **Cons**: Different workflow; larger engine commitment
- **Why not**: Not selected; contradicts locked stack

### Alternative 3: React + R3F
- **Pros**: Component UI patterns
- **Cons**: Adds React without requirement
- **Why not**: Speculative; not in locked stack

## Consequences

### Positive
- Single clear toolchain for Mac desktop + 3D
- TypeScript shared across presentation, core, and domain
- Tauri keeps native shell thin relative to Electron

### Negative
- Team must learn Tauri (Rust shell) conventions
- Three.js requires owning scene/physics approximations for demo fidelity

### Risks
- If Tauri + Vite + Three.js proves blocked on this machine, halt and escalate rather than swapping stacks
