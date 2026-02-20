// Scene.jsx
import { Environment, Html, useGLTF, useProgress } from "@react-three/drei";
import { a, useSprings } from "@react-spring/three";
import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ 引入 Bootstrap
import "./styles.css";

const items = [
  { initialPosition: [-3.5, 0, 0] },
  { initialPosition: [0, 3.5, 0] },
  { initialPosition: [3.5, 0, 0] },
];

const configs = {
  desktop: {
    scale: 12,
    positions: [
      [-1.5, -0.95, 0],
      [0, -1, 0],
      [1.5, -0.95, 0],
    ],
    count: 3,
  },
  mobile: {
    scale: 12,
    positions: [[0.6, -1, 0]],
    count: 1,
  },
};

// ✅ Loader 使用 Bootstrap spinner
const Loader = () => {
  const { progress } = useProgress();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setFadeOut(true), 300);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (

  <>
    <Html fullscreen>
      <div
        className={`loader-overlay ${fadeOut ? "fade-out" : ""}`}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          background: "rgba(0,0,0,0.85)",
          color: "white",
        }}
      >
        <div
          className="spinner-border text-light mb-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading...</p>
      </div>
    </Html>


  </>
);
};

const Scene = () => {
  const { scene } = useGLTF("/models/compressed.glb");
  const groupRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  const [animationComplete, setAnimationComplete] = useState(false);

  const [config, setConfig] = useState(configs.desktop);

  // ✅ 判斷螢幕大小
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

  // ✅ clone 模型
  const clonedScenes = useMemo(() => {
    return Array.from({ length: config.count }, () => scene.clone());
  }, [scene, config]);

  const rotations = [
    [0.15, -2.25, -0.2],
    [0.25, -1.57, -0.22],
    [0.15, -0.8, -0.2],
  ];

  // ✅ springs 動畫
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
            rotation={rotations[i] || [0, 0, 0]}
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
              Airsoft Product Design | 2022–2023 | Mass-Produced
            </p>
            <p className="landing-p archivo-black-thin">
              Role : User Research - CAD Modeling - Mechanical & Ergonomic Design
            </p>
           
          </div>
        </div>
      </Html>
    </>
  );
};

export default function ExperienceWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <Scene />
    </Suspense>
  );
}







// import { Environment, Html, useGLTF } from "@react-three/drei";
// import { a, useSpring, useSprings } from "@react-spring/three";
// import { useRef, useState, useEffect, useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import "./styles.css";

// // 初始進場位置 (三個，但小螢幕會只用中間一個)
// const items = [
//   { initialPosition: [-3.5, 0, 0] },
//   { initialPosition: [0, 3.5, 0] },
//   { initialPosition: [3.5, 0, 0] },
// ];

// // 不同裝置的設定
// const configs = {
//   desktop: {
//     scale: 12,
//     positions: [
//       [-1.5, -0.95, 0],
//       [0, -1, 0],
//       [1.5, -0.95, 0],
//     ],
//     count: 3, // ✅ 三個模型
//   },
//   mobile: {
//     scale: 12,
//     positions: [[0.6, -1, 0]], // ✅ 只放一個在中間
//     count: 1,
//   },
// };

// const Scene = () => {
//   const { scene } = useGLTF("/models/compressed.glb");
//   const groupRef = useRef();
//   const targetRotation = useRef({ x: 0, y: 0 });
//   const [animationComplete, setAnimationComplete] = useState(false);

//   const [config, setConfig] = useState(configs.desktop);

//   // ✅ 判斷螢幕大小 → 選擇 config
//   useEffect(() => {
//     const updateConfig = () => {
//       if (window.innerWidth < 1000) {
//         setConfig(configs.mobile);
//       } else {
//         setConfig(configs.desktop);
//       }
//     };
//     updateConfig();
//     window.addEventListener("resize", updateConfig);
//     return () => window.removeEventListener("resize", updateConfig);
//   }, []);

//   // ✅ clone 模型 (依 count)
//   const clonedScenes = useMemo(() => {
//     return Array.from({ length: config.count }, () => scene.clone());
//   }, [scene, config]);

//   const rotations = [
//     [0.15, -2.25, -0.2],
//     [0.25, -1.57, -0.22],
//     [0.15, -0.8, -0.2],
//   ];

//   // ✅ Springs (單個 / 多個都用 useSprings)
//   const springs = useSprings(
//     config.positions.length,
//     config.positions.map((pos, index) => ({
//       from: { position: items[index]?.initialPosition || [0, 3.5, 0] },
//       to: { position: pos },
//       config: { duration: 300 },
//       onRest: () => {
//         if (index === config.positions.length - 1) setAnimationComplete(true);
//       },
//     }))
//   );
//   useFrame(({ pointer }) => {
//     if (animationComplete && config.count > 1) {
//       targetRotation.current.y = pointer.x * 0.2;
//       targetRotation.current.x = -pointer.y * 0.2;
//     }

//     if (groupRef.current && config.count > 1) {
//       groupRef.current.rotation.y +=
//         (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
//       groupRef.current.rotation.x +=
//         (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
//     }
//   });

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <Environment files="./quad.hdr" />

//       <group ref={groupRef}>
//         {springs.map((spring, i) => (
//           <a.primitive
//             key={i}
//             object={clonedScenes[i]}
//             scale={config.scale}
//             position={spring.position}
//             rotation={rotations[i] || [0, 0, 0]} // 小螢幕時只會用中間一個
//           />
//         ))}
//       </group>

//       <Html fullscreen>
//         <div
//           className="html-container text-center"
//           style={{
//             position: "absolute",
//             top: "10%",
//             left: "50%",
//             transform: "translateX(-50%)",
//             color: "white",
//           }}
//         >
//           <h1 className="hurricane-text trinity-title no-select">Trinity</h1>
//           <h2 className="archivo-black-regular hi-capa-title no-select">
//             Hi-CAPA
//           </h2>

//           <div className="info-block">
//             <h3 className="subtitle archivo-black-regular">
//               Airsoft Gas Blowback Pistol
//             </h3>
//             <p className="landing-p archivo-black-thin">
//               Industrial Design | Modify Tech | 2022–2023 | Solo-led
//             </p>
//           </div>
//         </div>
//       </Html>
//     </>
//   );
// };

// export default Scene;





