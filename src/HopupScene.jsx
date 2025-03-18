
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Hopup from "./Hopup";
import { Html } from "@react-three/drei";

const HopupScene = () => {
    const [showTooltip, setShowTooltip] = useState(false); // ✅ Tooltip State

    return (
        <>
            <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
                {/* ✅ 讓 h2 保持在最上層 */}


                <h2
                    className="archivo-black-regular hi-capa-title no-select"
                    style={{
                        fontSize: "120px",
                        textAlign: "center",
                        width: "100%",
                        color: "black",
                        zIndex: 10,
                        pointerEvents: "none",
                        margin: "-70px auto 0 auto",

                        lineHeight: "1.1",
                    }}
                >
                    {" "}
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

                        {/* ✅ Tooltip Appears on Hover */}
                        {showTooltip && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: "100%", // ✅ Position below the "?" symbol
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: "white",
                                    color: "black",
                                    padding: "10px 15px",
                                    borderRadius: "5px",
                                    fontWeight: 300,
                                    fontFamily: "'Arial', sans-serif",
                                    fontSize: "16px",
                                    zIndex: 9999,
                                    pointerEvents: "none",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                    maxWidth: "400px",
                                    whiteSpace: "normal",
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    textAlign: "left",
                                    lineHeight: "1.5",
                                }}
                            >
                                Hop-up is a device that applies friction to the top of a round projectile (BB) and causes it to backspin. This ensures extended effective ranges for low muzzle velocity airsoft guns.
                            </span>
                        )}
                    </span>
                    Adjustment
                </h2>
                
                {/* ✅ Patent Number (Below the Header) */}
                <p
                    style={{
                        fontSize: "clamp(14px, 1.4vw, 28px)", // Responsive font size
                        textAlign: "center",
                        width: "100%",
                        fontFamily: "'Arial', sans-serif",
                        color: "black",
                        zIndex: 10,
                        fontWeight: 500,
                        marginTop: "10px", // ✅ Ensures spacing below header
                        marginBottom: "35px", // ✅ Ensures spacing below header
                    }}
                >
                    Taiwan Utility Models Patent: M626103
                </p>
                <hr/>


                <Canvas
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: "-5%",
                        left: "-4%",
                        zIndex: 1,
                    }}

                    camera={{ position: [0, 0, 10], fov: 50, near: 0.01, far: 100 }}
                >
                    <Hopup />
                </Canvas>


                {/* Text on the right */}
                <div className="textdiv" style={{
                    display: "flex",
                    alignItems: "top",
                    maxWidth: "50%",
                    marginTop: "30px",
                    marginLeft: "38vw",
                    justifyContent: "space-between",  // ✅ Fixes incorrect property
                    gap: "50px"  // ✅ Adds extra space between text and image
                }}>
                    {/* Text on the left */}
                    <div style={{ flex: "1", paddingRight: "40px" }}>
                        <h5 className="section-title">What is the problem?</h5>
                        <p className="section-text">
                            Adjusting Hop-Up on a traditional airsoft pistol takes a lot of effort. Users either have to use a special tool, or they have to take the gun apart in order to reach it.
                        </p>

                        <h5 className="section-title">Solution</h5>
                        <p className="section-text">
                            The Trinity Hop-Up system turns the slide release(E) into an adjustment key. With the teeth(e) on the other end of it engaging the gear(B) inside the Hop-Up unit, it allows users quick adjustment without extra tools.
                        </p>
                    </div>

                    {/* Image on the right */}
                    <div style={{ flex: "1", paddingLeft: "20px" }}>  {/* ✅ Fix typo: paddingleft → paddingLeft */}
                        <img src="./images/hop1.jpg" style={{ width: "90%", display: "block" }} alt="Hop-Up System" />
                    </div>
                </div>

                <img src="./images/illa.png" style={{ margin:"80px auto", width: "55%", display: "block" }} alt="Hop-Up System" />





            </div>



        </>
    );
};

export default HopupScene;
