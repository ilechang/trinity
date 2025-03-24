


















import { useThree, useFrame } from "@react-three/fiber";

import { Accordion, Table, Container } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

// ✅ Updated dataset mapping names to their corresponding model files
const partsWithFiles = [
  {
    category: "Upper Parts",
    parts: [
      { number: 1, name: "Slide (Hi-CAPA 5.1)", file: "slide.glb" },
      { number: 2, name: "Outer Barrel (Hi-CAPA 5.1)", file: "outter.glb" },
      { number: 3, name: "Inner Barrel (Hi-CAPA 5.1)", file: "innerbarrel.glb" },
      { number: 4, name: "Hop-up Bucking (Hi-CAPA 5.1/4.3)", file: "bucking.glb" },
      { number: 5, name: "Loading Nozzle Set (Hi-CAPA 5.1/4.3)", file: "nz.glb" },
      { number: 6, name: "Loading Nozzle Housing (Hi-CAPA 5.1/4.3)", file: "nzhousing.glb" },
      { number: 7, name: "Loading Nozzle Spring (Hi-CAPA 5.1/4.3)", file: "nzspring.glb" },
      { number: 8, name: "Guide Rod (Hi-CAPA 4.3)", file: "guiderod.glb" },
      { number: 9, name: "Recoil Spring (Hi-CAPA 4.3)", file: "recoilspring.glb" },
      { number: 10, name: "Recoil Spring Plug (Hi-CAPA 4.3)", file: "recoilplug.glb" }
    ]
  },
  {
    category: "Middle Frame Parts",
    parts: [
      { number: 11, name: "Valve Knocker (Hi-CAPA 5.1/4.3)", file: "knocker.glb" },
      { number: 12, name: "Sear (Hi-CAPA 5.1/4.3)", file: "sear.glb" },
      { number: 13, name: "Hammer (Hi-CAPA 5.1/4.3)", file: "hammer.glb" },
      { number: 14, name: "Hammer Strut (Hi-CAPA 5.1/4.3)", file: "strut.glb" },
      { number: 15, name: "Thumb Safety (Hi-CAPA 5.1/4.3)", file: "thumb.glb" },
      { number: 16, name: "Grip Safety (Hi-CAPA 5.1/4.3)", file: "gripsafety.glb" }
    ]
  },
  {
    category: "Grip Parts",
    parts: [
      { number: 17, name: "Grip (Hi-CAPA 5.1/4.3)", file: "grip.glb" },
      { number: 18, name: "Hammer Spring (Hi-CAPA 5.1/4.3)", file: "hammerspring.glb" },
      { number: 19, name: "Hammer Spring Cap (Hi-CAPA 5.1/4.3)", file: "hammerspringcap.glb" },
      { number: 20, name: "Hammer Spring Housing (Hi-CAPA 5.1/4.3)", file: "hammerspringhousing.glb" },
      { number: 21, name: "Sear Spring (Hi-CAPA 5.1/4.3)", file: "searspring.glb" },
      { number: 22, name: "Trigger (Hi-CAPA 5.1/4.3)", file: "trigger.glb" }
    ]
  },
  {
    category: "Magazine Parts",
    parts: [
      { number: 23, name: "Magazine (Hi-CAPA 5.1/4.3)", file: "mag.glb" },
      { number: 24, name: "Magazine Baseplate (Hi-CAPA 5.1/4.3)", file: "magbase.glb" },
      { number: 25, name: "Feeding Lip (Hi-CAPA 5.1/4.3)", file: "lip.glb" },
      { number: 26, name: "Gasket (Hi-CAPA 5.1/4.3)", file: "gasket.glb" },
      { number: 27, name: "Follower (Hi-CAPA 5.1/4.3)", file: "follower.glb" },
      { number: 28, name: "Follower Spring (Hi-CAPA 5.1/4.3)", file: "followerspring.glb" },
      { number: 29, name: "Gas Valve (Hi-CAPA 5.1/4.3)", file: "valve.glb" }
    ]
  }
];
function RotatingCamera({ speed = 0.2, isUserInteracting }) {
  const angleRef = useRef(0);
  const { camera } = useThree();

  // 📌 在使用者結束互動後，重新記錄角度
  useEffect(() => {
    if (!isUserInteracting) {
      const x = camera.position.x;
      const z = camera.position.z;
      angleRef.current = Math.atan2(x, z); // 保留目前角度
    }
  }, [isUserInteracting, camera.position.x, camera.position.z]);

  useFrame((_, delta) => {
    if (isUserInteracting) return; // 🛑 正在拖曳不旋轉

    angleRef.current -= delta * speed *0.5;

    const radius = camera.position.length(); // 動態取得半徑長度
    const x = Math.sin(angleRef.current) * radius;
    const z = Math.cos(angleRef.current) * radius;

    camera.position.set(x, 0, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ✅ Preload models based on the updated dataset
partsWithFiles.forEach(category => {
  category.parts.forEach(part => useGLTF.preload(`./models/${part.file}`));
});

export default function Tm() {
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [modelCenters, setModelCenters] = useState({});

  const toggleAccordion = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  // ✅ Load all models dynamically
  const models = partsWithFiles.flatMap(category =>
    category.parts.map(part => ({
      ...part,
      model: useGLTF(`./models/${part.file}`)
    }))
  );

  // ✅ Compute center positions for each model
  useEffect(() => {
    const centers = {};
    models.forEach(({ file, model }) => {
      const scene = model.scene;
      scene.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(scene);
      const center = new THREE.Vector3();
      box.getCenter(center);
      centers[file] = center;
    });

    setModelCenters(centers);
  }, [models]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>

<h2
          className="archivo-black-regular hi-capa-title no-select text-center"
          style={{
            fontSize: "120px",
            textAlign: "center",
            width: "100%",
            color: "black",
            zIndex: 10,
            pointerEvents: "none",
            margin: "55px auto 30px auto",

            lineHeight: "1.1",
          }}
        >
          TM Compatibility
        </h2>
<hr />


        
      {/* 3D Scene */}
      <div
        style={{
          position: "absolute",
          top: "19%",
          left: "-2%",
          width: "100%",
          height: "100%",
        }}
      >
<Canvas camera={{ position: [0, 0, 20], fov: 20 }}>
  <ambientLight intensity={0.85} />
  <Environment files="./2k.hdr" />



  {models.map(({ file, model, number }, index) => {
    const scene = model.scene;
    const center = modelCenters[file] || new THREE.Vector3(0, 0, 0);
    const labelRef = useRef();

    return (
      <group key={index}>
        <primitive object={scene} scale={18} rotation={[0, -2.5, -0.3]} />
        <Html position={[0, -2.5, 0]} zIndexRange={[10, 0]}>
  <img
    src="/images/360.jpg"
    alt="360° 產品預覽"
    width="40"
    height="40"
    style={{
      pointerEvents: "none",
      opacity: 0.8,
      animation: "floatHint 2s ease-in-out infinite",
    }}
  />
</Html>
        {activeCategory !== null &&
          partsWithFiles[activeCategory].parts.some(part => part.file === file) && (
            <Html ref={labelRef} position={[center.x, center.y, center.z]} center zIndexRange={[0, 0]}>
              
              <div className="label-container">
                <span>{number}</span>
              </div>
              
            </Html>
          )}
      </group>
    );
  })}
  <RotatingCamera speed={0.3} isUserInteracting={isUserInteracting} />

  <OrbitControls
  enableZoom={false}
  enablePan={false}
  minPolarAngle={Math.PI / 2}  // 90° 下限
  maxPolarAngle={Math.PI / 2}  // 90° 上限
  onStart={() => setIsUserInteracting(true)}
  onEnd={() => setIsUserInteracting(false)}
/>

</Canvas>





      </div>
      {/* ✅ Accordion List */}
<div className="accordion-container"
 style={{
  position: "absolute",
  top: "37%",
  left: "80%",
  width: "20%",

}}
>
  {partsWithFiles.map((category, index) => (
    <div key={index} className={`accordion-item ${activeCategory === index ? "active" : ""}`}>
      <div className="accordion-header" onClick={() => toggleAccordion(index)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>{category.category}</span>
        <span style={{ transform: "scaleY(0.6)", display: "inline-block" }}>
          {activeCategory === index ? "▲" : "▼"}
        </span>
      </div>
      <div className="accordion-body">
        <table className="accordion-table">
          <tbody>
            {category.parts.map((part) => (
              <tr key={part.number}>
                <td>{part.number}</td>
                <td>{part.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}


















//  import { Accordion, Table, Container } from "react-bootstrap";

// import React, { useState, useEffect, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
// import * as THREE from "three";
// const partsData = [
//     {
//       category: "Upper Parts",
//       parts: [
//         { number: 1, name: "Slide (Hi-CAPA 5.1)" },
//         { number: 2, name: "Outer Barrel (Hi-CAPA 5.1)" },
//         { number: 3, name: "Inner Barrel (Hi-CAPA 5.1)" },
//         { number: 4, name: "Hop-up Bucking (Hi-CAPA 5.1/4.3)" },
//         { number: 5, name: "Loading Nozzle Set (Hi-CAPA 5.1/4.3)" },
//         { number: 6, name: "Loading Nozzle Housing (Hi-CAPA 5.1/4.3)" },
//         { number: 7, name: "Loading Nozzle Spring (Hi-CAPA 5.1/4.3)" },
//         { number: 8, name: "Guide Rod (Hi-CAPA 4.3)" },
//         { number: 9, name: "Recoil Spring (Hi-CAPA 4.3)" },
//         { number: 10, name: "Recoil Spring Plug (Hi-CAPA 4.3)" }
//       ]
//     },
//     {
//       category: "Middle Frame Parts",
//       parts: [
//         { number: 11, name: "Valve Knocker (Hi-CAPA 5.1/4.3)" },
//         { number: 12, name: "Sear (Hi-CAPA 5.1/4.3)" },
//         { number: 13, name: "Hammer (Hi-CAPA 5.1/4.3)" },
//         { number: 14, name: "Hammer Strut (Hi-CAPA 5.1/4.3)" },
//         { number: 15, name: "Thumb Safety (Hi-CAPA 5.1/4.3)" },
//         { number: 16, name: "Grip Safety (Hi-CAPA 5.1/4.3)" }
//       ]
//     },
//     {
//       category: "Grip and Magazine Parts",
//       parts: [
//         { number: 17, name: "Grip (Hi-CAPA 5.1/4.3)" },
//         { number: 18, name: "Hammer Spring (Hi-CAPA 5.1/4.3)" },
//         { number: 19, name: "Hammer Spring Cap (Hi-CAPA 5.1/4.3)" },
//         { number: 20, name: "Hammer Spring Housing (Hi-CAPA 5.1/4.3)" },
//         { number: 21, name: "Sear Spring (Hi-CAPA 5.1/4.3)" },
//         { number: 22, name: "Trigger (Hi-CAPA 5.1/4.3)" },
//       ]
//     },
//     {
//       category: "Magazine Parts",
//       parts: [
//         { number: 23, name: "Magazine (Hi-CAPA 5.1/4.3)" },
//         { number: 24, name: "Magazine Baseplate (Hi-CAPA 5.1/4.3)" },
//         { number: 25, name: "Feeding Lip (Hi-CAPA 5.1/4.3)" },
//         { number: 26, name: "Gasket (Hi-CAPA 5.1/4.3)" },
//         { number: 27, name: "Follower (Hi-CAPA 5.1/4.3)" },
//         { number: 28, name: "Follower Spring (Hi-CAPA 5.1/4.3)" },
//         { number: 29, name: "Gas Valve (Hi-CAPA 5.1/4.3)" }
//       ]
//     }
//   ];
  
// // ✅ Preload models on page load
// const modelFiles = [
//   "valve.glb",
//   "magbase.glb",
//   "followerspring.glb",
//   "follower.glb",
//   "gasket.glb",
//   "lip.glb",
//   "mag.glb",
//   "trigger.glb",
//   "grip.glb",
//   "hammerspringhousing.glb",
//   "hammerspring.glb",
//   "hammerspringcap.glb",
//   "searspring.glb",
//   "gripsafety.glb",
//   "strut.glb",
//   "hammer.glb",
//   "sear.glb",
//   "knocker.glb",
//   "thumb.glb",
//   "guiderod.glb",
//   "recoilspring.glb",
//   "recoilplug.glb",
//   "nzspring.glb",
//   "slide.glb",
//   "nzhousing.glb",
//   "nz.glb",
//   "outter.glb",
//   "bucking.glb",
//   "innerbarrel.glb",
// ];

// modelFiles.forEach((file) => useGLTF.preload(`./models/${file}`));

// export default function Tm() {
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [modelCenters, setModelCenters] = useState({}); // ✅ Store correct positions

//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleAccordion = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const models = modelFiles.map((file) => ({
//     file,
//     model: useGLTF(`./models/${file}`),
//   }));

//   // ✅ Ensure bounding boxes update AFTER models are fully loaded
//   useEffect(() => {
//     const centers = {};

//     models.forEach(({ file, model }) => {
//       const scene = model.scene;
//       scene.updateMatrixWorld(true); // Ensure correct transformations

//       const box = new THREE.Box3().setFromObject(scene);
//       const center = new THREE.Vector3();
//       box.getCenter(center);

//       centers[file] = center; // Store correct center position
//     });

//     setModelCenters(centers); // Update state to ensure re-render
//   }, [models]);

//   return (
//     <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
//              <h2
//           className="archivo-black-regular hi-capa-title no-select text-center"
//           style={{
//             fontSize: "120px",
//             textAlign: "center",
//             width: "100%",
//             position: "absolute",
//             top: "-15%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             color: "black",
//             zIndex: 10,
//             pointerEvents: "none",
//           }}
//         >
//           Tokyo Marui
//           <sup
//             style={{
//               marginLeft: "10px",
//               fontSize: "24px",
//               cursor: "pointer",
//               color: "#555",
//               pointerEvents: "auto",
//             }}
//             onMouseEnter={() => setShowTooltip(true)}
//             onMouseLeave={() => setShowTooltip(false)}
//           >
//             ⍰
//           </sup>
//           Compatibility
//         </h2>

//         {showTooltip && (
//           <span
//             style={{
//               position: "absolute",
//               top: "10%",
//               left: "50%",
//               transform: "translateX(-50%)",
//               background: "white",
//               color: "black",
//               padding: "16px 18px",
//               borderRadius: "5px",
//               fontWeight: 300,
//               fontFamily: "'Arial', sans-serif",
//               fontSize: "16px",
//               zIndex: 9999,
//               pointerEvents: "none",
//               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//               maxWidth: "400px",
//               display: "block",
//               whiteSpace: "normal",
//               wordBreak: "break-word",
//               overflowWrap: "break-word",
//               textAlign: "left",
//               lineHeight: "1.5",
//             }}
//           >
//             Tokyo Marui is the golden standard in the airsoft industry. The
//             more parts of a gun that are Tokyo Marui compatible, the easier it
//             is to find replacement and upgrade parts.
//           </span>
//         )}










//       {/* 3D Scene */}
//       <div
//         style={{
//           position: "absolute",
//           top: "17%",
//           left: "0%",
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>
//           <ambientLight intensity={0.85} />
//           <Environment files="./2k.hdr" />

//           {/* ✅ Render each model with correctly stored center */}
//           {models.map(({ file, model }, index) => {
//             const scene = model.scene;
//             const center = modelCenters[file] || new THREE.Vector3(0, 0, 0);
//             const labelRef = useRef(); // ✅ Create a reference for the label

//             return (
//               <group key={index}>
//                 <primitive object={scene} scale={25} rotation={[0.5, -2.5, 0]} />
//                 <Html
//                   ref={labelRef}
//                   position={[center.x, center.y, center.z]}
//                   center
//                   zIndexRange={[0, 0]}
//                   occlude
//                 >
//                   <div className="label-container">
//                     <span>{file}</span>
//                   </div>
//                 </Html>
//               </group>
//             );
//           })}

//           <OrbitControls enableZoom={false} enablePan={false} />
//         </Canvas>












//                {/* list */}
//                <div className="accordion-container">
//       {partsData.map((category, index) => (
//         <div
//           key={index}
//           className={`accordion-item ${activeIndex === index ? "active" : ""}`}
//         >
//           {/* Accordion Header */}
//           <div
//             className="accordion-header"
//             onClick={() => toggleAccordion(index)}
//           >
//             {category.category}
//           </div>

//           {/* Accordion Body */}
//           <div className="accordion-body">
//             <table className="accordion-table">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Part Name</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {category.parts.map((part) => (
//                   <tr key={part.number}>
//                     <td>{part.number}</td>
//                     <td>{part.name}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//       </div>
//     </div>
//   );
// }



















// import React, { useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
// import * as THREE from "three";

// // ✅ Preload models on page load
// const modelFiles = [
//   "valve.glb",
//   "magbase.glb",
//   "followerspring.glb",
//   "follower.glb",
//   "gasket.glb",
//   "lip.glb",
//   "mag.glb",
//   "trigger.glb",
//   "grip.glb",
//   "hammerspringhousing.glb",
//   "hammerspring.glb",
//   "hammerspringcap.glb",
//   "searspring.glb",
//   "gripsafety.glb",
//   "strut.glb",
//   "hammer.glb",
//   "sear.glb",
//   "knocker.glb",
//   "thumb.glb",
//   "guiderod.glb",
//   "recoilspring.glb",
//   "recoilplug.glb",
//   "nzspring.glb",
//   "slide.glb",
//   "nzhousing.glb",
//   "nz.glb",
//   "outter.glb",
//   "bucking.glb",
//   "innerbarrel.glb",
// ];

// modelFiles.forEach((file) => useGLTF.preload(`./models/${file}`));

// export default function Tm() {
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [modelCenters, setModelCenters] = useState({}); // ✅ Store correct positions

//   const models = modelFiles.map((file) => ({
//     file,
//     model: useGLTF(`./models/${file}`),
//   }));

//   // ✅ Ensure bounding boxes update AFTER models are fully loaded
//   useEffect(() => {
//     const centers = {};

//     models.forEach(({ file, model }) => {
//       const scene = model.scene;
//       scene.updateMatrixWorld(true); // Ensure correct transformations

//       const box = new THREE.Box3().setFromObject(scene);
//       const center = new THREE.Vector3();
//       box.getCenter(center);

//       centers[file] = center; // Store correct center position
//     });

//     setModelCenters(centers); // Update state to ensure re-render
//   }, [models]);

//   return (
//     <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      //  <h2
      //     className="archivo-black-regular hi-capa-title no-select text-center"
      //     style={{
      //       fontSize: "120px",
      //       textAlign: "center",
      //       width: "100%",
      //       position: "absolute",
      //       top: "-15%",
      //       left: "50%",
      //       transform: "translate(-50%, -50%)",
      //       color: "black",
      //       zIndex: 10,
      //       pointerEvents: "none",
      //     }}
      //   >
      //     Tokyo Marui
      //     <sup
      //       style={{
      //         marginLeft: "10px",
      //         fontSize: "24px",
      //         cursor: "pointer",
      //         color: "#555",
      //         pointerEvents: "auto",
      //       }}
      //       onMouseEnter={() => setShowTooltip(true)}
      //       onMouseLeave={() => setShowTooltip(false)}
      //     >
      //       ⍰
      //     </sup>
      //     Compatibility
      //   </h2>

      //   {showTooltip && (
      //     <span
      //       style={{
      //         position: "absolute",
      //         top: "10%",
      //         left: "50%",
      //         transform: "translateX(-50%)",
      //         background: "white",
      //         color: "black",
      //         padding: "16px 18px",
      //         borderRadius: "5px",
      //         fontWeight: 300,
      //         fontFamily: "'Arial', sans-serif",
      //         fontSize: "16px",
      //         zIndex: 9999,
      //         pointerEvents: "none",
      //         boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      //         maxWidth: "400px",
      //         display: "block",
      //         whiteSpace: "normal",
      //         wordBreak: "break-word",
      //         overflowWrap: "break-word",
      //         textAlign: "left",
      //         lineHeight: "1.5",
      //       }}
      //     >
      //       Tokyo Marui is the golden standard in the airsoft industry. The
      //       more parts of a gun that are Tokyo Marui compatible, the easier it
      //       is to find replacement and upgrade parts.
      //     </span>
      //   )}

//       {/* 3D Scene */}
//       <div
//         style={{
//           position: "absolute",
//           top: "17%",
//           left: "0%",
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>
//           <ambientLight intensity={0.85} />
//           <Environment files="./2k.hdr" />

//           {/* ✅ Render each model with correctly stored center */}
//           {models.map(({ file, model }, index) => {
//             const scene = model.scene;
//             const center = modelCenters[file] || new THREE.Vector3(0, 0, 0);

//             return (
//               <group key={index}>
//               <primitive object={scene} scale={25} rotation={[0.5, -2.5, 0]} />
//               <Html position={[center.x, center.y, center.z]} center>
//                 <div className="label-container">
//                   <span>{file}</span>
//                 </div>
//               </Html>
//             </group>
//             );
//           })}

//           <OrbitControls enableZoom={false} enablePan={false} />
//         </Canvas>
//       </div>
//     </div>
//   );
// }




















// import React, { useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
// import * as THREE from "three";

// // ✅ Preload models on page load
// const modelFiles = [
//   "valve.glb",
//   "magbase.glb",
//   "followerspring.glb",
//   "follower.glb",
//   "gasket.glb",
//   "lip.glb",
//   "mag.glb",
//   "trigger.glb",
//   "grip.glb",
//   "hammerspringhousing.glb",
//   "hammerspring.glb",
//   "hammerspringcap.glb",
//   "searspring.glb",
//   "gripsafety.glb",
//   "strut.glb",
//   "hammer.glb",
//   "sear.glb",
//   "knocker.glb",
//   "thumb.glb",
//   "guiderod.glb",
//   "recoilspring.glb",
//   "recoilplug.glb",
//   "nzspring.glb",
//   "slide.glb",
//   "nzhousing.glb",
//   "nz.glb",
//   "outter.glb",
//   "bucking.glb",
//   "innerbarrel.glb",
// ];

// modelFiles.forEach((file) => useGLTF.preload(`./models/${file}`));

// export default function Tm() {
//   const [showTooltip, setShowTooltip] = useState(false);

//   const models = modelFiles.map((file) => ({
//     file,
//     model: useGLTF(`./models/${file}`),
//   }));

//   return (
//     <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
//       {/* 3D Scene */}
//       <div
//         style={{
//           position: "absolute",
//           top: "17%",
//           left: "0%",
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>
//           <ambientLight intensity={0.85} />
//           <Environment files="./2k.hdr" />

//           {/* ✅ Render each model with a correctly positioned HTML label */}
//           {models.map(({ file, model }, index) => {
//             const scene = model.scene;
//             scene.updateMatrixWorld(true); // Ensure world matrix is updated

//             // Compute bounding box center
//             const box = new THREE.Box3().setFromObject(scene);
//             const center = new THREE.Vector3();
//             box.getCenter(center); // Get center of bounding box

//             return (
//               <group key={index}>
//                 <primitive object={scene} scale={25} rotation={[0.5, -2.5, 0]} />
//                 <Html position={[center.x, center.y, center.z]} center>
//                   <div style={{ color:"white",background: "rgb(31,31,31)", padding: "5px", borderRadius: "5px" }}>
//                     {file}
//                   </div>
//                 </Html>
//               </group>
//             );
//           })}

//           <OrbitControls enableZoom={false} enablePan={false} />
//         </Canvas>
//       </div>
//     </div>
//   );
// }
















// import React from "react";

// import { Accordion, Table, Container } from "react-bootstrap";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
// import { useState } from "react";




// export default function Tm() {

//   const [showTooltip, setShowTooltip] = useState(false);

//   const model = useGLTF("./models/explode1.glb");


//   return (
//     <>
//       <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
//         {/* Title */}
//         <h2
//           className="archivo-black-regular hi-capa-title no-select text-center"
//           style={{
//             fontSize: "120px",
//             textAlign: "center",
//             width: "100%",
//             position: "absolute",
//             top: "-15%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             color: "black",
//             zIndex: 10,
//             pointerEvents: "none",
//           }}
//         >
//           Tokyo Marui
//           <sup
//             style={{
//               marginLeft: "10px",
//               fontSize: "24px",
//               cursor: "pointer",
//               color: "#555",
//               pointerEvents: "auto",
//             }}
//             onMouseEnter={() => setShowTooltip(true)}
//             onMouseLeave={() => setShowTooltip(false)}
//           >
//             ⍰
//           </sup>
//           Compatibility
//         </h2>

//         {showTooltip && (
//           <span
//             style={{
//               position: "absolute",
//               top: "10%",
//               left: "50%",
//               transform: "translateX(-50%)",
//               background: "white",
//               color: "black",
//               padding: "16px 18px",
//               borderRadius: "5px",
//               fontWeight: 300,
//               fontFamily: "'Arial', sans-serif",
//               fontSize: "16px",
//               zIndex: 9999,
//               pointerEvents: "none",
//               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//               maxWidth: "400px",
//               display: "block",
//               whiteSpace: "normal",
//               wordBreak: "break-word",
//               overflowWrap: "break-word",
//               textAlign: "left",
//               lineHeight: "1.5",
//             }}
//           >
//             Tokyo Marui is the golden standard in the airsoft industry. The
//             more parts of a gun that are Tokyo Marui compatible, the easier it
//             is to find replacement and upgrade parts.
//           </span>
//         )}

//         {/* 3D Model */}
//         <div
//           style={{
//             position: "absolute",
//             top: "17%",
//             left: "0%",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>


//             <ambientLight intensity={0.8} />
//             <Environment files="./2k.hdr" />
//             <primitive object={model.scene} scale={25} rotation={[0.5, -2.5, 0]} />
//             <OrbitControls enableZoom={false} enablePan={false} />
//           </Canvas>
//         </div>

      
//       </div>
//     </>
//   );
// }
































// import React from "react";

// import { Accordion, Table, Container } from "react-bootstrap";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
// import { useState } from "react";


// const partsData = [
//   {
//     category: "Upper Parts",
//     parts: [
//       { number: 1, name: "Slide (Hi-CAPA 5.1)" },
//       { number: 2, name: "Outer Barrel (Hi-CAPA 5.1)" },
//       { number: 3, name: "Inner Barrel (Hi-CAPA 5.1)" },
//       { number: 4, name: "Hop-up Bucking (Hi-CAPA 5.1/4.3)" },
//       { number: 5, name: "Loading Nozzle Set (Hi-CAPA 5.1/4.3)" },
//       { number: 6, name: "Loading Nozzle Housing (Hi-CAPA 5.1/4.3)" },
//       { number: 7, name: "Loading Nozzle Spring (Hi-CAPA 5.1/4.3)" },
//       { number: 8, name: "Guide Rod (Hi-CAPA 4.3)" },
//       { number: 9, name: "Recoil Spring (Hi-CAPA 4.3)" },
//       { number: 10, name: "Recoil Spring Plug (Hi-CAPA 4.3)" }
//     ]
//   },
//   {
//     category: "Middle Frame Parts",
//     parts: [
//       { number: 11, name: "Valve Knocker (Hi-CAPA 5.1/4.3)" },
//       { number: 12, name: "Sear (Hi-CAPA 5.1/4.3)" },
//       { number: 13, name: "Hammer (Hi-CAPA 5.1/4.3)" },
//       { number: 14, name: "Hammer Strut (Hi-CAPA 5.1/4.3)" },
//       { number: 15, name: "Thumb Safety (Hi-CAPA 5.1/4.3)" },
//       { number: 16, name: "Grip Safety (Hi-CAPA 5.1/4.3)" }
//     ]
//   },
//   {
//     category: "Grip and Magazine Parts",
//     parts: [
//       { number: 17, name: "Grip (Hi-CAPA 5.1/4.3)" },
//       { number: 18, name: "Hammer Spring (Hi-CAPA 5.1/4.3)" },
//       { number: 19, name: "Hammer Spring Cap (Hi-CAPA 5.1/4.3)" },
//       { number: 20, name: "Hammer Spring Housing (Hi-CAPA 5.1/4.3)" },
//       { number: 21, name: "Sear Spring (Hi-CAPA 5.1/4.3)" },
//       { number: 22, name: "Trigger (Hi-CAPA 5.1/4.3)" },
//     ]
//   },
//   {
//     category: "Magazine Parts",
//     parts: [
//       { number: 23, name: "Magazine (Hi-CAPA 5.1/4.3)" },
//       { number: 24, name: "Magazine Baseplate (Hi-CAPA 5.1/4.3)" },
//       { number: 25, name: "Feeding Lip (Hi-CAPA 5.1/4.3)" },
//       { number: 26, name: "Gasket (Hi-CAPA 5.1/4.3)" },
//       { number: 27, name: "Follower (Hi-CAPA 5.1/4.3)" },
//       { number: 28, name: "Follower Spring (Hi-CAPA 5.1/4.3)" },
//       { number: 29, name: "Gas Valve (Hi-CAPA 5.1/4.3)" }
//     ]
//   }
// ];

// export default function Tm() {

//   const [showTooltip, setShowTooltip] = useState(false);

//   const model = useGLTF("./models/explode1.glb");

//   const parts = [
//     { number: 1, name: "Slide" },
//     { number: 2, name: "Outer Barrel" },
//     { number: 3, name: "Inner Barrel" },
//   ];

//   return (
//     <>
//       <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
//         {/* Title */}
//         <h2
//           className="archivo-black-regular hi-capa-title no-select text-center"
//           style={{
//             fontSize: "120px",
//             textAlign: "center",
//             width: "100%",
//             position: "absolute",
//             top: "-15%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             color: "black",
//             zIndex: 10,
//             pointerEvents: "none",
//           }}
//         >
//           Tokyo Marui
//           <sup
//             style={{
//               marginLeft: "10px",
//               fontSize: "24px",
//               cursor: "pointer",
//               color: "#555",
//               pointerEvents: "auto",
//             }}
//             onMouseEnter={() => setShowTooltip(true)}
//             onMouseLeave={() => setShowTooltip(false)}
//           >
//             ⍰
//           </sup>
//           Compatibility
//         </h2>

//         {showTooltip && (
//           <span
//             style={{
//               position: "absolute",
//               top: "10%",
//               left: "50%",
//               transform: "translateX(-50%)",
//               background: "white",
//               color: "black",
//               padding: "16px 18px",
//               borderRadius: "5px",
//               fontWeight: 300,
//               fontFamily: "'Arial', sans-serif",
//               fontSize: "16px",
//               zIndex: 9999,
//               pointerEvents: "none",
//               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//               maxWidth: "400px",
//               display: "block",
//               whiteSpace: "normal",
//               wordBreak: "break-word",
//               overflowWrap: "break-word",
//               textAlign: "left",
//               lineHeight: "1.5",
//             }}
//           >
//             Tokyo Marui is the golden standard in the airsoft industry. The
//             more parts of a gun that are Tokyo Marui compatible, the easier it
//             is to find replacement and upgrade parts.
//           </span>
//         )}

//         {/* 3D Model */}
//         <div
//           style={{
//             position: "absolute",
//             top: "17%",
//             left: "0%",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>


//             <ambientLight intensity={0.8} />
//             <Environment files="./2k.hdr" />
//             <primitive object={model.scene} scale={25} rotation={[0.5, -2.5, 0]} />
//             <OrbitControls enableZoom={false} enablePan={false} />
//           </Canvas>
//         </div>

//         {/* list */}
//         <Container className="mt-4 "
//           style={{
//             position: "absolute",
//             top: "25%",
//             left: "70%",
//             transform: "translateX(-50%)",
//             width: "30%",
//             zIndex: 10, // Ensures it's above the 3D model
//             background: "rgba(255, 255, 255, 0.9)", // Light background for readability
//             borderRadius: "10px",
//             padding: "10px",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//           }}
//         >
//           <Accordion defaultActiveKey="0">
//             {partsData.map((category, index) => (
//               <Accordion.Item eventKey={index.toString()} key={index}>
//                 <Accordion.Header>{category.category}</Accordion.Header>
//                 <Accordion.Body>
//                   <Table bordered hover responsive className="text-center">
//                     <thead className="table-dark ">
//                       <tr>
//                         <th>#</th>
//                         <th>Part Name</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {category.parts.map((part) => (
//                         <tr key={part.number}>
//                           <td>{part.number}</td>
//                           <td>{part.name}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Accordion.Body>
//               </Accordion.Item>
//             ))}
//           </Accordion>
//         </Container>
//       </div>
//     </>
//   );
// }

























// import { Container, Row, Col, Table, Image } from "react-bootstrap";
// import { useGLTF , OrbitControls} from "@react-three/drei";
// import { useState } from "react";

// export default function Tm() {
//     const [showTooltip, setShowTooltip] = useState(false);

//     const model = useGLTF("./models/trinity18.glb");

//     const parts = [
//         { number: 1, name: "Slide" },
//         { number: 2, name: "Outter Barrel" },
//         { number: 3, name: "Inner Barrel" },

//     ];

//     return (
//         <>
//             <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
//                 {/* Title */}
//                 <h2
//                     className="archivo-black-regular hi-capa-title no-select text-center"
//                     style={{
//                         fontSize: "120px",
//                         textAlign: "center",
//                         width: "100%",
//                         position: "absolute",
//                         top: "-15%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         color: "black",
//                         zIndex: 10,
//                         pointerEvents: "none",
//                     }}
//                 >
//                     Tokyo Marui
//                     <sup
//                         style={{
//                             marginLeft: "10px",
//                             fontSize: "24px",
//                             cursor: "pointer",
//                             color: "#555",
//                             pointerEvents: "auto",
//                         }}
//                         onMouseEnter={() => setShowTooltip(true)}
//                         onMouseLeave={() => setShowTooltip(false)}
//                     >⍰
//                     </sup>
//                      Compatibility
//                 </h2>

//                 {showTooltip && (
//                     <span
//                         style={{
//                             position: "absolute",
//                             top: "10%",
//                             left: "50%",
//                             transform: "translateX(-50%)",
//                             background: "white",
//                             color: "black",
//                             padding: "16px 18px",
//                             borderRadius: "5px",
//                             fontWeight: 300,
//                             fontFamily: "'Arial', sans-serif",
//                             fontSize: "16px",
//                             zIndex: 9999,
//                             pointerEvents: "none",
//                             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//                             maxWidth: "400px",
//                             display: "block",
//                             whiteSpace: "normal",
//                             wordBreak: "break-word",
//                             overflowWrap: "break-word",
//                             textAlign: "left",
//                             lineHeight: "1.5"
//                         }}
//                     >
//                         Tokyo Marui is the golden standard in the airsoft industry. The more parts of a gun that are Tokyo Marui compatible, the easier it is to find replacement and upgrade parts.
//                     </span>
//                 )}

//                 <Image
//                     src="./images/爆炸圖.png"
//                     alt="Exploded View"
//                     style={{
//                         width: "65%",  // ✅ Ensures it takes most of the column width
//                         height: "auto",
//                         position: "absolute",
//                         top: "25%",
//                         left: "5%",
//                     }}
//                 />


// <table
//   style={{
//     position: "absolute",
//     top: "30%",
//     left: "65%",
//     width: "400px", // Adjust width as needed
//     backgroundColor: "#f8f9fa", // Light grey background
//     border: "2px solid #343a40", // Dark border
//     fontFamily: "Arial, sans-serif", // Set font to Arial
//     fontSize: "16px", // Adjust overall font size
//     borderCollapse: "collapse", // Remove double borders
//     textAlign: "center",
//   }}
// >
//   {/* Table Header */}
//   <thead
//     style={{
//       backgroundColor: "#343a40", // Dark theme for headers
//       color: "white",
//       fontSize: "20px", // Larger font for headers
//       fontWeight: "bold", // Make headers bold
//     }}
//   >
//     <tr>
//       <th
//         style={{
//           padding: "5px",
//           border: "1px solid #343a40",
//           height: "30px", // Increase cell height
//         }}
//       >
//         #
//       </th>
//       <th
//         style={{
//           padding: "5px",
//           border: "1px solid #343a40",
//           height: "40px", // Increase cell height
//         }}
//       >
//         Part Name
//       </th>
//     </tr>
//   </thead>

//   {/* Table Body */}
//   <tbody>
//     {parts.map((part, index) => (
//       <tr
//         key={part.number}
//         style={{
//           backgroundColor: index % 2 === 0 ? "#e9ecef" : "#ffffff", // Striped effect
//         }}
//       >
//         <td
//           style={{
//             padding: "5px",
//             border: "1px solid #343a40",
//             height: "40px", // Increase cell height
//           }}
//         >
//           {part.number}
//         </td>
//         <td
//           style={{
//             padding: "5px",
//             border: "1px solid #343a40",
//             height: "40px", // Increase cell height
//           }}
//         >
//           {part.name}
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>



//             </div>
//         </>
//     );
// }
