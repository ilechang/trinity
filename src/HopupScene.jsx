import { useEffect, useState, useRef } from "react";

const HopupScene = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [withHop, setWithHop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // ✅ 影片載入狀態
  const ref = useRef();
  const videoRef = useRef();

  // 偵測螢幕寬度
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // IntersectionObserver 控制影片渲染
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
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
    <div ref={ref} style={{ position: "relative", width: "100vw" }}>
      {/* 標題 */}
      <h2
        className="archivo-black-regular hi-capa-title no-select"
        style={{
          fontSize: "clamp(28px, 8vw, 120px)",
          textAlign: "center",
          width: "100%",
          color: "white",
          margin: "55px auto 30px auto",
          lineHeight: "1.1",
          wordBreak: "break-word",
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
          fontWeight: 500,
          margin: "20px 0 30px 0",
        }}
      >
        Taiwan Utility Models Patent: M626103
      </p>

      <hr style={{ borderColor: "white" }} />

      <p
        className="mb-5 mx-auto"
        style={{
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          marginTop: "2rem",
          color: "white",
          padding: "0 2rem",
          maxWidth: "1400px",
        }}
      >
        Hop-up is a device that applies friction to the top of a BB, creating backspin, which
        generates lift through the Magnus effect, thereby increasing the effective range of low
        muzzle velocity airsoft guns.
      </p>

      {/* 左文字 + 右圖片 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "1600px",
          margin: "20px auto",
          alignItems: "flex-start",
          color: "white",
        }}
      >
        {/* 左側文字 */}
        <div
          style={{
            flex: "1 1 600px",
            minWidth: isMobile ? "100%" : "300px",
            maxWidth: "100%",
            boxSizing: "border-box",
            padding: isMobile ? "0 1rem" : "0 2rem",
          }}
        >
          <h5 className="section-title">What is the problem?</h5>
          <p className="section-text">
            Adjusting Hop-Up on a traditional airsoft pistol takes a lot of effort. Users either
            have to use a special tool, or they have to take the gun apart in order to reach it.
          </p>

          <h5 className="section-title">Our Solution</h5>
          <p className="section-text">
            The Trinity Hop-Up system turns the slide release(E) into an adjustment key. With the
            teeth(e) on the other end of it engaging the gear(B) inside the Hop-Up unit, it allows
            users quick adjustment without extra tools.
          </p>

          <img
            className="mb-4"
            src="./images/illa.webp"
            style={{ width: "100%", marginTop: "20px", height: "auto" }}
            alt="Hop-Up System"
          />
        </div>

        {/* 右側圖片 */}
        <div
          style={{
            flex: "1 1 300px",
            minWidth: isMobile ? "100%" : "250px",
            textAlign: "center",
            padding: isMobile ? "1rem" : "0",
          }}
        >
          <img
            src="./images/hop1.webp"
            alt="Hop-Up Detail"
            style={{
              width: isMobile ? "100%" : "80%",
              maxWidth: "400px",
              display: "block",
              margin: "0 auto",
              height: "auto",
            }}
          />
        </div>
      </div>

      {/* 影片 + 按鈕 */}
      {shouldRender && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            position: "relative",
            width: "100%",
            flexDirection: isMobile ? "column" : "initial",
            alignItems: "center",
          }}
        >
          {/* ✅ Spinner while loading */}
          {!isVideoLoaded && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 20,
                color: "white",
                textAlign: "center",
              }}
            >
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="mt-2">Loading video...</div>
            </div>
          )}

          <video
            key={withHop ? "with" : "without"}
            ref={videoRef}
            src={withHop ? "./withhop.mp4" : "./withouthop.mp4"}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)} // ✅ 載入完成才隱藏 spinner
            style={{
              width: "102%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: isVideoLoaded ? "block" : "none", // ✅ 避免黑屏
            }}
          />

          {/* 疊在影片上的按鈕 */}
          {isVideoLoaded && (
            <div
              style={{
                position: isMobile ? "static" : "absolute",
                top: isMobile ? "auto" : "55%",
                left: isMobile ? "auto" : "50%",
                transform: isMobile ? "none" : "translate(-50%, -50%)",
                textAlign: "center",
                zIndex: 10,
                marginTop: isMobile ? "1rem" : "0",
                marginBottom: isMobile ? "1rem" : "0",
              }}
            >
              <p
                style={{
                  marginTop: "12px",
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  textShadow: "0 0 8px rgba(0,0,0,0.7)",
                }}
              >
                {withHop
                  ? "With hop-up adjusted, the trajectory can extend over three times farther."
                  : "Without hop-up, the BBs can’t travel far."}
              </p>
              <button
                className="btn btn-outline-light px-4 rounded-0"
                onClick={() => {
                  setIsVideoLoaded(false); // 切換時重新進入 loading 狀態
                  setWithHop((prev) => !prev);
                }}
              >
                {withHop ? "See Without Hop up" : "See the Difference"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HopupScene;

















// import { useEffect, useState, useRef } from "react";

// const HopupScene = () => {
//   const [shouldRender, setShouldRender] = useState(false);
//   const [withHop, setWithHop] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const ref = useRef();
//   const videoRef = useRef();

//   // 偵測螢幕寬度
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // IntersectionObserver 控制影片渲染
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShouldRender(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   // 播放速度設定
//   useEffect(() => {
//     if (shouldRender && videoRef.current) {
//       videoRef.current.playbackRate = 1;
//     }
//   }, [shouldRender]);

//   return (
//     <div ref={ref} style={{ position: "relative", width: "100vw" }}>
//       {/* 標題 */}
//       <h2
//         className="archivo-black-regular hi-capa-title no-select"
//         style={{
//           fontSize: "clamp(28px, 8vw, 120px)", // 自適應大小
//           textAlign: "center",
//           width: "100%",
//           color: "white",
//           margin: "55px auto 30px auto",
//           lineHeight: "1.1",
//           wordBreak: "break-word",
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
//           fontWeight: 500,
//           margin: "20px 0 30px 0",
//         }}
//       >
//         Taiwan Utility Models Patent: M626103
//       </p>

//       <hr style={{ borderColor: "white" }} />

//       <p
//        className="mb-5 mx-auto"
//         style={{
//           textAlign: "center",
//           fontFamily: "Arial, sans-serif",
//           marginTop: "2rem",
//           color: "white",
//           padding: "0 2rem", // 小螢幕留邊距
//           maxWidth: "1400px",
//         }}
//       >
//         Hop-up is a device that applies friction to the top of a BB, creating
//         backspin, which generates lift through the Magnus effect, thereby
//         increasing the effective range of low muzzle velocity airsoft guns.
//       </p>

//       {/* 左文字 + 右圖片 */}
//       <div
     
//         style={{
//           display: "flex",
//           flexWrap: "wrap", // 小螢幕自動換行
//           width: "100%",
//           maxWidth: "1600px",
//           margin: "20px auto",
//           alignItems: "flex-start",
//           color: "white",
//         }}
//       >
//         {/* 左側文字 */}
//         <div
//           style={{
//             flex: "1 1 600px",
//             minWidth: isMobile ? "100%" : "300px", // 小螢幕滿版，大螢幕最小300
//             maxWidth: "100%",
//             boxSizing: "border-box",
//             padding: isMobile ? "0 1rem" : "0 2rem",
//           }}
//         >
//           <h5 className="section-title">What is the problem?</h5>
//           <p
//             className="section-text"
//             style={{
//               wordBreak: "break-word",
//               whiteSpace: "normal",
//               overflowWrap: "break-word",
//               paddingRight: isMobile ? "2rem" : "0rem",
//             }}
//           >
//             Adjusting Hop-Up on a traditional airsoft pistol takes a lot of
//             effort. Users either have to use a special tool, or they have to
//             take the gun apart in order to reach it.
//           </p>

//           <h5 className="section-title">Our Solution</h5>
//           <p
//             className="section-text"
//             style={{
//               wordBreak: "break-word",
//               whiteSpace: "normal",
//               overflowWrap: "break-word",
//               paddingRight: isMobile ? "2rem" : "0rem",
//             }}
//           >
//             The Trinity Hop-Up system turns the slide release(E) into an
//             adjustment key. With the teeth(e) on the other end of it engaging
//             the gear(B) inside the Hop-Up unit, it allows users quick adjustment
//             without extra tools.
//           </p>

//           <img
//             className="mb-4"
//             src="./images/illa.webp"
//             style={{ width: "100%", marginTop: "20px", height: "auto" }}
//             alt="Hop-Up System"
//           />
//         </div>

//         {/* 右側圖片 */}
//         <div
//           style={{
//             flex: "1 1 300px",
//             minWidth: isMobile ? "100%" : "250px", // 小螢幕自動掉到下方
//             textAlign: "center",
//             padding: isMobile ? "1rem" : "0",
//           }}
//         >
//           <img
//             src="./images/hop1.webp"
//             alt="Hop-Up Detail"
//             style={{
//               width: isMobile ? "100%" : "80%",
//               maxWidth: "400px",
//               display: "block",
//               margin: "0 auto",
//               height: "auto",
//             }}
//           />
//         </div>
//       </div>

//       {/* 影片 + 按鈕 */}
//       {shouldRender && (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             marginTop: "2rem",
//             position: "relative",
//             width: "100%",
//             height: "80%",
//             flexDirection: isMobile ? "column" : "initial",
//             alignItems: "center",
//           }}
//         >
//           <video
//             key={withHop ? "with" : "without"}
//             ref={videoRef}
//             src={withHop ? "./withhop.mp4" : "./withouthop.mp4"}
//             autoPlay
//             muted
//             loop
//             playsInline
//             style={{
//               width: "102%",
//               height: "100%",
//               objectFit: "cover",
//               objectPosition: "top",
//             }}
//           />

//           {/* 疊在影片上的按鈕 */}
//           <div
//             style={{
//               position: isMobile ? "static" : "absolute",
//               top: isMobile ? "auto" : "55%",
//               left: isMobile ? "auto" : "50%",
//               transform: isMobile ? "none" : "translate(-50%, -50%)",
//               textAlign: "center",
//               zIndex: 10,
//               marginTop: isMobile ? "1rem" : "0",
//               marginBottom: isMobile ? "1rem" : "0",
//             }}
//           >
//             <p
//               style={{
//                 marginTop: "12px",
//                 color: "white",
//                 fontSize: "1.1rem",
//                 fontWeight: 500,
//                 textShadow: "0 0 8px rgba(0,0,0,0.7)",
//               }}
//             >
//               {withHop
//                 ? "With hop-up adjusted, the trajectory can extend over three times farther."
//                 : "Without hop-up, the BBs can’t travel far."}
//             </p>
//             <button
//               className="btn btn-outline-light px-4 rounded-0"
//               onClick={() => setWithHop((prev) => !prev)}
//             >
//               {withHop ? "See Without Hop up" : "See the Difference"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HopupScene;





