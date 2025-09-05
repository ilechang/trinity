"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Html } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";

// 📌 配件資料 + 圖片集中在這裡
const partsData = {
  Compensator: {
    desc: "On an airsoft gun, the compensator is not only for aesthetics — it also allows for an extended inner barrel length (up to one inch), enhancing accuracy and shot consistency.",
    img: "./images/comp.webp",
  },
  "Thumb Rest": {
    desc: "A thumb rest improves a gun’s stability and helps control muzzle rise, enhancing accuracy during rapid fire.",
    img: "./images/rest.webp",
  },
  Magwell: {
    desc: "A flared magwell speeds up reloads by guiding the magazine into place, ensuring faster and more consistent magazine changes under pressure.",
    img: "./images/magwell.webp",
  },
  "Optic Mount": {
    desc: "The frame-mounted optic provides a stable platform for red dot sights, improving target acquisition speed and overall aiming precision. Because it does not reciprocate with the slide, it ensures greater stability and consistency.",
    img: "./images/mount.webp",
  },
  "Optic(Sold Separately)": {
    desc: "A red dot optic allows for faster target acquisition and improved accuracy, especially during dynamic shooting stages.",
    img: "./images/rts.webp",
  },
  "Charging Handle": {
    desc: "An extended charging handle offers better grip and accessibility, making slide manipulation faster and more efficient, especially during competition.",
    img: "./images/handle.webp",
  },
};

// 3D 模型 (自轉)
function Model() {
  const gltf = useGLTF("./models/openc.glb");
  const modelRef = useRef();

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={11.2}
      position={[0.6, 1.1, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// 場景
function Scene() {
  return (
    <>
      <Environment files="./quad.hdr" background={false} />
      <Model />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate target={[0, 0.5, 0]} />
    </>
  );
}

// 主組件
export default function OpenKit() {
  const buttons = Object.keys(partsData);
  const [activePart, setActivePart] = useState("Compensator");
  const [shouldRender, setShouldRender] = useState(false);
  const sceneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="text-white min-vh-100 d-flex flex-column align-items-center"
      style={{ position: "relative", width: "100vw" }}
    >
      <h2
        className="archivo-black-regular hi-capa-title no-select"
        style={{
          fontSize: "clamp(28px, 8vw, 120px)",
          textAlign: "center",
          width: "100%",
          color: "white",
          margin: "55px auto 30px auto",
          lineHeight: "1.1",
          wordBreak: "break-word",
        }}
      >
        IPSC Open Kit
      </h2>

      <p
        style={{
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          marginTop: "2rem",
          color: "white",
        }}
      >
        This kit features essential IPSC Open Division upgrades: compensator, thumb rest,
        magwell, optic mount, and charging handle.
        <br />
        Each component is precision-engineered for competition, delivering faster handling,
        enhanced control, and unmatched accuracy.
      </p>

      {/* 3D 模型區域 */}
      <div ref={sceneRef} className="w-100 canvas-container-open">
        {shouldRender && (
          <Canvas camera={{ position: [3.1, 2.0, 3.4], fov: 35 }}>
            <Suspense
              fallback={
                <Html center>
                  <div className="text-center">
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="mt-2 text-white fw-bold">Loading model...</div>
                  </div>
                </Html>
              }
            >
              <Scene />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* 按鈕 */}
      <div className="mt-0 d-flex flex-wrap justify-content-center gap-4">
        {buttons.map((b) => (
          <button
            key={b}
            className={`btn btn-outline-light rounded-0 px-4 ${activePart === b ? "active" : ""}`}
            onClick={() => setActivePart(b)}
          >
            {b}
          </button>
        ))}
      </div>

      {/* 圖片 + 說明文字 */}
      <div
        style={{
          marginBottom: "2rem",
          minHeight: "200px",
          maxWidth: "1100px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: window.innerWidth <= 450 ? "column" : "row",
          gap: "1rem",
        }}
      >
        <img
          src={partsData[activePart]?.img || ""}
          alt={activePart}
          style={{
            maxWidth: "300px",
            maxHeight: "300px",
            objectFit: "contain",
          }}
        />
        <p
          style={{
            fontSize: "clamp(14px, 1.2vw, 1rem)",
            color: "white",
            textAlign: "start",
          }}
        >
          {partsData[activePart]?.desc || ""}
        </p>
      </div>
    </div>
  );
}























// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
// import { Suspense, useRef, useState, useEffect } from "react";

// // 📌 配件資料 + 圖片集中在這裡
// const partsData = {
//   Compensator: {
//     desc: "On an airsoft gun, the compensator is not only for aesthetics — it also allows for an extended inner barrel length (up to one inch), enhancing accuracy and shot consistency.",
//     img: "./images/comp.webp",
//   },
//   "Thumb Rest": {
//     desc: "A thumb rest improves a gun’s stability and helps control muzzle rise, enhancing accuracy during rapid fire.",
//     img: "./images/rest.webp",
//   },
//   Magwell: {
//     desc: "A flared magwell speeds up reloads by guiding the magazine into place, ensuring faster and more consistent magazine changes under pressure.",
//     img: "./images/magwell.webp",
//   },
//   "Optic Mount": {
//     desc: "The frame-mounted optic provides a stable platform for red dot sights, improving target acquisition speed and overall aiming precision. Because it does not reciprocate with the slide, it ensures greater stability and consistency.",
//     img: "./images/mount.webp",
//   },
//   "Optic(Sold Separately)": {
//     desc: "A red dot optic allows for faster target acquisition and improved accuracy, especially during dynamic shooting stages.",
//     img: "./images/rts.webp",
//   },
//   "Charging Handle": {
//     desc: "An extended charging handle offers better grip and accessibility, making slide manipulation faster and more efficient, especially during competition.",
//     img: "./images/handle.webp",
//   },
// };

// // 3D 模型 (自轉)
// function Model() {
//   const gltf = useGLTF("./models/openc.glb");
//   const modelRef = useRef();

//   useFrame((_, delta) => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y -= delta * 0.5;
//     }
//   });

//   return (
//     <primitive
//       ref={modelRef}
//       object={gltf.scene}
//       scale={11.2}
//       position={[0.6, 1.1, 0]}
//       rotation={[0, 0, 0]}
//     />
//   );
// }

// // 場景
// function Scene() {
//   return (
//     <>
//       <Environment files="./quad.hdr" background={false} />
//       <Model />
//       <OrbitControls enablePan={false} enableZoom={false} enableRotate target={[0, 0.5, 0]} />
//     </>
//   );
// }

// // 主組件
// export default function OpenKit() {
//   const buttons = Object.keys(partsData);

//   // ✅ 一開始就預設選中 "Compensator"
//   const [activePart, setActivePart] = useState("Compensator");
//   const [shouldRender, setShouldRender] = useState(false);
//   const sceneRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShouldRender(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.2 }
//     );
//     if (sceneRef.current) observer.observe(sceneRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="text-white min-vh-100 d-flex flex-column align-items-center"
//          style={{ position: "relative", width: "100vw" }}>
      
//       <h2 className="archivo-black-regular hi-capa-title no-select"
//           style={{
//             fontSize: "clamp(28px, 8vw, 120px)",
//             textAlign: "center",
//             width: "100%",
//             color: "white",
//             margin: "55px auto 30px auto",
//             lineHeight: "1.1",
//             wordBreak: "break-word",
//           }}>
//         IPSC Open Kit
//       </h2>

//       <p style={{
//           textAlign: "center",
//           fontFamily: "Arial, sans-serif",
//           marginTop: "2rem",
//           color: "white",
//         }}>
//         This kit features essential IPSC Open Division upgrades: compensator, thumb rest, magwell, optic mount, and charging handle.
//         <br />Each component is precision-engineered for competition, delivering faster handling, enhanced control, and unmatched accuracy.
//       </p>

//       {/* 3D 模型區域 */}
//       <div ref={sceneRef} className="w-100 canvas-container-open">
//         {shouldRender && (
//           <Canvas camera={{ position: [3.1, 2.0, 3.4], fov: 35 }}>
//             <Suspense fallback={null}>
//               <Scene />
//             </Suspense>
//           </Canvas>
//         )}
//       </div>

//       {/* 按鈕 */}
//       <div className="mt-0 d-flex flex-wrap justify-content-center gap-4">
//         {buttons.map((b) => (
//           <button
//             key={b}
//             className={`btn btn-outline-light rounded-0 px-4 ${activePart === b ? "active" : ""}`}
//             onClick={() => setActivePart(b)}
//           >
//             {b}
//           </button>
//         ))}
//       </div>

//       {/* 圖片 + 說明文字 */}
//       <div
//         style={{
//           marginBottom: "2rem",
         
//           minHeight: "200px", // ✅ 預設高度
//           maxWidth: "1100px",
//           textAlign: "center",
//           fontFamily: "Arial, sans-serif",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: window.innerWidth <= 450 ? "column" : "row", // ✅ RWD
//           gap: "1rem",
//         }}
//       >
//         <img
//           src={partsData[activePart]?.img || ""}
//           alt={activePart}
//           style={{
//             maxWidth: "300px",
//             maxHeight: "300px",
//             objectFit: "contain",
//           }}
//         />
//         <p style={{ fontSize: "clamp(14px, 1.2vw, 1rem)", color: "white", textAlign:"start" }}>
//           {partsData[activePart]?.desc || ""}

          
//         </p>
//       </div>
//     </div>
//   );
// }

// useGLTF.preload("./models/openc.glb");
