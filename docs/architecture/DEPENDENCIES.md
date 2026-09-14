# Dependency notes

## Locked (product)

| Package | Role |
|---|---|
| `@tauri-apps/cli` / `@tauri-apps/api` | Desktop shell |
| `vite` | Bundler / dev server |
| `typescript` | Language |
| `three` / `@types/three` | Presentation only |

## Forbidden for local development

- ROS 2, Gazebo, Docker runtime, Ubuntu images, `ros_gz_bridge`, `rosbridge_suite`
- Electron, Unity, Godot, React (unless a blocking issue forces an ADR change)

## Install policy

Architecture reset creates manifests only. Run `npm install` when explicitly starting the next implementation phase, unless already approved as part of scaffold verification.
