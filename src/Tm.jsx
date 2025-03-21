import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

// ✅ 在應用啟動時就開始 `preload()`，不等待 `Tm` 渲染
const modelFiles = [
  "valve.glb",
  "magbase.glb",
  "followerspring.glb",
  "follower.glb",
  "gasket.glb",
  "lip.glb",
  "mag.glb",
  "trigger.glb",
  "grip.glb",
  "hammerspringhousing.glb",
  "hammerspring.glb",
  "hammerspringcap.glb",
  "searspring.glb",
  "gripsafety.glb",
  "strut.glb",
  "hammer.glb",
  "sear.glb",
  "knocker.glb",
  "thumb.glb",
  "guiderod.glb",
  "recoilspring.glb",
  "recoilplug.glb",
  "nzspring.glb",
  "slide.glb",
  "nzhousing.glb",
  "nz.glb",
  "outter.glb",
  "bucking.glb",
  "innerbarrel.glb",
];

// ✅ 頁面載入時預先載入所有模型
modelFiles.forEach((file) => useGLTF.preload(`./models/${file}`));

export default function Tm() {
  const [showTooltip, setShowTooltip] = useState(false);

  // ✅ 個別調用 `useGLTF()`，確保 React Hooks 正確使用
  const models = modelFiles.map((file) => ({
    file,
    model: useGLTF(`./models/${file}`),
  }));

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Title */}
      <h2
        className="archivo-black-regular hi-capa-title no-select text-center"
        style={{
          fontSize: "120px",
          textAlign: "center",
          width: "100%",
          position: "absolute",
          top: "-15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        Tokyo Marui
        <sup
          style={{
            marginLeft: "10px",
            fontSize: "24px",
            cursor: "pointer",
            color: "#555",
            pointerEvents: "auto",
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ⍰
        </sup>
        Compatibility
      </h2>

      {showTooltip && (
        <span
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            color: "black",
            padding: "16px 18px",
            borderRadius: "5px",
            fontWeight: 300,
            fontFamily: "'Arial', sans-serif",
            fontSize: "16px",
            zIndex: 9999,
            pointerEvents: "none",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            maxWidth: "400px",
            display: "block",
            whiteSpace: "normal",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            textAlign: "left",
            lineHeight: "1.5",
          }}
        >
          Tokyo Marui is the golden standard in the airsoft industry. The more
          parts of a gun that are Tokyo Marui compatible, the easier it is to
          find replacement and upgrade parts.
        </span>
      )}

      {/* 3D 模型畫布 */}
      <div
        style={{
          position: "absolute",
          top: "17%",
          left: "0%",
          width: "100%",
          height: "100%",
        }}
      >
        <Canvas camera={{ position: [0, 0, 20], fov: 20 }}>
          <ambientLight intensity={0.8} />
          <Environment files="./2k.hdr" />

          {/* 渲染所有模型 */}
          {models.map(({ file, model }, index) => (
            <primitive
              key={index}
              object={model.scene}
              scale={25}
              rotation={[0.5, -2.5, 0]}
            />
          ))}

          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
}

















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
