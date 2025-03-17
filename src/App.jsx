








import { ModelProvider } from "./ModelProvider"; // ✅ 引入 ModelProvider
import ReactDOM from "react-dom/client";
import "./styles.css";
import { Canvas } from "@react-three/fiber";

import ScrollControl from "./ScrollControl";

import Detail from "./Detail";
import HopupScene from "./HopupScene";
import TriggerScene from "./TriggerScene";
import Tm from "./Tm";
import Video from "./Video";

function App() { // ✅ Define App function
  return (
    <ModelProvider> {/* ✅ ModelProvider 包住所有 Canvas */}
      <div className="main-container"> {/* Main wrapper */}

        
        <div className="secondSection">
          <Canvas
            camera={{ position: [0, 0, 5], fov:60 }}
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

    <div className="forthSection">
          
            <HopupScene /> {/* ✅ 共享 ModelProvider */}
          
        </div>

        <div className="fifthSection" style={{ background: "rgb(31,31,31)" }}>
          <TriggerScene />
        </div>

        <div className="fifthSection">
          <Tm />
        </div>

        <div className="sixthSection">
          <Video />
        </div>
      </div>
      </ModelProvider> 
  );
}

export default App;














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









