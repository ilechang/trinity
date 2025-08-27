import { useEffect, useState, useRef } from "react";
import "./styles.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import Images from "./Images";
import Detail from "./Detail";
import HopupScene from "./HopupScene";
import TriggerScene from "./TriggerScene";
import Tm from "./Tm";
import Video from "./Video";

function App() {
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const secondRef = useRef(null);

  useEffect(() => {
    const minDelay = new Promise((resolve) => setTimeout(resolve, 3000));
    const contentReady = new Promise((resolve) => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(resolve);
      } else {
        setTimeout(resolve, 0);
      }
    });

    Promise.all([minDelay, contentReady]).then(() => {
      setShowLoading(false);
      const loader = document.getElementById("global-loading");
      if (loader) loader.remove();
    });
  }, []);

  if (showLoading) {
    return (
      <div className="loading-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      {noticeVisible && (
        <div className="notice-bar">
          <p>This is a toy gun, not a real gun.</p>
          <button onClick={() => setNoticeVisible(false)}>I Understand</button>
        </div>
      )}

      <div className="main-container">
        {/* Sticky Canvas section */}
        <div
          className="secondSection"
          ref={secondRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            background: "#f0f0f0",
            zIndex: 1,
          }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Scene sectionRef={secondRef} />
            <Images sectionRef={secondRef} />
          </Canvas>
        </div>

        <div className="thirdSection">
          <Detail />
        </div>

        <div className="fifthSection" style={{ height: "110vh" }}>
          <TriggerScene />
        </div>

        <div
          className="forthSection"
          style={{ height: "130vh", background: "rgb(31,31,31)" }}
        >
          <HopupScene />
        </div>

        <div className="fifthSection">
          <Tm />
        </div>

        <div className="sixthSection">
          <Video />
        </div>
      </div>
    </>
  );
}

export default App;
