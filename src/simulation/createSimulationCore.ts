import type { SimulationAdapter } from "../adapters/ports";
import type {
  SimulationCore,
  SimulationSnapshot,
} from "./types";

const FIXED_DELTA_SECONDS = 1 / 60;

function initialSnapshot(): SimulationSnapshot {
  return {
    clock: {
      elapsedSeconds: 0,
      fixedDeltaSeconds: FIXED_DELTA_SECONDS,
      tick: 0,
    },
    world: {
      scenarioId: null,
      bounds: { minX: -50, maxX: 50, minZ: -50, maxZ: 50 },
    },
    drone: {
      position: { x: 0, y: 0, z: 0 },
      headingRadians: 0,
      armed: false,
      batteryPercent: 100,
    },
    mission: {
      phase: "IDLE",
    },
  };
}

/**
 * Minimal deterministic core shell.
 * Does not run search, detection, triage, or routing.
 */
export function createSimulationCore(
  _adapter: SimulationAdapter,
): SimulationCore {
  let snapshot = initialSnapshot();

  return {
    getSnapshot: () => snapshot,
    step: () => {
      snapshot = {
        ...snapshot,
        clock: {
          ...snapshot.clock,
          elapsedSeconds:
            snapshot.clock.elapsedSeconds + snapshot.clock.fixedDeltaSeconds,
          tick: snapshot.clock.tick + 1,
        },
      };
      // Adapter / domain hooks intentionally unused in architecture reset.
    },
    reset: () => {
      snapshot = initialSnapshot();
    },
  };
}
