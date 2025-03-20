import { ScrollControls, Scroll, useGLTF, useAnimations, useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Images from "./Images";
import Scene from "./Scene";

const AnimatedModel = ({ model }) => {
  const modelRef = useRef();
  const { animations } = model;
  const { actions } = useAnimations(animations, modelRef);
  const scroll = useScroll();

  const triggerScroll = 0.33; // Animation triggers at 50% scroll
  let hasPlayed = useRef(false);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.setLoop(THREE.LoopOnce, 1); // Play once
      action.clampWhenFinished = true; // Hold last frame
      action.timeScale = 1.5; // Speed up animation
    });
  }, [actions]);

  useFrame(() => {
    if (!actions || Object.keys(actions).length === 0) return; // Ensure actions exist

    const scrollY = scroll.offset;

    // Reset animation if user scrolls back up
    if (scrollY < triggerScroll - 0.1) {
      hasPlayed.current = false;
    }

    // Trigger animation at the right scroll position
    if (!hasPlayed.current && scrollY >= triggerScroll) {
      Object.values(actions).forEach((action) => action.reset().play());
      hasPlayed.current = true; // Prevent replaying while scrolling
    }
  });

  return <primitive ref={modelRef} object={model.scene} position={[2, -7, 0]} scale={15} />;
};
const ScrollControl = () => {
  const model = useGLTF("./models/shoot1.glb");

  return (
    <>

      <ScrollControls pages={4} damping={0.2} infinite={false}>
        
        {/* Page 1: 只顯示 Scene */}
        <Scroll>
      
          <Scene />
        </Scroll>

        {/* Page 2: 顯示 Images */}
        <Scroll>
          <Images />
        </Scroll>

        {/* Page 3: 顯示 AnimatedModel */}
        <Scroll>
          <AnimatedModel model={model} />
        </Scroll>

        {/* Page 4: 顯示標題 */}
     
          
        <Scroll html>
        {/* <p
    className="archivo-black-regular"
    style={{
      textAlign: "center",
      width: "80%", // Make it responsive
      width: "1000px", // Prevent too-wide text
      fontSize: "14px",
      color: "white",

      position: "absolute", 
      top: "87vh",

     
    }}
  >
        Trinity is a high-end match-grade airsoft pistol. With its quality and
        practical design, it enhances a shooter's performance, making it ideal for
        tactical training, recreational shooting, airsoft gameplay, and competition shooting.
      </p> */}
          <h1 style={{ position: "absolute", top: "110vh", left: "5.4em", fontSize: "10vw" }}>
            Dominate
          </h1>
          <h1 style={{ position: "absolute", top: "220vh", left: "60vw", fontSize: "10vw" }}>
            The
          </h1>
          <h1 style={{ position: "absolute", top: "262vh", left: "0.5vw", fontSize: "30vw" }}>
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
// import * as THREE from "three";
// import Images from "./Images";


// const AnimatedModel = ({ model }) => {
//   const modelRef = useRef();
//   const { animations } = model;
//   const { actions } = useAnimations(animations, modelRef);
//   const scroll = useScroll();

//   const start = 0.01;
//   const end = 0.9;
//   let playCount = useRef(0);
//   let hasPlayed = useRef(false);

//   useEffect(() => {
//     Object.values(actions).forEach((action) => {
//       action.setLoop(THREE.LoopOnce, 1); // Play each action一次
//       action.clampWhenFinished = true; // 保持最後一幀
//       action.timeScale = 1.5; // **加速 1.5 倍**
//     });
//   }, [actions]);

//   useFrame(() => {
//     const scrollY = scroll.offset;

//     // 如果滾動回到起點，重置播放狀態
//     if (scrollY < start) {
//       hasPlayed.current = false;
//       playCount.current = 0;
//     }

//     if (!hasPlayed.current && playCount.current < 5) {
//       if (scrollY >= start && scrollY <= end) {
//         Object.values(actions).forEach((action) => action.reset().play());

//         playCount.current += 1;
//         if (playCount.current >= 2) {
//           hasPlayed.current = true; // 防止繼續播放
//         }
//       }
//     }
//   });

//   return <primitive ref={modelRef} object={model.scene} position={[2, -1, 0]} scale={15} />;
// };

// const ScrollControl = () => {
//   const model = useGLTF("./models/shoot1.glb");

//   return (
//     <>
//       <directionalLight position={[1, 2, 3]} />
//       <Environment files="./2k.hdr" />
//       <ScrollControls pages={3} damping={0.2} infinite={false}>
//         <Scroll>
//           <Images />
//           <AnimatedModel model={model} />
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


















// import { ScrollControls, Scroll, Environment, useGLTF, useAnimations, useScroll } from "@react-three/drei";
// import { useEffect, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import Images from "./Images";

// const AnimatedModel = ({ model }) => {
//   const modelRef = useRef();
//   const { animations } = model;
//   const { actions } = useAnimations(animations, modelRef);
//   const scroll = useScroll();

//   const start = 0.01;
//   const end = 0.9;
//   let playCount = useRef(0);
//   let hasPlayed = useRef(false);

//   useEffect(() => {
//     Object.values(actions).forEach((action) => {
//       action.setLoop(THREE.LoopOnce, 1); // Play each action once
//       action.clampWhenFinished = true; // Keep last frame when finished
//     });
//   }, [actions]);

//   useFrame(() => {
//     const scrollY = scroll.offset;

//     // Reset if user scrolls back up
//     if (scrollY < start) {
//       hasPlayed.current = false;
//       playCount.current = 0;
//     }

//     if (!hasPlayed.current && playCount.current < 5) {
//       if (scrollY >= start && scrollY <= end) {
//         // Play all actions to simulate a shot
//         Object.values(actions).forEach((action) => action.reset().play());

//         playCount.current += 1;
//         if (playCount.current >= 2) {
//           hasPlayed.current = true; // Prevent further play
//         }
//       }
//     }
//   });

//   return <primitive ref={modelRef} object={model.scene} position={[2, -1, 0]} scale={15} />;
// };

// const ScrollControl = () => {
//   const model = useGLTF("./models/shoot1.glb");

//   return (
//     <>
//       <directionalLight position={[1, 2, 3]} />
//       <Environment files="./2k.hdr" />
//       <ScrollControls pages={3} damping={0.2} infinite={false}>
//         <Scroll>
//           <Images />
//           <AnimatedModel model={model}  />
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




























// import { ScrollControls, Scroll, Environment, useGLTF, useAnimations, useScroll } from "@react-three/drei";
// import { useEffect, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three"; // 必須導入 THREE
// import Images from "./Images";

// const AnimatedModel = ({ model }) => {
//   const modelRef = useRef();
//   const { animations } = model;
//   const { actions } = useAnimations(animations, modelRef);

// console.log(animations)

//   const scroll = useScroll(); // 取得滾動狀態

//   const start = 0.01; // 動畫啟動點 (視窗內 1% 位置)
//   const end = 0.9; // 動畫停止點 (超過視窗 90%)
//   let hasPlayed = useRef(false); // 確保動畫只播放一次

//   useEffect(() => {
//     const action = actions["滑套Action"];
//     if (action) {
//       action.setLoop(THREE.LoopOnce); // 只播放一次
//       action.clampWhenFinished = true; // 保持在最後一幀
//     }
//   }, [actions]);

//   useFrame(() => {
//     const scrollY = scroll.offset;
//     if (actions["滑套Action"] && !hasPlayed.current) {
//       if (scrollY >= start && scrollY <= end) {
//         actions["滑套Action"].play(); // 播放動畫
//         hasPlayed.current = true; // 標記動畫已播放，避免重複觸發
//       }
//     }
//   });

//   return <primitive ref={modelRef} object={model.scene} position={[2, -1, 0]} scale={15} />;
// };

// const ScrollControl = () => {
//   const model = useGLTF("./models/shoot.glb");

//   return (
//     <>
//       <directionalLight position={[1, 2, 3]} />
//       <Environment files="./2k.hdr" />
//       <ScrollControls pages={3} damping={0.2} infinite={false}>
//       <Scroll>
//           <Images />
//           <AnimatedModel model={model} />
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

















