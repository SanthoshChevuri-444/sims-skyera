/**
 * SKYERA Phase 1A boot entry.
 * Instantiates core/adapter for compile+ready checks.
 * Presentation boot screen does not import simulation implementation.
 */
import { createLocalSimulationAdapter } from "./adapters/local/localSimulationAdapter";
import { createSimulationCore } from "./simulation/createSimulationCore";
import { mountBootPresentation } from "./presentation/mountPresentation";

const adapter = createLocalSimulationAdapter();
const core = createSimulationCore(adapter);

// Prove the deterministic shell instantiates without expanding mission logic.
void adapter.describe();
void core.getSnapshot();

const host = document.querySelector<HTMLElement>("#app");
if (!host) {
  throw new Error("Missing #app host element");
}

mountBootPresentation(host);
