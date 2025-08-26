import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useEffect } from "react";

export default function CameraRig() {
  const { camera } = useThree();
  const [virtualScroll, setVirtualScroll] = useState(0);

  useEffect(() => {
    const handleWheel = (e) => {
      setVirtualScroll((prev) => {
        const next = Math.max(0, Math.min(300, prev + e.deltaY));
        return next;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame((state, delta) => {
    const t = THREE.MathUtils.clamp(virtualScroll / 300, 0, 1);

    // 📍 相機 Y 位移
    const targetY = THREE.MathUtils.lerp(0, -4, t);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 16, delta);

    // 📍 相機 Zoom 放大 (例如 1 → 1.8)
    const targetZoom = THREE.MathUtils.lerp(1, 1.3, t);
    camera.zoom = THREE.MathUtils.damp(camera.zoom, targetZoom, 16, delta);
    camera.updateProjectionMatrix();

    camera.lookAt(0, 0, 0);
    state.invalidate();
  });

  return null;
}
