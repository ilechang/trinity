import { useGLTF, useAnimations, Environment, Html } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

function Hopup() {
  const { scene, animations } = useGLTF("./models/trinity12.glb");
  const { actions } = useAnimations(animations, scene);
  const modelRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

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
  }, [isPlaying, actions]);

  const playAnimation = () => {
    if (actions) {
      console.log("🎬 播放hop動畫");
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
            action.paused = true;
          } else {
            action.reset();
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
{/* 
<directionalLight position={[1.8, -2, 3]} intensity={0.5} />
<directionalLight position={[3.8, -1, 3]} intensity={0.5} />
<directionalLight position={[-1.8, 0, 1]} intensity={0.5} /> */}
      <Environment files="./2k.hdr" />
      <ambientLight intensity={0.7} />

      <primitive ref={modelRef} object={scene} />

      <Html position={[-3.5, -0.9, 0]}>
        <button
          onClick={toggleAnimation}
          style={{
            position: "absolute",
            padding: "7px 13px",
            fontSize: "14px",
            background: "rgb(31,31,31)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "0px",
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
}

export default Hopup;


















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






