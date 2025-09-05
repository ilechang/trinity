import { useEffect, useState } from "react";
import "./styles.css";
import { Canvas } from "@react-three/fiber";
import Research from "./Research";
import 'bootstrap/dist/css/bootstrap.min.css';
import Detail from "./Detail";
import HopupScene from "./HopupScene";
import TriggerScene from "./TriggerScene";
import Tm from "./Tm";
import Video from "./Video";
import Scene from "./Scene";
import CameraRig from "./CameraRig";
// import OpenKit from "./OpenKit";

function App() {
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const minDelay = new Promise((resolve) => setTimeout(resolve, 4000)); // 至少顯示3秒

    const contentReady = new Promise((resolve) => {
      // requestIdleCallback fallback，確保 Safari 不會卡住
      if ("requestIdleCallback" in window) {
        requestIdleCallback(resolve);
      } else {
        setTimeout(resolve, 0);
      }
    });

    Promise.all([minDelay, contentReady]).then(() => {
      setShowLoading(false);

      // ⛔ 移除 index.html 中的初始 loading 畫面
      const loader = document.getElementById("global-loading");
      if (loader) loader.remove();
    });
  }, []);

  if (showLoading) {
    return (
      <div className="loading-screen">

      </div>
    );
  }

  return (
    <>

      <div className="main-container">


        {/* ✅ Canvas 避免在 loading 中渲染 */}
        {!showLoading && (
          <div className="secondSection" style={{ height: "100vh" }}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 60 }}
              style={{ background: "rgb(31,31,31)", width: "100vw", height: "100%" }}
              frameloop="demand"
            >
              <CameraRig />  {/* 改成用 wheel 控制 */}
              <Scene />
            </Canvas>
          </div>
        )}

        <Research />

        <div className="thirdSection">
          <Detail />
        </div>

        <div className="fifthSection">
          <TriggerScene />
        </div>

        <div
          className=""
          style={{ background: "rgb(31,31,31)" }}
        >
          <HopupScene />
        </div>

       <div className="fifthSection">
          <Tm />
        </div> 

{/* 
        <div
          style={{
            background: "linear-gradient(180deg, rgb(31,31,31) 0%, rgb(160,160,160) 100%)",
          }}
        >
          <OpenKit />
        </div>
         */}

        <div className="sixthSection"   >
          <Video />
        </div>


      </div>
    </>
  );
}

export default App;




