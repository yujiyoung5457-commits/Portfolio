"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// 한 바퀴 도는 시간(초): 값을 낮추면 더 빨리, 높이면 더 천천히 회전합니다.
const TURN_DURATION_SECONDS = 2.5;

type SceneProps = {
  // 다른 화면에서 다른 GLB를 쓰려면 경로를 넘깁니다.
  modelPath?: string;
  // Hero 확대 중 CSS 확대만으로 흐려지지 않도록 렌더 해상도도 함께 높입니다.
  maintainZoomQuality?: boolean;
};

export function Scene({ modelPath = "/POLTFOLIO3D.glb", maintainZoomQuality = false }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    // 첫 번째 값(FOV)을 낮추면 모델이 더 크게, 높이면 더 작게 보입니다.
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    // 마지막 값(Z)을 낮추면 카메라가 가까워져 모델이 더 크게 보입니다.
    camera.position.set(0, 0.15, 5.5);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    const basePixelRatio = Math.min(window.devicePixelRatio, 2);
    let zoomScale = 1;
    let appliedPixelRatio = 0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 전체를 비추는 기본광: 위쪽 색, 아래쪽 색, 밝기 순서입니다.
    scene.add(new THREE.HemisphereLight(0xffffff, 0x1d366d, 2.4));
    // 주광: position(x, y, z)으로 오른쪽·위·앞쪽에서 따뜻하게 비춥니다.
    const keyLight = new THREE.DirectionalLight(0xffd6a0, 4.8);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);
    // 보조광: 왼쪽·약간 위·앞쪽에서 푸른빛을 더해 그림자를 살립니다.
    const fillLight = new THREE.DirectionalLight(0x5ecbff, 3.2);
    fillLight.position.set(-5, 1.5, 4);
    scene.add(fillLight);

    const turntable = new THREE.Group();
    scene.add(turntable);
    let model: THREE.Object3D | undefined;

    new GLTFLoader().load(modelPath, (gltf) => {
      model = gltf.scene;

      // 반투명 날개·리본 면이 서로를 가려 조각난 것처럼 보이지 않도록 보정합니다.
      model.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          material.side = THREE.DoubleSide;
          if (material.transparent || material.opacity < 1) {
            material.depthWrite = false;
            material.needsUpdate = true;
          }
        });
      });

      const bounds = new THREE.Box3().setFromObject(model);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      // 3.25를 높이면 GLB 자체가 커지고, 낮추면 작아집니다.
      const scale = 3.5 / (Math.max(size.x, size.y, size.z) || 1);
      model.position.copy(center).multiplyScalar(-scale);
      model.scale.setScalar(scale);
      turntable.add(model);
    });

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      // 확대 배율만큼 해상도도 올립니다. 4배에서 제한해 GPU 부담을 제어합니다.
      const pixelRatio = Math.min(basePixelRatio * zoomScale, 4);
      if (Math.abs(pixelRatio - appliedPixelRatio) > 0.12) {
        renderer.setPixelRatio(pixelRatio);
        appliedPixelRatio = pixelRatio;
      }
      renderer.setSize(clientWidth, clientHeight, false);
    };
    const handleHeroZoom = (event: Event) => {
      if (!maintainZoomQuality) return;
      zoomScale = (event as CustomEvent<number>).detail;
      resize();
    };
    window.addEventListener("hero-model-zoom", handleHeroZoom);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    let frameId = 0;
    const startTime = performance.now();
    const render = (now: number) => {
      turntable.rotation.y = ((now - startTime) / 1000 / TURN_DURATION_SECONDS) * Math.PI * 2;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("hero-model-zoom", handleHeroZoom);
      model?.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.geometry.dispose();
        (Array.isArray(child.material) ? child.material : [child.material]).forEach((material) => material.dispose());
      });
      renderer.dispose();
    };
  }, [maintainZoomQuality, modelPath]);

  return <canvas ref={canvasRef} aria-label="회전하는 포트폴리오 3D 모델" />;
}
