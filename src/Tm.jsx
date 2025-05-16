import { useThree, useFrame } from "@react-three/fiber";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

const PARTS_WITH_FILES= [
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
      { number: 15, name: "Thumb Safety Left (Hi-CAPA 5.1/4.3)", file: "thumbleft.glb" },
      { number: 16, name: "Thumb Safety Right (Hi-CAPA 5.1/4.3)", file: "thumbright.glb" },
      { number: 17, name: "Grip Safety (Hi-CAPA 5.1/4.3)", file: "gripsafety.glb" }
    ]
  },
  {
    category: "Grip Parts",
    parts: [
      { number: 18, name: "Grip (Hi-CAPA 5.1/4.3)", file: "gripsm.glb" },
      { number: 19, name: "Hammer Spring (Hi-CAPA 5.1/4.3)", file: "hammerspring.glb" },
      { number: 20, name: "Hammer Spring Cap (Hi-CAPA 5.1/4.3)", file: "hammerspringcap.glb" },
      { number: 21, name: "Hammer Spring Housing (Hi-CAPA 5.1/4.3)", file: "hammerspringhousing.glb" },
      { number: 22, name: "Sear Spring (Hi-CAPA 5.1/4.3)", file: "searspringsm.glb" },
      { number: 23, name: "Trigger (Hi-CAPA 5.1/4.3)", file: "trigger.glb" }
    ]
  },
  {
    category: "Magazine Parts",
    parts: [
      { number: 24, name: "Magazine (Hi-CAPA 5.1/4.3)", file: "mag.glb" },
      { number: 25, name: "Magazine Baseplate (Hi-CAPA 5.1/4.3)", file: "magbase.glb" },
      { number: 26, name: "Feeding Lip (Hi-CAPA 5.1/4.3)", file: "lip.glb" },
      { number: 27, name: "Gasket (Hi-CAPA 5.1/4.3)", file: "gasket.glb" },
      { number: 28, name: "Follower (Hi-CAPA 5.1/4.3)", file: "follower.glb" },
      { number: 29, name: "Follower Spring (Hi-CAPA 5.1/4.3)", file: "followerspring.glb" },
      { number: 30, name: "Gas Valve (Hi-CAPA 5.1/4.3)", file: "valve.glb" }
    ]
  }
];


function RotatingCamera({ speed = 0.2, isUserInteracting }) {
  const angleRef = useRef(0);
  const { camera } = useThree();

  useEffect(() => {
    if (!isUserInteracting) {
      const x = camera.position.x;
      const z = camera.position.z;
      angleRef.current = Math.atan2(x, z);
    }
  }, [isUserInteracting, camera.position.x, camera.position.z]);

  useFrame((_, delta) => {
    if (isUserInteracting) return;
    angleRef.current -= delta * speed * 0.5;
    const radius = camera.position.length();
    const x = Math.sin(angleRef.current) * radius;
    const z = Math.cos(angleRef.current) * radius;
    camera.position.set(x, 0, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function ModelItem({ file, number, activeCategory }) {
  const { scene } = useGLTF(`./models/${file}`);
  const labelRef = useRef();

  // 動態計算中心點
  const [center, setCenter] = useState(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (scene) {
      scene.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(scene);
      const newCenter = new THREE.Vector3();
      box.getCenter(newCenter);
      setCenter(newCenter);
    }
  }, [scene]);

  return (
    <group>
      <primitive object={scene} scale={18} rotation={[0, -2.5, -0.3]} />
      <Html position={[0, -2.5, 0]} zIndexRange={[10, 0]}>
        <img
          src="/images/360.jpg"
          alt="360° 產品預覽"
          width="40"
          height="40"
          style={{ pointerEvents: "none", opacity: 0.8, animation: "floatHint 2s ease-in-out infinite" }}
        />
      </Html>
      {activeCategory !== null &&
        PARTS_WITH_FILES[activeCategory].parts.some(part => part.file === file) && (
          <Html ref={labelRef} position={[center.x, center.y, center.z]} center zIndexRange={[0, 0]}>
            <div className="label-container">
              <span>{number}</span>
            </div>
          </Html>
        )}
    </group>
  );
}

PARTS_WITH_FILES.forEach(category => {
  category.parts.forEach(part => useGLTF.preload(`./models/${part.file}`));
});

export default function Tm() {
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);
  const sceneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldRender(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <h2
        className="archivo-black-regular hi-capa-secondary-title no-select text-center"
        style={{ fontSize: "120px", textAlign: "center", width: "100%", color: "black", zIndex: 10, pointerEvents: "none", margin: "55px auto 30px auto", lineHeight: "1.1" }}
      >
        TM Compatibility
      </h2>
      <hr />
      <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: "2rem" }}>
        Tokyo Marui(TM) sets the gold standard in the airsoft industry. The more parts of a gun that are compatible with TM, the easier it is to find replacements and upgrades.
      </p>

      <div ref={sceneRef} style={{ position: "absolute", top: "26%", left: "-2%", width: "100%", height: "100%" }}>
        {shouldRender && (
          <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>
            <ambientLight intensity={0.85} />
            <Environment files="./quad.hdr" />
            <Suspense fallback={null}>
              {PARTS_WITH_FILES.flatMap(category =>
                category.parts.map((part, index) => (
                  <ModelItem
                    key={index}
                    file={part.file}
                    number={part.number}
                    activeCategory={activeCategory}
                  />
                ))
              )}
              <RotatingCamera speed={0.3} isUserInteracting={isUserInteracting} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                onStart={() => setIsUserInteracting(true)}
                onEnd={() => setIsUserInteracting(false)}
              />
            </Suspense>
          </Canvas>
        )}
      </div>

      <div className="accordion-container" style={{ position: "absolute", top: "45%", left: "80%", width: "25%" }}>
        {PARTS_WITH_FILES.map((category, index) => (
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





















// import { useThree, useFrame } from "@react-three/fiber";

// import { Accordion, Table, Container } from "react-bootstrap";
// import React, { useState, useEffect, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
// import * as THREE from "three";

// // ✅ Updated dataset mapping names to their corresponding model files
// const partsWithFiles = [
//   {
//     category: "Upper Parts",
//     parts: [
//       { number: 1, name: "Slide (Hi-CAPA 5.1)", file: "slide.glb" },
//       { number: 2, name: "Outer Barrel (Hi-CAPA 5.1)", file: "outter.glb" },
//       { number: 3, name: "Inner Barrel (Hi-CAPA 5.1)", file: "innerbarrel.glb" },
//       { number: 4, name: "Hop-up Bucking (Hi-CAPA 5.1/4.3)", file: "bucking.glb" },
//       { number: 5, name: "Loading Nozzle Set (Hi-CAPA 5.1/4.3)", file: "nz.glb" },
//       { number: 6, name: "Loading Nozzle Housing (Hi-CAPA 5.1/4.3)", file: "nzhousing.glb" },
//       { number: 7, name: "Loading Nozzle Spring (Hi-CAPA 5.1/4.3)", file: "nzspring.glb" },
//       { number: 8, name: "Guide Rod (Hi-CAPA 4.3)", file: "guiderod.glb" },
//       { number: 9, name: "Recoil Spring (Hi-CAPA 4.3)", file: "recoilspring.glb" },
//       { number: 10, name: "Recoil Spring Plug (Hi-CAPA 4.3)", file: "recoilplug.glb" }
//     ]
//   },
//   {
//     category: "Middle Frame Parts",
//     parts: [
//       { number: 11, name: "Valve Knocker (Hi-CAPA 5.1/4.3)", file: "knocker.glb" },
//       { number: 12, name: "Sear (Hi-CAPA 5.1/4.3)", file: "sear.glb" },
//       { number: 13, name: "Hammer (Hi-CAPA 5.1/4.3)", file: "hammer.glb" },
//       { number: 14, name: "Hammer Strut (Hi-CAPA 5.1/4.3)", file: "strut.glb" },
//       { number: 15, name: "Thumb Safety Left (Hi-CAPA 5.1/4.3)", file: "thumbleft.glb" },
//       { number: 16, name: "Thumb Safety Right (Hi-CAPA 5.1/4.3)", file: "thumbright.glb" },
//       { number: 17, name: "Grip Safety (Hi-CAPA 5.1/4.3)", file: "gripsafety.glb" }
//     ]
//   },
//   {
//     category: "Grip Parts",
//     parts: [
//       { number: 18, name: "Grip (Hi-CAPA 5.1/4.3)", file: "gripsm.glb" },
//       { number: 19, name: "Hammer Spring (Hi-CAPA 5.1/4.3)", file: "hammerspring.glb" },
//       { number: 20, name: "Hammer Spring Cap (Hi-CAPA 5.1/4.3)", file: "hammerspringcap.glb" },
//       { number: 21, name: "Hammer Spring Housing (Hi-CAPA 5.1/4.3)", file: "hammerspringhousing.glb" },
//       { number: 22, name: "Sear Spring (Hi-CAPA 5.1/4.3)", file: "searspringsm.glb" },
//       { number: 23, name: "Trigger (Hi-CAPA 5.1/4.3)", file: "trigger.glb" }
//     ]
//   },
//   {
//     category: "Magazine Parts",
//     parts: [
//       { number: 24, name: "Magazine (Hi-CAPA 5.1/4.3)", file: "mag.glb" },
//       { number: 25, name: "Magazine Baseplate (Hi-CAPA 5.1/4.3)", file: "magbase.glb" },
//       { number: 26, name: "Feeding Lip (Hi-CAPA 5.1/4.3)", file: "lip.glb" },
//       { number: 27, name: "Gasket (Hi-CAPA 5.1/4.3)", file: "gasket.glb" },
//       { number: 28, name: "Follower (Hi-CAPA 5.1/4.3)", file: "follower.glb" },
//       { number: 29, name: "Follower Spring (Hi-CAPA 5.1/4.3)", file: "followerspring.glb" },
//       { number: 30, name: "Gas Valve (Hi-CAPA 5.1/4.3)", file: "valve.glb" }
//     ]
//   }
// ];

// function RotatingCamera({ speed = 0.2, isUserInteracting }) {
//   const angleRef = useRef(0);
//   const { camera } = useThree();

//   // 📌 在使用者結束互動後，重新記錄角度
//   useEffect(() => {
//     if (!isUserInteracting) {
//       const x = camera.position.x;
//       const z = camera.position.z;
//       angleRef.current = Math.atan2(x, z); // 保留目前角度
//     }
//   }, [isUserInteracting, camera.position.x, camera.position.z]);

//   useFrame((_, delta) => {
//     if (isUserInteracting) return; // 🛑 正在拖曳不旋轉

//     angleRef.current -= delta * speed *0.5;

//     const radius = camera.position.length(); // 動態取得半徑長度
//     const x = Math.sin(angleRef.current) * radius;
//     const z = Math.cos(angleRef.current) * radius;

//     camera.position.set(x, 0, z);
//     camera.lookAt(0, 0, 0);
//   });

//   return null;
// }

// // ✅ Preload models based on the updated dataset
// partsWithFiles.forEach(category => {
//   category.parts.forEach(part => useGLTF.preload(`./models/${part.file}`));
// });

// export default function Tm() {
//   const [isUserInteracting, setIsUserInteracting] = useState(false);
//   const [activeCategory, setActiveCategory] = useState(0);
//   const [modelCenters, setModelCenters] = useState({});

//   const toggleAccordion = (index) => {
//     setActiveCategory(activeCategory === index ? null : index);
//   };

//   // ✅ Load all models dynamically
//   const models = partsWithFiles.flatMap(category =>
//     category.parts.map(part => ({
//       ...part,
//       model: useGLTF(`./models/${part.file}`)
//     }))
//   );

//   // ✅ Compute center positions for each model
//   useEffect(() => {
//     const centers = {};
//     models.forEach(({ file, model }) => {
//       const scene = model.scene;
//       scene.updateMatrixWorld(true);
//       const box = new THREE.Box3().setFromObject(scene);
//       const center = new THREE.Vector3();
//       box.getCenter(center);
//       centers[file] = center;
//     });

//     setModelCenters(centers);
//   }, [models]);

//   return (
//     <div style={{ position: "relative", width: "100vw", height: "100vh" }}>

// <h2
//           className="archivo-black-regular hi-capa-title no-select text-center"
//           style={{
//             fontSize: "120px",
//             textAlign: "center",
//             width: "100%",
//             color: "black",
//             zIndex: 10,
//             pointerEvents: "none",
//             margin: "55px auto 30px auto",

//             lineHeight: "1.1",
//           }}
//         >
//           TM Compatibility
//         </h2>
// <hr />
// <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop:"2rem" }} >
// Tokyo Marui(TM)sets the gold standard in the airsoft industry. The more parts of a gun that are compatible with TM, the easier it is to find replacements and upgrades.
// </p>



        
//       {/* 3D Scene */}
//       <div
//         style={{
//           position: "absolute",
//           top: "26%",
//           left: "-2%",
//           width: "100%",
//           height: "100%",
//         }}
//       >
// <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>
//   <ambientLight intensity={0.85} />
//   <Environment files="./2k.hdr" />



//   {models.map(({ file, model, number }, index) => {
//     const scene = model.scene;
//     const center = modelCenters[file] || new THREE.Vector3(0, 0, 0);
//     const labelRef = useRef();

//     return (
//       <group key={index}>
//         <primitive object={scene} scale={18} rotation={[0, -2.5, -0.3]} />
//         <Html position={[0, -2.5, 0]} zIndexRange={[10, 0]}>
//   <img
//     src="/images/360.jpg"
//     alt="360° 產品預覽"
//     width="40"
//     height="40"
//     style={{
//       pointerEvents: "none",
//       opacity: 0.8,
//       animation: "floatHint 2s ease-in-out infinite",
//     }}
//   />
// </Html>
//         {activeCategory !== null &&
//           partsWithFiles[activeCategory].parts.some(part => part.file === file) && (
//             <Html ref={labelRef} position={[center.x, center.y, center.z]} center zIndexRange={[0, 0]}>
              
//               <div className="label-container">
//                 <span>{number}</span>
//               </div>
              
//             </Html>
//           )}
//       </group>
//     );
//   })}
//   <RotatingCamera speed={0.3} isUserInteracting={isUserInteracting} />

//   <OrbitControls
//   enableZoom={false}
//   enablePan={false}
//   minPolarAngle={Math.PI / 2}  // 90° 下限
//   maxPolarAngle={Math.PI / 2}  // 90° 上限
//   onStart={() => setIsUserInteracting(true)}
//   onEnd={() => setIsUserInteracting(false)}
// />

// </Canvas>





//       </div>
//       {/* ✅ Accordion List */}
// <div className="accordion-container"
//  style={{
//   position: "absolute",
//   top: "45%",
//   left: "80%",
//   width: "25%",

// }}
// >
//   {partsWithFiles.map((category, index) => (
//     <div key={index} className={`accordion-item ${activeCategory === index ? "active" : ""}`}>
//       <div className="accordion-header" onClick={() => toggleAccordion(index)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <span>{category.category}</span>
//         <span style={{ transform: "scaleY(0.6)", display: "inline-block" }}>
//           {activeCategory === index ? "▲" : "▼"}
//         </span>
//       </div>
//       <div className="accordion-body">
//         <table className="accordion-table">
//           <tbody>
//             {category.parts.map((part) => (
//               <tr key={part.number}>
//                 <td>{part.number}</td>
//                 <td>{part.name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   ))}
// </div>
//     </div>
//   );
// }











