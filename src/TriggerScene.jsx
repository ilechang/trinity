
import { useEffect, useState, useRef } from "react";

const TriggerScene = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef();
  const videoRef = useRef();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
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


      <p
        className="mb-5 mx-auto"
        style={{
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          marginTop: "2rem",
          color: "black",
          padding: "0 2rem", // 小螢幕留邊距
          maxWidth: "1400px",
        }}
      >
        The Trinity match grade trigger system has a super short trigger pull (only 1mm) and resets in a split second.
        This not only makes rapid fire easier, but also increases the accuracy of the first and follow-up shots, making it the best choice in shooting competitions and close-quarters combat (CQB).
      </p>

      <div className="trigger-img-container">
        <img
          src="./images/triggerilla.webp"
          alt="Trigger View"
          className="responsive-img mt-5 mx-auto"
          style={{
            zIndex: 1000,
            marginBottom: "5rem",
          }}
        />
      </div>
    </div>
  );
};

export default TriggerScene;




