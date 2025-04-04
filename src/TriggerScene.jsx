



import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef } from "react";
import Trigger from "./Trigger";

const TriggerScene = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef();

  // ⬇️ IntersectionObserver 觸發後才 render <Canvas>
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldRender(true);
        observer.disconnect(); // 只觀察一次
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);


  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        // background: "rgb(31,31,31)",
        background: "white"
      }}
    >
      
      <h2
        className="archivo-black-regular hi-capa-secondary-title no-select"
        style={{
          fontSize: "clamp(24px, 10vw, 120px)",
          textAlign: "center",
          width: "max-content",
          color: "black",
          zIndex: 10,
          margin: "25px auto -20px auto",
          padding: "0",
        }}
      >
        Match Grade Trigger
      </h2>

      <p
        style={{
          fontSize: "clamp(14px, 1.4vw, 28px)",
          textAlign: "center",
          width: "100%",
          fontFamily: "'Arial', sans-serif",
          color: "black",
          zIndex: 10,
          fontWeight: 500,
          margin: "10px 0 30px 0",
        }}
      >
        Taiwan Utility Models Patent: M628501
      </p>

      <hr />

      {shouldRender && (
        <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 620,
          zIndex: 0,

        }}
          camera={{ position: [-3, 0, 12], fov: 50, near: 0.01, far: 100 }}
        >
          <Suspense fallback={null}>
            <Trigger />
          </Suspense>
        </Canvas>
      )}

      <p
        style={{
          fontSize: "16px",
          textAlign: "start",
          width: "100%",
          fontFamily: "'Arial', sans-serif",
          color: "black",
          zIndex: 10,
          fontWeight: 500,
          pointerEvents: "none",
          maxWidth: "clamp(500px, 45vw, 900px)",
          marginLeft: "15%",
          marginTop: "35px",
          lineHeight: "1.5",
        }}
      >
       The Trinity match grade trigger system has a super short trigger pull (only 1mm) and resets in a split second.
 This not only makes rapid fire easier, but also increases the accuracy of the first and follow-up shots, making it the best choice in shooting competitions and close-quarters combat (CQB).
      </p>

      <div style={{ display: "flex", justifyContent: "start", marginTop: "6vh", paddingLeft: "15%" }}>
        <img
          src="./images/triggerilla.jpg"
          alt="Trigger View"
          className="responsive-img"
        />
      </div>
    </div>
  );
};

export default TriggerScene;

























