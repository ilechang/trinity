import { ScrollControls, Scroll } from "@react-three/drei";
import Images from "./Images";
import Scene from "./Scene";

const ScrollControl = ({ enabled }) => {
  return (
    <ScrollControls
      pages={4}
      damping={0.2}
      infinite={false}
      enabled={enabled}
    >
      {/* Page 1: 只顯示 Scene */}
      <Scroll>
        <Scene />
      </Scroll>

      {/* Page 2: 顯示 Images */}
      <Scroll>
        <Images />
      </Scroll>

      {/* Page 3: 留空或加入其他內容 */}
      <Scroll>{/* Empty section or future content */}</Scroll>

      {/* Page 4: HTML Text */}
      <Scroll html>
        <h1
          style={{
            position: "absolute",
            top: "115vh",
            left: "0.5em",
            fontSize: "12vw",
          }}
        >
          Vision
        </h1>
        <div
          style={{
            position: "absolute",
            top: "160vh",
            left: "6em",
            width: "40vw",
            fontSize: "16px",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.6",
          }}
        >
          <h3 style={{ marginBottom: 0 }}>Background</h3>
          <p style={{ marginTop: "8px" }}>
            In response to the renewed popularity of airsoft in the post-COVID
            era, MODIFY TECH set out to boost brand recognition with the launch
            of a competition pistol.
          </p>

          <h3 style={{ marginBottom: 0 }}>Challenge</h3>
          <p style={{ marginTop: "8px" }}>
            As a lower-profile brand, MODIFY needed a design that delivered
            strong performance without a high price tag—innovative, yet
            compatible with common Hi-CAPA specifications.
          </p>
        </div>

        <h1
          style={{
            position: "absolute",
            top: "180vh",
            left: "60vw",
            fontSize: "10vw",
          }}
        >
          to
        </h1>
        <div
          style={{
            position: "absolute",
            top: "218vh",
            left: "60.5vw",
            width: "40vw",
            fontSize: "16px",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.6",
          }}
        >
          <h3 style={{ marginBottom: 0 }}>Process</h3>
          <h4 style={{ marginBottom: 0 }}>1. Reverse engineering</h4>
          <p style={{ marginTop: "8px" }}>
            - 3D SCANNING of an existing product (Tokyo Marui Hi-CAPA 5.1)
            <br />
          </p>

          <h4 style={{ marginBottom: 0 }}>2. Research & Improvement</h4>
          <p style={{ marginTop: "8px" }}>
            - Identifying user pain points through surveys, interviews and
            analysis
            <br />- CAD modeling
          </p>

          <h4 style={{ marginBottom: 0 }}>3. Prototyping</h4>
          <p style={{ marginTop: "8px" }}>
            - 3D printing to test the optimized ergonomics
            <br />- Testing for existing in-house parts to maximize cost
            reduction
          </p>

          <h3 style={{ marginBottom: 0 }}>Design Decisions</h3>

          <h4 style={{ marginBottom: 0 }}>1. Hop-up system redesign</h4>
          <p style={{ marginTop: "8px" }}>
            - The new hop-up allows adjustment without disassembling the gun.
          </p>

          <h4 style={{ marginBottom: 0 }}>2. Trigger system redesign</h4>
          <p style={{ marginTop: "8px" }}>
            - Ultra-short trigger pull for faster shooting.
          </p>
        </div>

        <h1
          style={{
            position: "absolute",
            top: "275vh",
            left: "6vw",
            fontSize: "16vw",
          }}
        >
          Production
        </h1>

        <div
          style={{
            position: "absolute",
            top: "330vh",
            left: "6em",
            width: "85vw",
            fontSize: "16px",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.6",
            display: "flex",
            gap: "4em", // spacing between columns
            justifyContent: "space-between",
          }}
        >
          {/* Result section */}
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: 0 }}>The result</h3>
            <p style={{ fontSize: "16px" }}>
              The end result is a refined competition pistol where form meets
              function — featuring an ergonomic grip, an innovative hop-up
              system, a match-grade trigger, and high compatibility with Tokyo
              Marui Hi-CAPA platforms.
            </p>
          </div>

          {/* Reflection section */}
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: 0 }}>Reflection</h3>
            <p style={{ fontSize: "16px" }}>
              In the end, the trigger redesign was a miscalculation. The
              original Tokyo Marui trigger was already excellent, and most
              players are not willing to pay more for minor performance gains.
              In the airsoft world, creativity often comes after price.
            </p>
          </div>
        </div>
      </Scroll>
    </ScrollControls>
  );
};

export default ScrollControl;




















// import { ScrollControls, Scroll } from "@react-three/drei";
// import Images from "./Images";
// import Scene from "./Scene";


// const ScrollControl = () => {
//   return (
//     <ScrollControls pages={4} damping={0.2} infinite={false}>
      
//       {/* Page 1: 只顯示 Scene */}
//       <Scroll>
//         <Scene />
//       </Scroll>

//       {/* Page 2: 顯示 Images */}
//       <Scroll>
//         <Images />
//       </Scroll>

//       {/* Page 3: 留空或加入其他內容 */}
//       <Scroll>
//         {/* Empty section or future content */}
//       </Scroll>

//       {/* Page 4: HTML Text */}
//       <Scroll html>
//         <h1 style={{ position: "absolute", top: "115vh", left: "0.5em", fontSize: "12vw" }}>
//         Vision
//         </h1>
//         <div
//   style={{
//     position: "absolute",
//     top: "160vh",
//     left: "6em",
//     width: "40vw",
//     fontSize: "16px",
//     fontFamily: "Arial, sans-serif",
//     lineHeight: "1.6",
//   }}
// >
// <h3 style={{ marginBottom: 0 }}>Background</h3>
//   <p style={{ marginTop: "8px" }}>
//     In response to the renewed popularity of airsoft in the post-COVID era, MODIFY TECH set out to boost brand recognition with the launch of a competition pistol.
//   </p>

//   <h3 style={{ marginBottom: 0 }}>Challenge</h3>
//   <p style={{ marginTop: "8px" }}>
//     As a lower-profile brand, MODIFY needed a design that delivered strong performance without a high price tag—innovative, yet compatible with common Hi-CAPA specifications.
//   </p>
// </div>


//         <h1 style={{ position: "absolute", top: "180vh", left: "60vw", fontSize: "10vw" }}>
//           to
//         </h1>
//         <div
//   style={{
//     position: "absolute",
//     top: "218vh",
//     left: "60.5vw",
//     width: "40vw",
//     fontSize: "16px",
//     fontFamily: "Arial, sans-serif",
//     lineHeight: "1.6",
//   }}
// >
// <h3 style={{ marginBottom: 0 }}>Process</h3>
//   <h4 style={{ marginBottom: 0}}>1. Reverse engineering</h4>
//   <p style={{ marginTop: "8px" }}>
//     - 3D SCANNING of an existing product (Tokyo Marui Hi-CAPA 5.1)<br />

//   </p>

//   <h4 style={{ marginBottom: 0 }}>2. Research & Improvement</h4>
//   <p style={{ marginTop: "8px" }}>
//     - Identifying user pain points through surveys, interviews and analysis<br />
//     - CAD modeling
//   </p>

//   <h4 style={{ marginBottom: 0 }}>3. Prototyping</h4>
//   <p style={{ marginTop: "8px" }}>
//     - 3D printing to test the optimized ergonomics<br />
//     - Testing for existing in-house parts to maximize cost reduction
//   </p>

//   <h3 style={{ marginBottom: 0 }}>Design Decisions</h3>
  

//   <h4 style={{ marginBottom: 0 }}>1. Hop-up system redesign</h4>
//   <p style={{ marginTop: "8px" }}>
//   - The new hop-up allows adjustment without disassembling the gun.
//   </p>



// <h4 style={{ marginBottom: 0 }}>2. Trigger system redesign</h4>
// <p style={{ marginTop: "8px" }}>
//   - Ultra-short trigger pull for faster shooting.
//   </p>



// </div>

//         <h1 style={{ position: "absolute", top: "275vh", left: "6vw", fontSize: "16vw" }}>
//         Production
//         </h1>
     
//         <div
//   style={{
//     position: "absolute",
//     top: "330vh",
//     left: "6em",
//     width: "85vw",
//     fontSize: "16px",
//     fontFamily: "Arial, sans-serif",
//     lineHeight: "1.6",
//     display: "flex",
//     gap: "4em", // spacing between columns
//     justifyContent: "space-between",
//   }}
// >
//   {/* Result section */}
//   <div style={{ flex: 1 }}>
//     <h3 style={{ marginBottom: 0 }}>The result</h3>
//     <p style={{ fontSize: "16px" }}>
//       The end result is a refined competition pistol where form meets function —
//       featuring an ergonomic grip, an innovative hop-up system, a match-grade trigger,
//       and high compatibility with Tokyo Marui Hi-CAPA platforms.
//     </p>
//   </div>

//   {/* Reflection section */}
//   <div style={{ flex: 1 }}>
//     <h3 style={{ marginBottom: 0 }}>Reflection</h3>
//     <p style={{ fontSize: "16px" }}>
//       In the end, the trigger redesign was a miscalculation. The original Tokyo Marui trigger
//       was already excellent, and most players are not willing to pay more for minor performance gains.
//       In the airsoft world, creativity often comes after price.
//     </p>
//   </div>
// </div>
//       </Scroll>
//     </ScrollControls>
//   );
// };

// export default ScrollControl;




















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








