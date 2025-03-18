























import { Canvas } from "@react-three/fiber";
import Trigger from "./Trigger";

const TriggerScene = () => {

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh", background: "rgb(31,31,31)" }}>
            {/* ✅ h2 Title */}
            <h2
                className="archivo-black-regular hi-capa-title no-select"
                style={{
                    fontSize: "clamp(24px, 10vw, 120px)", // Responsive font size
                    textAlign: "center", // Center the text
                    width: "max-content", // Make the width fit the content
                    color: "white",
                    zIndex: 10,
                    marginTop: "60px", // Reduce space above
                    marginBottom: "-20px", // Reduce space below
                    padding: "0",
                    marginLeft: "auto", // Align with p
                    marginRight: "auto", // Keep centered while aligning left side
                }}
            >
                Match Grade Trigger
            </h2>

            <p
                style={{
                    fontSize: "clamp(14px, 1.4vw, 28px)", // Responsive font size
                    textAlign: "center", // Align text to the left
                    width: "100%",
                    fontFamily: "'Arial', sans-serif",
                    color: "white",
                    zIndex: 10,
                    fontWeight: 500,
                    margin: "0",

                }}
            >
                Taiwan Utility Models Patent: M628501
            </p>

            {/* ✅ Canvas for 3D Model */}
            <Canvas
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0%",
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
                    fontSize: "16px",
                    textAlign: "start",
                    width: "100%",
                    fontFamily: "'Arial', sans-serif",
                    color: "white",
                    zIndex: 10,
                    fontWeight: 500,
                    pointerEvents: "none",
                    maxWidth: "clamp(500px, 45vw, 900px)", // Responsive maxWidth
                    marginLeft: "15%",
                    marginTop: "35px", // Space from previous element
                    lineHeight: "1.5",
                }}

            >

                The Trinity match grade trigger system has a super short trigger pull (only 0.9mm) and resets in a split second.
                This not only makes rapid fire easier, but also increases the accuracy of the first and follow-up shots, making it the best choice in shooting competitions and close-quarters combat (CQB).
            </p>

            {/* ✅ Trigger Image */}
            <div style={{ display: "flex", justifyContent: "start", marginTop: "5vh", paddingLeft: "15%" }}>
                <img
                    src="./images/triggerilla.png"
                    alt="Trigger View"
                    className="responsive-img" // Remove inline width control
                />
            </div>
        </div>
    );
};

export default TriggerScene;
