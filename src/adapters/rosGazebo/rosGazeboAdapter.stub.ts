import type { RosGazeboAdapter } from "../ports";

/**
 * FUTURE ONLY.
 * Must not be wired as a required local development dependency.
 */
export function createRosGazeboAdapterStub(): RosGazeboAdapter {
  return {
    id: "ros_gazebo",
    describe: () =>
      "RosGazeboAdapter — future integration stub; not available in local Mac development",
  };
}
