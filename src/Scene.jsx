import { Environment, Html, useGLTF } from "@react-three/drei";
import { a, useSpring, useSprings } from "@react-spring/three";
import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import "./styles.css";

// 初始進場位置 (三個，但小螢幕會只用中間一個)
const items = [
  { initialPosition: [-3.5, 0, 0] },
  { initialPosition: [0, 3.5, 0] },
  { initialPosition: [3.5, 0, 0] },
];

// 不同裝置的設定
const configs = {
  desktop: {
    scale: 12,
    positions: [
      [-1.5, -0.95, 0],
      [0, -1, 0],
      [1.5, -0.95, 0],
    ],
    count: 3, // ✅ 三個模型
  },
  mobile: {
    scale: 12,
    positions: [[0.6, -1, 0]], // ✅ 只放一個在中間
    count: 1,
  },
};

const Scene = () => {
  const { scene } = useGLTF("/models/compressed.glb");
  const groupRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  const [animationComplete, setAnimationComplete] = useState(false);

  const [config, setConfig] = useState(configs.desktop);

  // ✅ 判斷螢幕大小 → 選擇 config
  useEffect(() => {
    const updateConfig = () => {
      if (window.innerWidth < 1000) {
        setConfig(configs.mobile);
      } else {
        setConfig(configs.desktop);
      }
    };
    updateConfig();
    window.addEventListener("resize", updateConfig);
    return () => window.removeEventListener("resize", updateConfig);
  }, []);

  // ✅ clone 模型 (依 count)
  const clonedScenes = useMemo(() => {
    return Array.from({ length: config.count }, () => scene.clone());
  }, [scene, config]);

  const rotations = [
    [0.15, -2.25, -0.2],
    [0.25, -1.57, -0.22],
    [0.15, -0.8, -0.2],
  ];

  // ✅ Springs (單個 / 多個都用 useSprings)
  const springs = useSprings(
    config.positions.length,
    config.positions.map((pos, index) => ({
      from: { position: items[index]?.initialPosition || [0, 3.5, 0] },
      to: { position: pos },
      config: { duration: 300 },
      onRest: () => {
        if (index === config.positions.length - 1) setAnimationComplete(true);
      },
    }))
  );
  useFrame(({ pointer }) => {
    if (animationComplete && config.count > 1) {
      targetRotation.current.y = pointer.x * 0.2;
      targetRotation.current.x = -pointer.y * 0.2;
    }

    if (groupRef.current && config.count > 1) {
      groupRef.current.rotation.y +=
        (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x +=
        (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment files="./quad.hdr" />

      <group ref={groupRef}>
        {springs.map((spring, i) => (
          <a.primitive
            key={i}
            object={clonedScenes[i]}
            scale={config.scale}
            position={spring.position}
            rotation={rotations[i] || [0, 0, 0]} // 小螢幕時只會用中間一個
          />
        ))}
      </group>

      <Html fullscreen>
        <div
          className="html-container text-center"
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
          }}
        >
          <h1 className="hurricane-text trinity-title no-select">Trinity</h1>
          <h2 className="archivo-black-regular hi-capa-title no-select">
            Hi-CAPA
          </h2>

          <div className="info-block">
            <h3 className="subtitle archivo-black-regular">
              Airsoft Gas Blowback Pistol
            </h3>
            <p className="landing-p archivo-black-thin">
              Industrial Design | Modify Tech | 2022–2023 | Solo-led
            </p>
          </div>
        </div>
      </Html>
    </>
  );
};

export default Scene;





