import { ScrollControls, Scroll } from "@react-three/drei";
import Images from "./Images";
import Scene from "./Scene";

const ScrollControl = () => {
  return (
    <ScrollControls pages={4} damping={0.2} infinite={false}>
      
      {/* Page 1: 只顯示 Scene */}
      <Scroll>
        <Scene />
      </Scroll>

      {/* Page 2: 顯示 Images */}
      <Scroll>
        <Images />
      </Scroll>

      {/* Page 3: 留空或加入其他內容 */}
      <Scroll>
        {/* Empty section or future content */}
      </Scroll>

      {/* Page 4: HTML Text */}
      <Scroll html>
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
  );
};

export default ScrollControl;




















// import { ScrollControls, Scroll, useGLTF, useAnimations, useScroll } from "@react-three/drei";
// import { useEffect, useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import Images from "./Images";
// import Scene from "./Scene";

// const AnimatedModel = ({ model }) => {
//   const modelRef = useRef();
//   const { animations } = model;
//   const { actions } = useAnimations(animations, modelRef);
//   const scroll = useScroll();

//   const triggerScroll = 0.33; // Animation triggers at 50% scroll
//   let hasPlayed = useRef(false);

//   useEffect(() => {
//     Object.values(actions).forEach((action) => {
//       action.setLoop(THREE.LoopOnce, 1); // Play once
//       action.clampWhenFinished = true; // Hold last frame
//       action.timeScale = 1.5; // Speed up animation
//     });
//   }, [actions]);

//   useFrame(() => {
//     if (!actions || Object.keys(actions).length === 0) return; // Ensure actions exist

//     const scrollY = scroll.offset;

//     // Reset animation if user scrolls back up
//     if (scrollY < triggerScroll - 0.1) {
//       hasPlayed.current = false;
//     }

//     // Trigger animation at the right scroll position
//     if (!hasPlayed.current && scrollY >= triggerScroll) {
//       Object.values(actions).forEach((action) => action.reset().play());
//       hasPlayed.current = true; // Prevent replaying while scrolling
//     }
//   });

//   return <primitive ref={modelRef} object={model.scene} position={[2, -7, 0]} scale={15} />;
// };
// const ScrollControl = () => {
//   const model = useGLTF("./models/shoot1.glb");

//   return (
//     <>

//       <ScrollControls pages={4} damping={0.2} infinite={false}>
        
//         {/* Page 1: 只顯示 Scene */}
//         <Scroll>
      
//           <Scene />
//         </Scroll>

//         {/* Page 2: 顯示 Images */}
//         <Scroll>
//           <Images />
//         </Scroll>

//         {/* Page 3: 顯示 AnimatedModel */}
//         <Scroll>
//           <AnimatedModel model={model} />
//         </Scroll>

//         {/* Page 4: 顯示標題 */}
     
          
//         <Scroll html>
//         {/* <p
//     className="archivo-black-regular"
//     style={{
//       textAlign: "center",
//       width: "80%", // Make it responsive
//       width: "1000px", // Prevent too-wide text
//       fontSize: "14px",
//       color: "white",

//       position: "absolute", 
//       top: "87vh",

     
//     }}
//   >
//         Trinity is a high-end match-grade airsoft pistol. With its quality and
//         practical design, it enhances a shooter's performance, making it ideal for
//         tactical training, recreational shooting, airsoft gameplay, and competition shooting.
//       </p> */}
//           <h1 style={{ position: "absolute", top: "110vh", left: "5.4em", fontSize: "10vw" }}>
//             Dominate
//           </h1>
//           <h1 style={{ position: "absolute", top: "220vh", left: "60vw", fontSize: "10vw" }}>
//             The
//           </h1>
//           <h1 style={{ position: "absolute", top: "262vh", left: "0.5vw", fontSize: "30vw" }}>
//             Field
//           </h1>
          
//         </Scroll>
//       </ScrollControls>
//     </>
//   );
// };

// export default ScrollControl;








