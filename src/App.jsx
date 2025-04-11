import { useEffect, useState } from "react";
import "./styles.css";
import { Canvas } from "@react-three/fiber";
import ScrollControl from "./ScrollControl";
import Detail from "./Detail";
import HopupScene from "./HopupScene";
import TriggerScene from "./TriggerScene";
import Tm from "./Tm";
import Video from "./Video";

function App() {
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const minDelay = new Promise((resolve) => setTimeout(resolve, 2000)); // 至少顯示4秒
    const contentReady = new Promise((resolve) => {
      requestIdleCallback(resolve); // 等待空閒時間（模擬載入完成）
    });

    Promise.all([minDelay, contentReady]).then(() => {
      setShowLoading(false);

      // ⛔ 移除最早出現的 index.html loading 畫面
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
        <div className="secondSection">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            style={{
              background: "#f0f0f0",
              width: "100vw",
              height: "100vh",
            }}
          >
            <ScrollControl />
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























// import { useState } from "react";

// import "./styles.css";
// import { Canvas } from "@react-three/fiber";
// import ScrollControl from "./ScrollControl";
// import Detail from "./Detail";
// import HopupScene from "./HopupScene";
// import TriggerScene from "./TriggerScene";
// import Tm from "./Tm";
// import Video from "./Video";


// function App() { 
//   const [noticeVisible, setNoticeVisible] = useState(true); // ✅ State to show/hide notice

//   return (
// <>
//       {/* ✅ Notice Bar */}
//       {noticeVisible && (
//         <div className="notice-bar">
//           <p>This is a toy gun, not a real gun.</p>
//           <button onClick={() => setNoticeVisible(false)}>I Understand</button>
//         </div>
//       )}

//       <div className="main-container">
//         <div className="secondSection">
//           <Canvas
//             camera={{ position: [0, 0, 5], fov: 60 }}
//             style={{
//               background: "#f0f0f0",
//               width: "100vw",
//               height: "100vh",
//             }}
//           >
//             <ScrollControl />
//           </Canvas>
//         </div>

//         <div className="thirdSection">
//           <Detail />
//         </div>

//         <div className="fifthSection" style={{  height:"110vh"}}>
//           <TriggerScene />
//         </div>

//         <div className="forthSection" style={{height:"130vh",background: "rgb(31,31,31)"}}>
//           <HopupScene />
//         </div>

//          <div className="fifthSection">
//           <Tm />
//         </div> 

//         <div className="sixthSection">
//           <Video />
//         </div>
//       </div>
//       </>
//   );
// }

// export default App;

























// import { ModelProvider } from "./ModelProvider"; // ✅ 引入 ModelProvider
// import "./styles.css";
// import { Canvas } from "@react-three/fiber";
// import ScrollControl from "./ScrollControl";
// import Detail from "./Detail";
// import HopupScene from "./HopupScene";
// import TriggerScene from "./TriggerScene";
// import Tm from "./Tm";
// import Video from "./Video";

// function App() { // ✅ Define App function
//   return (
//     <ModelProvider> {/* ✅ ModelProvider 包住所有 Canvas */}
//       <div className="main-container"> {/* Main wrapper */}

        
//         <div className="secondSection">
//           <Canvas
//             camera={{ position: [0, 0, 5], fov:60 }}
//             style={{
//               background: "#f0f0f0",
//               width: "100vw",
//               height: "100vh",
          
//             }}
//           >
//             <ScrollControl />
//           </Canvas>
//         </div>

//         <div className="thirdSection">
//           <Detail />
//         </div>

//     <div className="forthSection">
          
//             <HopupScene /> {/* ✅ 共享 ModelProvider */}
          
//         </div>

//         <div className="fifthSection" style={{ background: "rgb(31,31,31)" }}>
//           <TriggerScene />
//         </div>

//         <div className="fifthSection">
//           <Tm />
//         </div>

//         <div className="sixthSection">
//           <Video />
//         </div>
//       </div>
//       </ModelProvider> 
//   );
// }

// export default App;














// import { ModelProvider } from "./ModelProvider"; // ✅ 引入 ModelProvider
// import ReactDOM from "react-dom/client";
// import "./styles.css";
// import { Canvas } from "@react-three/fiber";
// import Scene from "./Scene";
// import ScrollControl from "./ScrollControl";
// import Detail from "./Detail";
// import HopupScene from "./HopupScene";
// import TriggerScene from "./TriggerScene";
// import Tm from "./Tm";
// import Video from "./Video";

// function App() { // ✅ Define App function
//   return (
//     <ModelProvider> {/* ✅ ModelProvider 包住所有 Canvas */}
//       <div className="main-container"> {/* Main wrapper */}

//         <div className="landing">
//           <Canvas
//             camera={{
//               fov: 45,
//               near: 0.1,
//               far: 100,
//               position: [0, 0, 7],
//             }}
//           >
//             <Scene /> {/* ✅ 共享 ModelProvider */}
//           </Canvas>
//         </div>


//         <div className="secondSection">
//           <Canvas
//             camera={{ position: [0, 0, 5], fov: 60 }}
//             style={{
//               background: "#f0f0f0",
//               width: "100vw",
//               height: "100vh",
          
//             }}
//           >
//             <ScrollControl />
//           </Canvas>
//         </div>

//         <div className="thirdSection">
//           <Detail />
//         </div>

//     <div className="forthSection">
          
//             <HopupScene /> {/* ✅ 共享 ModelProvider */}
          
//         </div>

//         <div className="fifthSection" style={{ background: "rgb(31,31,31)" }}>
//           <TriggerScene />
//         </div>

//         <div className="fifthSection">
//           <Tm />
//         </div>

//         <div className="sixthSection">
//           <Video />
//         </div>
//       </div>
//       </ModelProvider> 
//   );
// }

// export default App;


























// import { ModelProvider } from "./ModelProvider"; // ✅ 引入 ModelProvider
// import ReactDOM from "react-dom/client";
// import "./styles.css";
// import { Canvas } from "@react-three/fiber";
// import Scene from "./Scene";
// import ScrollControl from "./ScrollControl";
// import Detail from "./Detail";
// import HopupScene from "./HopupScene";
// import TriggerScene from "./TriggerScene";
// import Tm from "./Tm";
// import Video from "./Video";

// function App() { // ✅ Define App function
//   return (
//     <ModelProvider> {/* ✅ ModelProvider 包住所有 Canvas */}
//       <div className="main-container"> {/* Main wrapper */}

//         <div className="landing">
//           <Canvas
//             camera={{
//               fov: 45,
//               near: 0.1,
//               far: 100,
//               position: [0, 0, 7],
//             }}
//           >
//             <Scene /> {/* ✅ 共享 ModelProvider */}
//           </Canvas>
//         </div>


//         <div className="secondSection">
//           <Canvas
//             camera={{ position: [0, 0, 5], fov: 60 }}
//             style={{
//               background: "#f0f0f0",
//               width: "100vw",
//               height: "100vh",
          
//             }}
//           >
//             <ScrollControl />
//           </Canvas>
//         </div>

//         <div className="thirdSection">
//           <Detail />
//         </div>

//     <div className="forthSection">
          
//             <HopupScene /> {/* ✅ 共享 ModelProvider */}
          
//         </div>

//         <div className="fifthSection" style={{ background: "rgb(31,31,31)" }}>
//           <TriggerScene />
//         </div>

//         <div className="fifthSection">
//           <Tm />
//         </div>

//         <div className="sixthSection">
//           <Video />
//         </div>
//       </div>
//       </ModelProvider> 
//   );
// }

// export default App;









