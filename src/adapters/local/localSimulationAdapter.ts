import type { SimulationAdapter } from "../ports";

/** Default Mac-native adapter. No ROS/Gazebo dependency. */
export function createLocalSimulationAdapter(): SimulationAdapter {
  return {
    id: "local",
    describe: () => "LocalSimulationAdapter — architecture reset stub",
  };
}
