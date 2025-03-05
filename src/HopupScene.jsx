// import { useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import Hopup from "./Hopup";
// import { Html } from "@react-three/drei";

// const HopupScene = () => {
//   const [showTooltip, setShowTooltip] = useState(false);

//   return (
//     <>
//       <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
//         {/* ✅ 讓 h2 保持在最上層 */}
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
//           Quick{" "}
//           <span style={{ position: "relative", display: "inline-block" }}>
//             Hop-up
//             <sup
//               style={{
//                 marginLeft: "10px",
//                 fontSize: "24px",
//                 cursor: "pointer",
//                 color: "#555",
//                 pointerEvents: "auto",
//               }}
//               onMouseEnter={() => setShowTooltip(true)}
//               onMouseLeave={() => setShowTooltip(false)}
//             >
//               ⍰
//             </sup>
//             Adjustment
//           </span>
//         </h2>

//         {/* Tooltip 彈出視窗 */}
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
//             Hop-up is a device that applies friction to the top of round projectile (BB),
//             and causes it to backspin. This ensures extended effective ranges of
//             low muzzle velocity airsoft guns.
//           </span>
//         )}

//         {/* ✅ Canvas 放在背景層，不影響 h2 */}
//         <Canvas
//           style={{
//             width: "100%",
//             height: "100%",
//             position: "absolute",
//             top: 0,
//             left: 0,
//             zIndex: 1,
//           }}
//           camera={{ position: [0, 0, 10], fov: 50, near: 0.01, far: 100 }}
//         >
//           <Hopup />

//           {/* ✅ 這裡的 <Html> 正確放在 Canvas 內 */}
//           <Html center>
//             <div style={{ position: "relative", width: "100vw" }}>
//               {/* ✅ 文字內容區域 */}
//               <p
//                 style={{
//                   fontSize: "24px",
//                   textAlign: "center",
//                   position: "absolute",
//                   top: "28%",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   fontFamily: "'Arial', sans-serif",
//                   color: "black",
//                   zIndex: 10,
//                   fontWeight: 500,
//                   pointerEvents: "none",
//                   maxWidth: "800px",
//                   lineHeight: "1.5",
//                 }}
//               >
//                 <strong style={{ fontSize: "24px", display: "block" }}>
//                   What is the problem?
//                 </strong>
//                 Adjusting Hop-Up on a traditional airsoft pistol takes a lot of effort.
//                 Users either have to use a special tool, or they have to take the gun apart
//                 in order to reach it.
//               </p>

//               <p
//                 style={{
//                   fontSize: "18px",
//                   textAlign: "start",
//                   position: "absolute",
//                   top: "39%",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   fontFamily: "'Arial', sans-serif",
//                   color: "black",
//                   zIndex: 10,
//                   fontWeight: 500,
//                   pointerEvents: "none",
//                   maxWidth: "360px",
//                   lineHeight: "1.5",
//                 }}
//               >
//                 <strong style={{ fontSize: "24px", display: "block", marginBottom: "10px" }}>
//                   Solution
//                 </strong>
//                 The Trinity Hop-Up system turns the slide release (E) into an adjustment key.
//                 With the teeth (e) on the other end of it engaging the gear (B) inside the
//                 Hop-Up unit, it allows users quick adjustment without extra tools.
//               </p>

//               {/* ✅ 圖片區域 */}
//               <img
//                 src="./images/hop1.jpg"
//                 alt="Hop-Up Adjustment"
//                 style={{
//                   width: "400px",
//                   position: "absolute",
//                   top: "45%",
//                   left: "70.5%",
//                   boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
//                 }}
//               />

//               <img
//                 src="./images/illa.png"
//                 alt="Hop-Up Adjustment"
//                 style={{
//                   width: "1000px",
//                   position: "absolute",
//                   top: "65%",
//                   left: "15%",
//                 }}
//               />
//             </div>
//           </Html>
//         </Canvas>
//       </div>
//     </>
//   );
// };

// export default HopupScene;


















import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Hopup from "./Hopup";
import { Html } from "@react-three/drei";

const HopupScene = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <>
            <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
                {/* ✅ 讓 h2 保持在最上層 */}
                <h2
                    className="archivo-black-regular hi-capa-title no-select text-center"
                    style={{
                        fontSize: "120px",
                        textAlign: "center",
                        width: "100%",
                        position: "absolute",
                        top: "-15%", // ✅ 確保標題正確定位
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "black",
                        zIndex: 10,
                        pointerEvents: "none",
                    }}
                >
                    Quick{" "}
                    <span style={{ position: "relative", display: "inline-block" }}>
                        Hop-up
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
                        Adjustment
                    </span>
                </h2>

                {/* Tooltip 彈出視窗 */}
                {showTooltip && (
                    <span
                        style={{
                            position: "absolute",
                            top: "10%", // ✅ 確保 Tooltip 不會與 ❓ 重疊
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
                        Hop-up is a device that applies friction to the top of round projectile(BB), and causes it to backspin. This ensures extended effective ranges of low muzzle velocity airsoft guns.
                    </span>
                )}

                <p style={{
                    fontSize: "24px",
                    textAlign: "center",
                    width: "100%",
                    position: "absolute",
                    top: "21%", // ✅ 改成 10%，確保不會跑出畫面
                    left: "18%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "'Arial', sans-serif",
                    color: "black",
                    zIndex: 10,
                    fontWeight: 500,
                    pointerEvents: "none",
                }}>Taiwan Utility Models Patent : M626103</p>

                {/* ✅ Canvas 放在背景層，不影響 h2 */}
                <Canvas
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1, // ✅ Canvas 在 h2 下方
                    }}
                    camera={{ position: [0, 0, 10], fov: 50, near: 0.01, far: 100 }}
                >
                    <Hopup />
                    </Canvas>
              
                <p style={{
                    fontSize: "18px",
                    textAlign: "start",
                    width: "100%",
                    position: "absolute",
                    top: "28%",
                    left: "50%",
                    fontFamily: "'Arial', sans-serif",
                    color: "black",
                    zIndex: 10,
                    fontWeight: 500,
                    pointerEvents: "none",
                    maxWidth: "800px",
                    marginTop: "15px", // Removes extra spacing
                    lineHeight: "1.5",
                }}>
                    <span style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        display: "block" // Ensures it behaves like a heading

                    }}>
                        What is the problem?
                    </span>
                    Adjusting Hop-Up on a traditional airsoft pistol takes a lot of effort. Users either have to use a special tool, or they have to take the gun apart in order to reach it.
                </p>
               
                <p style={{
                    fontSize: "18px",
                    textAlign: "start",
                    width: "100%",
                    position: "absolute",
                    top: "39%",
                    left: "50%",
                    fontFamily: "'Arial', sans-serif",
                   
                    zIndex: 10,
                    fontWeight: 500,
                    pointerEvents: "none",
                    maxWidth: "360px",
                    marginTop: "30px", // Remove extra space
                    lineHeight: "1.5",
                }}>
                    <span style={{
                        fontSize: "24px",
                        textAlign: "start",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        display: "block" // Ensures it behaves like a heading
                    }}>
                        Solution
                    </span >
                    The Trinity Hop-Up system turns the slide release(E) into an adjustment key. With the teeth(e) on the other end of it engaging the gear(B) inside the Hop-Up unit, it allows users quick adjustment without extra tools.
                </p>

                    <img src="./images/hop1.jpg" alt="Hop-Up Adjustment"
                        style={{
                            width: "400px",
                            position: "absolute",
                            top: "45%",
                            left: "70.5%",
                            boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)'
                        }} />


                    <img src="./images/illa.png" alt="Hop-Up Adjustment"
                        style={{
                            width: "1000px",
                            position: "absolute",
                            top: "65%",
                            left: "15%",

                        }} />
                
               
            </div>

        </>
    );
};

export default HopupScene;
