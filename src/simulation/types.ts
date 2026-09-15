/**
 * Simulation Core contracts.
 * MUST NOT import Three.js or presentation modules.
 */

/** Fixed-timestep clock state (seconds). */
export interface SimulationClock {
  /** Accumulated simulation time */
  readonly elapsedSeconds: number;
  /** Fixed step used for deterministic updates */
  readonly fixedDeltaSeconds: number;
  /** Monotonic tick count */
  readonly tick: number;
}

export interface Vec3 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export type FlightMode =
  | "DISARMED"
  | "LANDED"
  | "TAKEOFF"
  | "HOVER"
  | "NAVIGATING"
  | "LANDING";

import type { SurvivorPriority } from "../domain/types";

export interface DroneState {
  readonly position: Vec3;
  readonly velocity: Vec3;
  readonly speed: number;
  readonly headingRadians: number;
  readonly pitchRadians: number;
  readonly rollRadians: number;
  readonly armed: boolean;
  readonly flightMode: FlightMode;
  readonly targetPosition: Vec3 | null;
  readonly batteryPercent: number;
  /** Downward sensor scanner properties */
  readonly sensorFovDegrees: number;
  readonly sensorGroundRadius: number;
  readonly anomalyDetectedCount: number;
}

export interface SurvivorEntity {
  readonly id: string;
  readonly name: string;
  readonly position: Vec3;
  readonly detected: boolean;
  readonly detectedAtTick: number | null;
  readonly vitalSigns: {
    readonly heartRateBpm: number;
    readonly temperatureC: number;
    readonly conscious: boolean;
  };
  readonly priority: SurvivorPriority;
  readonly hazardProximityMeters: number;
}

export interface HazardZone {
  readonly id: string;
  readonly kind: "FIRE" | "FLOOD" | "COLLAPSE";
  readonly center: { readonly x: number; readonly z: number };
  readonly radius: number;
  readonly severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  readonly description: string;
}

export interface StagingBase {
  readonly position: Vec3;
  readonly radius: number;
}

/**
 * World snapshot containing disaster environment, hazards, and survivors.
 */
export interface WorldState {
  readonly scenarioId: string | null;
  readonly bounds: {
    readonly minX: number;
    readonly maxX: number;
    readonly minZ: number;
    readonly maxZ: number;
  };
  readonly survivors: ReadonlyArray<SurvivorEntity>;
  readonly hazards: ReadonlyArray<HazardZone>;
  readonly stagingBase: StagingBase;
}

/**
 * Mission phase names reserved for the eventual FSM.
 * No transitions are implemented in the architecture reset.
 */
export type MissionPhase =
  | "IDLE"
  | "MISSION_INITIALIZED"
  | "TAKEOFF"
  | "SEARCHING"
  | "ANOMALY_DETECTED"
  | "INSPECTING"
  | "CLASSIFYING"
  | "PRIORITIZED"
  | "SEARCH_CONTINUING"
  | "AWAITING_HUMAN_APPROVAL"
  | "ROUTE_GENERATED"
  | "RESCUE_ACTIVE"
  | "MISSION_COMPLETE";

export interface MissionState {
  readonly phase: MissionPhase;
}

export type SimulationEvent =
  | { readonly type: "tick"; readonly tick: number }
  | { readonly type: "reset" };

export interface SimulationSnapshot {
  readonly clock: SimulationClock;
  readonly world: WorldState;
  readonly drone: DroneState;
  readonly mission: MissionState;
}

export interface SimulationCore {
  readonly getSnapshot: () => SimulationSnapshot;
  /** Advance one fixed step. */
  readonly step: () => void;
  readonly reset: () => void;
  /** Flight controls */
  readonly arm: () => void;
  readonly disarm: () => void;
  readonly takeoff: (targetAltitude?: number) => void;
  readonly flyTo: (target: Vec3) => void;
  readonly land: () => void;
}

