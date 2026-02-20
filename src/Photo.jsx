import { useEffect, useRef, useState } from "react";

export default function Photo() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // 只觸發一次
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ background: "rgb(31,31,31)" }}>
      {/* 還沒滑到 → 什麼都不 render */}
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
                src={`/images/landing/trinity${num}.jpg`}
                alt=""
                style={{
                  width: "22%",
                  borderRadius: "8px",
                  opacity: 0,
                  transform: "translateX(-40px)",
                  animation: "fadeSlide 0.6s ease forwards",
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}