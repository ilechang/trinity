import { useGLTF, useAnimations, Environment, Html } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";





const Trigger = () => {
  const model = useGLTF("./models/shoot2.glb");



  
  const { animations } = model;
  const { actions } = useAnimations(animations, model.scene);
  const modelRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // **硬編碼 Leva 的數值**
  const posX = 5;
  const posY = 0;
  const posZ = -4;
  const scale = 42;

  const rotationX = 0
  const rotationY = -0.3
  const rotationZ = 0
    ;

  useEffect(() => {
    if (model.scene) {
      modelRef.current = model.scene;
      model.scene.position.set(posX, posY, posZ);
      model.scene.scale.set(scale, scale, scale);
      model.scene.rotation.set(rotationX, rotationY, rotationZ);
    }
  }, [model.scene]);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.stop());
    }
  }, [actions]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      playAnimation();
    }, 1800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const playAnimation = () => {
    if (actions) {
      console.log("🎬 播放trigger動畫");
      Object.values(actions).forEach((action) => {
        action.reset();
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.timeScale =3; // ← 1.8x speed
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
            // ⏸ 停在當前幀，不改變時間
            action.paused = true;
          } else {
            // ▶ 重新播放動畫，從第一幀開始
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

  return (
    <>
      <directionalLight position={[1.8, -2, 3]} />
      <Environment files="./2k.hdr" />
      <primitive ref={modelRef} object={model.scene} />

      {/* ✅ 用 Html 包裹 button，確保它是 HTML 而不是 Three.js 物件 */}
      <Html position={[6.2, -2.5, 0]}>
        <button
          onClick={toggleAnimation}
          style={{
            position: "absolute",
            padding: "7px 13px",
            fontSize: "14px",
            background: "#f0f0f0",
            color: "black",
            border: "none",
            cursor: "pointer",
            borderRadius: "0px",
            transform: "translateX(-50px)",
            transition: "background 0.3s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.background = "rgb(180,180,180)")}
          onMouseLeave={(e) => (e.target.style.background = "#f0f0f0")}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </Html>
    </>
  );
};

export default Trigger;

