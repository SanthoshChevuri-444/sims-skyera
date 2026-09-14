import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

export interface BootPresentationHandle {
  readonly dispose: () => void;
}

/**
 * Presentation-only boot surface.
 * Must not import simulation implementation details.
 */
export function mountBootPresentation(host: HTMLElement): BootPresentationHandle {
  const scene = new Scene();
  scene.background = new Color(0x0b1220);

  const camera = new PerspectiveCamera(
    55,
    host.clientWidth / Math.max(host.clientHeight, 1),
    0.1,
    1000,
  );
  camera.position.set(10, 8, 12);
  camera.lookAt(0, 0.5, 0);

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(host.clientWidth, host.clientHeight);
  host.appendChild(renderer.domElement);

  scene.add(new AmbientLight(0x8aa0c8, 0.55));
  const sun = new DirectionalLight(0xffffff, 1.05);
  sun.position.set(12, 18, 8);
  scene.add(sun);

  scene.add(new GridHelper(40, 20, 0x3a4a6a, 0x1c2740));

  // Renderer verification artifact only — not a drone/mission asset.
  const probe = new Mesh(
    new BoxGeometry(1.4, 1.4, 1.4),
    new MeshStandardMaterial({
      color: 0x6ec8ff,
      metalness: 0.15,
      roughness: 0.4,
    }),
  );
  probe.position.y = 1.2;
  scene.add(probe);

  const rendererStatus = document.querySelector("#status-renderer");
  if (rendererStatus) {
    rendererStatus.textContent = "ONLINE";
    rendererStatus.classList.remove("status-idle");
    rendererStatus.classList.add("status-ok");
  }

  let frameId = 0;
  let disposed = false;

  const onResize = (): void => {
    const w = host.clientWidth;
    const h = Math.max(host.clientHeight, 1);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  const frame = (): void => {
    if (disposed) {
      return;
    }
    probe.rotation.y += 0.01;
    probe.rotation.x += 0.004;
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(frame);
  };
  frameId = requestAnimationFrame(frame);

  return {
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      host.removeChild(renderer.domElement);
    },
  };
}
