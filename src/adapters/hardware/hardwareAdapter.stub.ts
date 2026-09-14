import type { HardwareAdapter } from "../ports";

/**
 * FUTURE ONLY.
 * Hardware bridge placeholder — not implemented.
 */
export function createHardwareAdapterStub(): HardwareAdapter {
  return {
    id: "hardware",
    describe: () => "HardwareAdapter — future integration stub",
  };
}
