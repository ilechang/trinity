// import { useGLTF, useAnimations, Environment, Html } from "@react-three/drei";
// import { useEffect, useState, useRef } from "react";
// import * as THREE from "three";

// useGLTF.preload("/models/hop7.glb");

// function Hopup() {
//   const { scene, animations } = useGLTF("/models/hop7.glb");
//   const { actions } = useAnimations(animations, scene);
//   const modelRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   // ✅ 與 Trigger 一致的位置設定
//   const posX = -1.8
//   ;
//   const posY =0.5;
//   const posZ = 5;
//   const scale = 35;
//   const rotationX = 0;
//   const rotationY = -0.1;
//   const rotationZ = 0;

//   useEffect(() => {
//     if (modelRef.current) {
//       modelRef.current.position.set(posX, posY, posZ);
//       modelRef.current.scale.set(scale, scale, scale);
//       modelRef.current.rotation.set(rotationX, rotationY, rotationZ);
//     }
//   }, [scene]);

//   useEffect(() => {
//     if (actions) {
//       Object.values(actions).forEach((action) => action.stop());
//     }
//   }, [actions]);

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       playAnimation();
//     }, 12000);
//     return () => clearInterval(interval);
//   }, [isPlaying, actions]);

//   const playAnimation = () => {
//     if (actions) {
//       console.log("🎬 播放hop動畫");
//       Object.values(actions).forEach((action) => {
//         action.reset();
//         action.setLoop(THREE.LoopOnce, 1);
//         action.clampWhenFinished = true;
//         action.play();
//         action.timeScale =1.2

//       });
//     }
//   };

//   const toggleAnimation = () => {
//     setIsPlaying((prev) => {
//       const newState = !prev;
//       if (actions) {
//         Object.values(actions).forEach((action) => {
//           if (!newState) {
//             action.paused = true;
//           } else {
//             action.reset();
//             action.setLoop(THREE.LoopOnce, 1);
//             action.clampWhenFinished = true;
//             action.play();
//           }
//         });
//       }
//       return newState;
//     });
//   };

//   return (
//     <>
//       <Environment files="./2k.hdr" />
//       <ambientLight intensity={0.9} />
//       <primitive ref={modelRef} object={scene} />

//       <Html position={[-3, -1.7, 0]}>
//         <button
//           onClick={toggleAnimation}
//           style={{
//             position: "absolute",
//             padding: "7px 13px",
//             fontSize: "14px",
//             background: "#f0f0f0",
//             color: "black",
//             border: "none",
//             cursor: "pointer",
//             borderRadius: "0px",
//             transform: "translateX(-100px)",
//             transition: "background 0.3s ease, transform 0.2s ease",
//           }}

//           onMouseEnter={(e) => (e.target.style.background = "rgb(180,180,180)")}
//           onMouseLeave={(e) => (e.target.style.background = "#f0f0f0")}
//         >
//           {isPlaying ? "Pause" : "Play"}
//         </button>
//       </Html>
//     </>
//   );
// }

// export default Hopup;
















// import { useGLTF, useAnimations, Environment, Html } from "@react-three/drei";
// import { useEffect, useState, useRef } from "react";
// import * as THREE from "three";

// const Hopup = () => {
//   const { scene, animations } = useGLTF("./models/trinity12.glb"); // ✅ 直接載入模型與動畫
//   const { actions } = useAnimations(animations, scene);
//   const modelRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   // ✅ 應用硬編碼的位移、縮放、旋轉
//   useEffect(() => {
//     if (modelRef.current) {
//       modelRef.current.position.set(-5, 1, -5);
//       modelRef.current.scale.set(33, 33, 33);
//       modelRef.current.rotation.set(0.6, -2.4, -0.2);
//     }
//   }, [scene]);

//   // ✅ 停止所有動畫（初始狀態）
//   useEffect(() => {
//     if (actions) {
//       Object.values(actions).forEach((action) => action.stop());
//     }
//   }, [actions]);

//   // ✅ 每隔 2.5 秒播放動畫
//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       playAnimation();
//     }, 2500);

//     return () => clearInterval(interval);
//   }, [isPlaying, actions]);

//   const playAnimation = () => {
//     if (actions) {
//       console.log("🎬 播放hop動畫");
//       Object.values(actions).forEach((action) => {
//         action.reset();
//         action.setLoop(THREE.LoopOnce, 1);
//         action.clampWhenFinished = true;
//         action.play();
//       });
//     }
//   };

//   const toggleAnimation = () => {
//     setIsPlaying((prev) => {
//       const newState = !prev;
//       if (actions) {
//         Object.values(actions).forEach((action) => {
//           if (!newState) {
//             action.paused = true;
//           } else {
//             action.reset();
//             action.setLoop(THREE.LoopOnce, 1);
//             action.clampWhenFinished = true;
//             action.play();
//           }
//         });
//       }
//       return newState;
//     });
//   };

//   if (!scene) return null;

//   return (
//     <>
//       <directionalLight position={[1.8, -2, 3]} />
//       <Environment files="./2k.hdr" />
//       <primitive ref={modelRef} object={scene} />

//       <Html position={[-3.5, -0.9, 0]}>
//         <button
//           onClick={toggleAnimation}
//           style={{
//             position: "absolute",
//             padding: "7px 13px",
//             fontSize: "14px",
//             background: "rgb(31,31,31)",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//             borderRadius: "0px",
//             transform: "translateX(-100px)",
//             transition: "background 0.3s ease, transform 0.2s ease",
//           }}
//           onMouseEnter={(e) => (e.target.style.background = "rgb(50,50,50)")}
//           onMouseLeave={(e) => (e.target.style.background = "rgb(31,31,31)")}
//         >
//           {isPlaying ? "Pause" : "Play"}
//         </button>
//       </Html>
//     </>
//   );
// };

// export default Hopup;






