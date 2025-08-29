
import { useEffect, useState, useRef } from "react";

const TriggerScene = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef();
  const videoRef = useRef();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.1;
    }
  }, [shouldRender]);

  const handleEnded = () => {
    if (!videoRef.current) return;
    // 等 1 秒再重新播放
    setTimeout(() => {
      videoRef.current.play();
    }, 1500);
  };

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100vw",

        background: "white",
        overflow: "hidden",

      }}
    >
      <h2
        className="archivo-black-regular hi-capa-title no-select"
        style={{
          fontSize: "clamp(28px, 8vw, 120px)", // 自適應大小
          textAlign: "center",
          width: "100%",
          color: "black",
          margin: "55px auto 30px auto",
          lineHeight: "1.1",
          wordBreak: "break-word",
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

      {/* ✅ 播放影片，維持比例、不變形、不留黑框 */}
      {shouldRender && !isMobile && (
        <div
          style={{
            position: "absolute",
            top: "490px",
            left: "85%",
            transform: "translate(-50%, -50%)",
            width: "45%",
            height: "45%",
            overflow: "hidden",     // 裁切影片黑邊
            backgroundColor: "white", // 保底背景
            zIndex: 0,
          }}
        >
          <video
            ref={videoRef}
            src="./trigger.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "white",
              pointerEvents: "none",
            }}
          />
        </div>
      )}

      <p
        style={{
          fontSize: "16px",
          textAlign: "start",
          width: "100%",
          fontFamily: "'Arial', sans-serif",
          color: "black",
          fontWeight: 500,
          pointerEvents: "none",
          maxWidth: "clamp(350px, 45vw, 900px)",
          marginLeft: isMobile ? "2rem" : "15%",  // ✅ 小螢幕不要左邊距
          marginRight: isMobile ? "2rem" : "0", // ✅ 小螢幕加右邊距
          marginTop: "35px",
          lineHeight: "1.5",
          zIndex: 10,
        }}
      >
        The Trinity match grade trigger system has a super short trigger pull (only 1mm) and resets in a split second.
        This not only makes rapid fire easier, but also increases the accuracy of the first and follow-up shots, making it the best choice in shooting competitions and close-quarters combat (CQB).
      </p>

      <div className="trigger-img-container">
        <img
          src="./images/triggerilla.webp"
          alt="Trigger View"
          className="responsive-img"
style={{zIndex:1000}}        
        />
      </div>
    </div>
  );
};

export default TriggerScene;




