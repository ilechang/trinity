import { Environment, Html, useGLTF } from "@react-three/drei";
import { a, useSprings } from "@react-spring/three";
import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import "./styles.css";

const items = [
  { initialPosition: [-3.5, 0, 0], finalPosition: [-1.5, -0.95, 0] },
  { initialPosition: [0, 3.5, 0], finalPosition: [0, -1, 0] },
  { initialPosition: [3.5, 0, 0], finalPosition: [1.5, -0.95, 0] },
];

const Scene = () => {
  const { scene } = useGLTF("/models/compressed.glb"); // ✅ 直接載入模型

  const groupRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  const [animationComplete, setAnimationComplete] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // ✅ 預先 clone 三份模型
  const clonedScenes = useMemo(() => {
    return Array.from({ length: items.length }, () => scene.clone());
  }, [scene]);

  const rotations = [
    [0.15, -2.25, -0.2],
    [0.25, -1.57, -0.22],
    [0.15, -0.8, -0.2],
  ];

  const springs = useSprings(
    items.length,
    items.map((item, index) => ({
      from: { position: item.initialPosition },
      to: { position: item.finalPosition },
      config: { duration: 300 },
      onRest: () => {
        if (index === items.length - 1) setAnimationComplete(true);
      },
    }))
  );

  useFrame(({ pointer }) => {
    if (animationComplete) {
      targetRotation.current.y = pointer.x * 0.2;
      targetRotation.current.x = -pointer.y * 0.2;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x +=
        (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      {/* <Environment files="./2k.hdr" /> */}
      <Environment  files="./quad.hdr" />

      <group ref={groupRef}>
        {springs.map((spring, i) => (
          <a.primitive
            key={i}
            object={clonedScenes[i]}
            scale={12}
            position={spring.position}
            rotation={rotations[i]}
          />
        ))}
      </group>



      <Html fullscreen>
  <div
    className="html-container text-center"
    style={{
      position: "absolute",
      top: "10%", // 👈 調整這裡就能往上移
      left: "50%",
      transform: "translateX(-50%)",
      color: "white",
    }}
  >
    <h1 className="hurricane-text trinity-title no-select">Trinity</h1>
    <h2 className="archivo-black-regular hi-capa-title no-select">Hi-CAPA</h2>
    <h3 className="archivo-black-regular subtitle no-select">
      Airsoft Gas Blowback Pistol
    </h3>
    <p className="landing-p archivo-black-thin">
      Industrial Design | Modify Tech | 2022–2023 | Solo-led
    </p>
  </div>
</Html>



    </>
  );
};

export default Scene;






















// import { Environment, Html } from "@react-three/drei";
// import { a, useSprings } from "@react-spring/three";
// import { useRef, useState,useEffect, useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import "./styles.css"; // Import the external CSS file
// import { useSharedModel } from "./ModelProvider";


// const items = [
//   { initialPosition: [-3.5, 0, 0], finalPosition: [-1.5, -0.95, 0] },
//   { initialPosition: [0, 3.5, 0], finalPosition: [0, -1, 0] },
//   { initialPosition: [3.5, 0, 0], finalPosition: [1.5, -0.95, 0] },
// ];

// const Scene = () => {
//   const { scene } = useSharedModel(); // 取得共享的模型
//   const groupRef = useRef(); // Group reference for rotation
//   const targetRotation = useRef({ x: 0, y: 0 }); // Store target rotation values
//   const [animationComplete, setAnimationComplete] = useState(false);

//   const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

//   useEffect(() => {
//     const updateHeight = () => setViewportHeight(window.innerHeight);
//     window.addEventListener("resize", updateHeight);
//     return () => window.removeEventListener("resize", updateHeight);
//   }, []);


//   // **預先克隆模型，避免 map 內多次 clone**
//   const clonedScenes = useMemo(() => {
//     return Array.from({ length: items.length }, () => scene.clone());
//   }, [scene]);

//   // Hardcoded rotation values from Leva
//   const rotations = [
//     [0.15, -2.25, -0.2], // First model
//     [0.25, -1.57, -0.22], // Second model
//     [0.15, -0.8, -0.2], // Third model
//   ];

//   // Animate models to final position
//   const springs = useSprings(
//     items.length,
//     items.map((item, index) => ({
//       from: { position: item.initialPosition },
//       to: { position: item.finalPosition },
//       config: { duration: 300 },
//       onRest: () => {
//         if (index === items.length - 1) setAnimationComplete(true); // Only update when the last one finishes
//       },
//     }))
//   );

//   // Update target rotation on cursor movement AFTER animation completes
//   useFrame(({ pointer }) => {
//     if (animationComplete) {
//       targetRotation.current.y = pointer.x * 0.2; // Rotate left/right based on cursor X
//       targetRotation.current.x = -pointer.y * 0.2; // Tilt up/down based on cursor Y
//     }

//     // Smoothly interpolate the actual group rotation to the target rotation
//     if (groupRef.current) {
//       groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05; // Apply damping
//       groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05; // Apply damping
//     }
//   });

//   return (
//     <>

//       {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
//       <ambientLight intensity={0.5} />
//       <Environment files="./2k.hdr" />

//       {/* Group to control collective rotation */}
//       <group ref={groupRef}>
//         {springs.map((spring, i) => (
//           <a.primitive
//             key={i}
//             object={clonedScenes[i]} // 使用預先克隆的模型
//             scale={12}
//             position={spring.position} // Start with spring animation
//             rotation={rotations[i]}
//           />
//         ))}
//       </group>

//       {/* Fixed HTML Elements */}
//       <Html position={[0, 2.2, 0]} center>
//         <div className="html-container">
//           <h1 className="hurricane-text trinity-title no-select">Trinity</h1>
//           <h2 className="archivo-black-regular hi-capa-title no-select">Hi-CAPA</h2>
//           <h3 className="archivo-black-regular subtitle no-select">
//             Airsoft Gas Blowback Pistol
//           </h3>
//         </div>
//         <p
//         className="archivo-black-regular "
//         style={{
     
         
//           textAlign: "center",
//           width: "100%",
//           maxWidth: "1200px",
//           fontSize: "14px",
//           color: "white",
//           position: "absolute", 
//           top: "75%",
//           left: "50%",
//           transform: "translateX(-50%)"
        
//         }}
//       >
//         Trinity is a high-end match-grade airsoft pistol. With its quality and
//         practical design, it enhances a shooter's performance, making it ideal for
//         tactical training, recreational shooting, airsoft gameplay, and competition shooting.
//       </p>
          
//       </Html>

//     </>
//   );
// };

// export default Scene;





















// import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
// import { a, useSprings } from "@react-spring/three";
// import { useRef, useState } from "react";
// import { useFrame } from "@react-three/fiber";
// import "./styles.css"; // Import the external CSS file

// const items = [
//   { initialPosition: [-3.5, 0, 0], finalPosition: [-1.5, -0.28, 0] },
//   { initialPosition: [0, 3.5, 0], finalPosition: [0, -0.5, 0] },
//   { initialPosition: [3.5, 0, 0], finalPosition: [1.5, -0.28
//     , 0] },
// ];

// const Scene = () => {
//   const { scene } = useGLTF("./models/trinity12.glb");
//   const groupRef = useRef(); // Group reference for rotation
//   const targetRotation = useRef({ x: 0, y: 0 }); // Store target rotation values
//   const [animationComplete, setAnimationComplete] = useState(false);

//   // Hardcoded rotation values from Leva
//   const rotations = [
//     [0.38, -2.25, -0.2],  // First model
//     [0.36, -1.57, -0.22],  // Second model
//     [0.38, -0.8, -0.2],   // Third model
//   ];

//   // Animate models to final position
//   const springs = useSprings(
//     items.length,
//     items.map((item, index) => ({
//       from: { position: item.initialPosition },
//       to: { position: item.finalPosition },
//       config: { duration: 300 },
//       onRest: () => {
//         if (index === items.length - 1) setAnimationComplete(true); // Only update when the last one finishes
//       },
//     }))
//   );

//   // Update target rotation on cursor movement AFTER animation completes
//   useFrame(({ pointer }) => {
//     if (animationComplete) {
//       targetRotation.current.y = pointer.x * 0.2; // Rotate left/right based on cursor X
//       targetRotation.current.x = -pointer.y * 0.2; // Tilt up/down based on cursor Y
//     }

//     // Smoothly interpolate the actual group rotation to the target rotation
//     if (groupRef.current) {
//       groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05; // Apply damping
//       groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05; // Apply damping
//     }
//   });

//   return (
//     <>
//       <OrbitControls enableZoom={false} enablePan={false} />
//       <ambientLight intensity={0.5} />
//       <Environment files="./2k.hdr" />

//       {/* Group to control collective rotation */}
//       <group ref={groupRef}>
//         {springs.map((spring, i) => (
//           <a.primitive
//             key={i}
//             object={scene.clone()}
//             scale={12}
//             position={spring.position} // Start with spring animation
//             rotation={rotations[i]}
//           />
//         ))}
//       </group>

//       {/* Fixed HTML Elements */}
//       <Html position={[0, 2.2, 0]} center>
//         <>
//         <div className="html-container">
//           <h1 className="hurricane-text trinity-title no-select">Trinity</h1>
//           <h2 className="archivo-black-regular hi-capa-title no-select">Hi-CAPA</h2>
//           <h3 className="archivo-black-regular subtitle no-select">Airsoft Gas Blowback Pistol</h3>
//         </div>
//         <p style={{marginTop:"265px"}} className="archivo-black-regular text no-select">Trinity is a high-end match-grade airsoft pistol. With its quality and practical design, it enhances a shooter's performance, making it ideal for tactical training, recreational shooting, airsoft gameplay, and competition shooting.</p>
//         </>
//       </Html>
      
//     </>
//   );
// };

// export default Scene;









