import { useSharedModel } from "./ModelProvider";
import { useAnimations, Environment, Html } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

const Hopup = () => {
  const { scene, animations } = useSharedModel();
  const { actions } = useAnimations(animations, scene);
  const modelRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // **應用硬編碼的位移、縮放、旋轉**
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(-5, 1, -5);
      modelRef.current.scale.set(33, 33, 33);
      modelRef.current.rotation.set(0.6, -2.4, -0.2);
    }
  }, [scene]);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.stop());
    }
  }, [actions]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      playAnimation();
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const playAnimation = () => {
    if (actions) {
      console.log("🎬 播放動畫");
      Object.values(actions).forEach((action) => {
        action.reset();
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.play();
      });
    }
  };

  const toggleAnimation = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      if (actions) {
        Object.values(actions).forEach((action) => {
          if (!newState) {
            action.paused = true; // ⏸ 停在當前幀，不改變時間
          } else {
            action.reset(); // 重置動畫
            action.setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;
            action.play();
          }
        });
      }
      return newState;
    });
  };

  if (!scene) return null;

  return (
    <>
      <directionalLight position={[1.8, -2, 3]} />
      <Environment files="./2k.hdr" />
      <primitive ref={modelRef} object={scene} />

      {/* ✅ 用 Html 包裹 button，確保它是 HTML 而不是 Three.js 物件 */}
      <Html position={[-3.5, -0.9, 0]}>
        <button
          onClick={toggleAnimation}
          style={{
            position: "absolute",
            padding: "10px 20px",
            fontSize: "16px",
            background: "rgb(31,31,31)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            transform: "translateX(-100px)",
            transition: "background 0.3s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.background = "rgb(50,50,50)")}
          onMouseLeave={(e) => (e.target.style.background = "rgb(31,31,31)")}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </Html>
    </>
  );
};

export default Hopup;






