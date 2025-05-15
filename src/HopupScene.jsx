import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Hopup from "./Hopup";

const HopupScene = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef();
  const videoRef = useRef(); // 加入 videoRef

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldRender(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 播放速度設定
  useEffect(() => {
    if (shouldRender && videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, [shouldRender]);

  return (
    <div ref={ref} style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <h2
        className="archivo-black-regular hi-capa-title no-select"
        style={{
          fontSize: "120px",
          textAlign: "center",
          width: "100%",
          color: "white",
          zIndex: 10,
          pointerEvents: "none",
          margin: "-70px auto 0 auto",
          lineHeight: "1.1",
        }}
      >
        Hop-up Adjustment
      </h2>

      <p
        style={{
          fontSize: "clamp(14px, 1.4vw, 28px)",
          textAlign: "center",
          width: "100%",
          fontFamily: "'Arial', sans-serif",
          color: "white",
          zIndex: 10,
          fontWeight: 500,
          margin: "20px 0 30px 0",
        }}
      >
        Taiwan Utility Models Patent: M626103
      </p>
      <hr />
      <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: "2rem", color: "white" }}>
        Hop-up is a device that applies friction to the top of a BB, creating backspin, which generates lift through the Magnus effect, thereby increasing the effective range of low muzzle velocity airsoft guns.
      </p>
      <div style={{ color: "white", display: "flex", width: "100%", maxWidth: "1600px", margin: "10px auto", alignItems: "flex-start", marginTop: "2rem" }}>
        <div style={{ flex: "0 0 65%" }}>
          <h5 className="section-title">What is the problem?</h5>
          <p className="section-text">
            Adjusting Hop-Up on a traditional airsoft pistol takes a lot of effort. Users either have to use a special tool, or they have to take the gun apart in order to reach it.
          </p>

          <h5 className="section-title">Our Solution</h5>
          <p className="section-text">
            The Trinity Hop-Up system turns the slide release(E) into an adjustment key. With the teeth(e) on the other end of it engaging the gear(B) inside the Hop-Up unit, it allows users quick adjustment without extra tools.
          </p>

          <img
            src="./images/illa.png"
            style={{ width: "100%", marginTop: "20px" }}
            className="section-title"
            alt="Hop-Up System"
          />
        </div>

        <div style={{ flex: "0 0 35%" }}>
          <img
            src="./images/hop1.jpg"
            alt="Hop-Up Detail"
            style={{ width: "80%", display: "block" }}
          />
        </div>
      </div>

      {shouldRender && (
        <video
          ref={videoRef}
          src="./nohop.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: "55%",
            left: "10%",
            zIndex: 1,
            border: "5px solid red",
          }}
        />
      )}
    </div>
  );
};

export default HopupScene;























// import { Suspense, useEffect, useState, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import Hopup from "./Hopup";


// const HopupScene = () => {

//   const [shouldRender, setShouldRender] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setShouldRender(true);
//         observer.disconnect();
//       }
//     }, { threshold: 0.1 });

//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);



//   return (
//     <div ref={ref} style={{ position: "relative", width: "100vw", height: "100vh" }}>


//       <h2
//         className="archivo-black-regular hi-capa-title no-select"
//         style={{
//           fontSize: "120px",
//           textAlign: "center",
//           width: "100%",
//           color: "white",
//           zIndex: 10,
//           pointerEvents: "none",
//           margin: "-70px auto 0 auto",
//           lineHeight: "1.1",
//         }}
//       >

//         Hop-up Adjustment
//       </h2>

//       <p
//         style={{
//           fontSize: "clamp(14px, 1.4vw, 28px)",
//           textAlign: "center",
//           width: "100%",
//           fontFamily: "'Arial', sans-serif",
//           color: "white",
//           zIndex: 10,
//           fontWeight: 500,
//           margin: "20px 0 30px 0",
//         }}
//       >
//         Taiwan Utility Models Patent: M626103
//       </p>
//       <hr />
//       <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginTop: "2rem", color: "white", }}>
//         Hop-up is a device that applies friction to the top of a BB, creating backspin, which generates lift through the Magnus effect, thereby increasing the effective range of low muzzle velocity airsoft guns.
//       </p>
//       <div style={{ color: "white", display: "flex", width: "100%", maxWidth: "1600px", margin: "10px auto", alignItems: "flex-start", marginTop: "2rem" }}>
//         {/* Left Column - Text + Main Illustration */}
//         <div style={{ flex: "0 0 65%" }}>
//           <h5 className="section-title">What is the problem?</h5>
//           <p className="section-text">
//             Adjusting Hop-Up on a traditional airsoft pistol takes a lot of effort. Users either have to use a special tool, or they have to take the gun apart in order to reach it.
//           </p>

//           <h5 className="section-title">Our Solution</h5>
//           <p className="section-text">
//             The Trinity Hop-Up system turns the slide release(E) into an adjustment key. With the teeth(e) on the other end of it engaging the gear(B) inside the Hop-Up unit, it allows users quick adjustment without extra tools.
//           </p>

//           <img
//             src="./images/illa.png"
//             style={{ width: "100%", marginTop: "20px" }}
//             className="section-title"
//             alt="Hop-Up System"
//           />
//         </div>

//         {/* Right Column - Secondary Image */}
//         <div style={{ flex: "0 0 35%" }}>
//           <img
//             src="./images/hop1.jpg"
//             alt="Hop-Up Detail"
//             style={{ width: "80%", display: "block" }}
//           />
//         </div>
//       </div>



//       {shouldRender && (
//         <video
//           src="./nohop.mp4"
//           autoPlay
//           muted
//           loop
//           playsInline
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             position: "absolute",
//             top: "55%",
//             left: "10%",
//             zIndex: 1,
//             border: "5px solid red",
//           }}
//         />
//       )}

//     </div>
//   );
// };

// export default HopupScene;
















