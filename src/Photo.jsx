import { useEffect, useRef, useState } from "react";

export default function Photo() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // 🔥 滑到後再延遲 0.5 秒才開始動畫
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setStartAnim(true);
      }, 300); // 0.5 秒延遲

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div ref={ref} style={{ background: "rgb(31,31,31)" }}>
      {visible && (
        <>
          <style>
            {`
              @keyframes fadeSlide {
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
            `}
          </style>

          <div
            style={{
              width: "90vw",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              padding: "60px 0",
            }}
          >
            {[1, 2, 3, 4].map((num, index) => (
              <img
                key={num}
                src={`/images/landing/trinity${num}.webp
                `}
                alt=""
                style={{
                  width: "22%",
                  borderRadius: "8px",
                  opacity: 0,
                  transform: "translateX(-40px)",
                  animation: startAnim
                    ? `fadeSlide 0.6s ease forwards`
                    : "none",
                  animationDelay: startAnim
                    ? `${index * 0.2}s`
                    : "0s",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}