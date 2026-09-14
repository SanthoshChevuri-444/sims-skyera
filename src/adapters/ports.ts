/**
 * Adapter ports — keep simulation core independent of ROS/Gazebo/hardware.
 */

export interface SimulationAdapter {
  readonly id: "local" | "ros_gazebo" | "hardware";
  /** Reserved for future sensing / actuation bridging. */
  readonly describe: () => string;
}

/** Future integration target only — not implemented. */
export interface RosGazeboAdapter extends SimulationAdapter {
  readonly id: "ros_gazebo";
}

/** Future integration target only — not implemented. */
export interface HardwareAdapter extends SimulationAdapter {
  readonly id: "hardware";
}
