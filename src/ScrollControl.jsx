
import { ScrollControls, Scroll, Environment, useGLTF, useAnimations, useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"; // 必須導入 THREE
import Images from "./Images";

const AnimatedModel = ({ model }) => {
  const modelRef = useRef();
  const { animations } = model;
  const { actions } = useAnimations(animations, modelRef);
  const scroll = useScroll(); // 取得滾動狀態

  const start = 0.01; // 動畫啟動點 (視窗內 1% 位置)
  const end = 0.9; // 動畫停止點 (超過視窗 90%)
  let hasPlayed = useRef(false); // 確保動畫只播放一次

  useEffect(() => {
    const action = actions["滑套Action"];
    if (action) {
      action.setLoop(THREE.LoopOnce); // 只播放一次
      action.clampWhenFinished = true; // 保持在最後一幀
    }
  }, [actions]);

  useFrame(() => {
    const scrollY = scroll.offset;
    if (actions["滑套Action"] && !hasPlayed.current) {
      if (scrollY >= start && scrollY <= end) {
        actions["滑套Action"].play(); // 播放動畫
        hasPlayed.current = true; // 標記動畫已播放，避免重複觸發
      }
    }
  });

  return <primitive ref={modelRef} object={model.scene} position={[2, -1, 0]} scale={15} />;
};

const ScrollControl = () => {
  const model = useGLTF("./models/lockback.glb");

  return (
    <>
      <directionalLight position={[1, 2, 3]} />
      <Environment files="./2k.hdr" />
      <ScrollControls pages={3} damping={0.2} infinite={false}>
      <Scroll>
          <Images />
          <AnimatedModel model={model} />
        </Scroll>

        <Scroll html>
          <h1 style={{ position: "absolute", top: "0vh", left: "5.4em", fontSize: "10vw" }}>
            Dominate
          </h1>
          <h1 style={{ position: "absolute", top: "120vh", left: "60vw", fontSize: "10vw" }}>
            The
          </h1>
          <h1 style={{ position: "absolute", top: "150vh", left: "0.5vw", fontSize: "30vw" }}>
            Field
          </h1>
        </Scroll>
      </ScrollControls>
    </>
  );
};

export default ScrollControl;
























// import { ScrollControls, Scroll, Environment, useGLTF, useAnimations, useScroll } from "@react-three/drei";
// import { useEffect, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import Images from "./Images";

// const AnimatedModel = ({ model }) => {
//   const modelRef = useRef();
//   const { animations } = model;
//   const { actions } = useAnimations(animations, modelRef);
//   const scroll = useScroll(); // 取得滾動狀態

//   const start = 0.01; // 動畫啟動點 (視窗內 30% 位置)
//   const end = 0.9; // 動畫停止點 (超過視窗 70%)

//   useEffect(() => {
//     const action = actions["滑套Action"];
//     if (action) {
//       action.play(); // 確保動畫已載入
//       action.paused = true; // 預設暫停
      
//       // **初始化時立即檢查滾動位置**
//       const scrollY = scroll.offset;
//       if (scrollY >= start && scrollY <= end) {
//         action.paused = false; // 如果模型已經在視窗內，直接播放動畫
//       }
//     }
//   }, [actions, scroll.offset]); // **新增 scroll.offset 讓 useEffect 在滾動時重新檢查**

//   useFrame(() => {
//     const scrollY = scroll.offset;
//     if (actions["滑套Action"]) {
//       if (scrollY >= start && scrollY <= end) {
//         actions["滑套Action"].paused = false; // 播放動畫
//       } else {
//         actions["滑套Action"].paused = true; // 暫停動畫
//       }
//     }
//   });

//   return <primitive ref={modelRef} object={model.scene} position={[2, -1, 0]} scale={15} />;
// };

// const ScrollControl = () => {
//   const model = useGLTF("./models/trinity55.glb");

//   return (
//     <>
//       <directionalLight position={[1, 2, 3]} />
//       <Environment files="./2k.hdr" />
//       <ScrollControls pages={3} damping={0.2} infinite={false}>
//         <Scroll>
//           <Images />
//           <AnimatedModel model={model} />
//           <Images />
//         </Scroll>

//         <Scroll html>
//           <h1 style={{ position: "absolute", top: "0vh", left: "5.4em", fontSize: "10vw" }}>
//             Dominate
//           </h1>
//           <h1 style={{ position: "absolute", top: "120vh", left: "60vw", fontSize: "10vw" }}>
//             The
//           </h1>
//           <h1 style={{ position: "absolute", top: "150vh", left: "0.5vw", fontSize: "30vw" }}>
//             Field
//           </h1>
//         </Scroll>
//       </ScrollControls>
//     </>
//   );
// };

// export default ScrollControl;



















// import { ScrollControls, Scroll, Environment, useGLTF } from "@react-three/drei";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import Images from "./Images";

// const AnimatedModel = ({ model }) => {
//   const modelRef = useRef();

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     modelRef.current.rotation.y = -t *0.6; // Rotate around Y-axis
   
//   });

//   return <primitive ref={modelRef} object={model.scene} position={[2.5, -1, 0]} scale={13} />;
// };

// const ScrollControl = () => {
//   const model = useGLTF("./models/trinity55.glb");

//   return (
//     <>
//       <directionalLight position={[1, 2, 3]} />
//       <Environment files="./2k.hdr" />
//       <ScrollControls pages={3} damping={0.2} infinite={false}>
//         <Scroll>
//           <Images />
//           <AnimatedModel model={model} />
//           <Images />
//         </Scroll>

//         <Scroll html>
//           <h1
//             style={{
//               position: "absolute",
//               top: "0vh",
//               left: "5.4em",
//               fontSize: "10vw",
//             }}
//           >
//             Dominate
//           </h1>
//           <h1
//             style={{
//               position: "absolute",
//               top: "120vh",
//               left: "60vw",
//               fontSize: "10vw",
//             }}
//           >
//             The
//           </h1>
//           <h1
//             style={{
//               position: "absolute",
//               top: "150vh",
//               left: "0.5vw",
//               fontSize: "30vw",
//             }}
//           >
//             Field
//           </h1>
//         </Scroll>
//       </ScrollControls>
//     </>
//   );
// };

// export default ScrollControl;






