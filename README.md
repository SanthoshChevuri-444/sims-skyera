# SKYERA

Desktop 3D disaster-response drone simulation (SIH).

## Stack (locked)

- **Tauri** — desktop shell  
- **Vite** — frontend tooling  
- **TypeScript** — application language  
- **Three.js** — 3D presentation  

See [docs/adr](docs/adr/README.md) and [architecture overview](docs/architecture/OVERVIEW.md).

## Architecture reset status

This repository has completed an **architecture reset**:

- ROS 2 / Gazebo / Docker Phase 0 is **superseded** for local development.
- Layer boundaries and adapter ports exist as TypeScript contracts.
- **Mission functionality is not implemented yet.**

## Non-negotiable local constraints

Do **not** install, configure, run, or depend on for local development:

- ROS 2, Gazebo, Docker, Ubuntu, `ros_gz_bridge`, `rosbridge_suite`

Those may appear later only as optional adapters.

## Development (after dependency install — next approved phase)

```bash
npm install
npm run tauri dev
```

Architecture-reset scaffold only: the app boots a placeholder presentation shell wired to an empty local simulation adapter. No disaster mission logic yet.

## ECC

ECC tooling may live under `everything-claude-code/`. Do not modify `.agents/`. Product code lives at the repository root (`src/`, `src-tauri/`, `docs/`).
