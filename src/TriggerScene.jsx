import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Trigger from "./Trigger";

const TriggerScene = () => {

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh", background: "rgb(31,31,31)" }}>
            {/* ✅ h2 Title */}
            <h2
                className="archivo-black-regular hi-capa-title no-select text-center"
                style={{
                    fontSize: "120px",
                    textAlign: "center",
                    width: "100%",
                    position: "absolute",
                    top: "-13%",
                    left: "50.5%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    zIndex: 10,
                    pointerEvents: "none",
                }}
            >
                Match Grade Trigger
                {/* Tooltip Icon */}
    
            </h2>

            {/* ✅ Patent Information */}
            <p
                style={{
                    fontSize: "24px",
                    textAlign: "center",
                    width: "100%",
                    position: "absolute",
                    top: "24.5%",
                    left: "26.5%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "'Arial', sans-serif",
                    color: "white",
                    zIndex: 10,
                    fontWeight: 500,
                    pointerEvents: "none",
                }}
            >
                Taiwan Utility Models Patent : M628501
            </p>

            {/* ✅ Canvas for 3D Model */}
            <Canvas
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: "12%",
                    zIndex: 1,
                }}
                camera={{ position: [-3, 0, 10], fov: 50, near: 0.01, far: 100 }}
            >
                <Trigger />
            </Canvas>

            {/* ✅ Trigger Description */}
            <p
                style={{
                    fontSize: "18px",
                    textAlign: "start",
                    width: "100%",
                    position: "absolute",
                    top: "32%",
                    left: "15.7%",
                    fontFamily: "'Arial', sans-serif",
                    color: "white",
                    zIndex: 10,
                    fontWeight: 500,
                    pointerEvents: "none",
                    maxWidth: "800px",
                    marginTop: "15px",
                    lineHeight: "1.5",
                }}
            >
                The Trinity match grade trigger system has a super short trigger pull (only 0.9mm) and resets in a split second.
                This not only makes rapid fire easier, but also increases the accuracy of the first and follow-up shots, making it the best choice in shooting competitions and close-quarters combat (CQB).
            </p>

            {/* ✅ Trigger Image */}
            <img
                src="./images/triggerilla.png"
                alt="Trigger View"
                style={{
                    width: "800px",
                    position: "absolute",
                    top: "50%",
                    left: "15.6%",
                }}
            />
        </div>
    );
};

export default TriggerScene;
