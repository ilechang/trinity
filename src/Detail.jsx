import { useEffect, useRef, useState, Suspense } from "react";
import { Popover } from "bootstrap";

function LazyDetailContent() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // ✅ IntersectionObserver：只要進入過一次就顯示
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 避免反覆觸發閃爍
        }
      },
      { threshold: [0.3] }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ 預設位置（初始值）
  const positions = [
    { key: "Magazine", x: 84.6, y: 49.4, desc: "30rd Magazine (Green gas/CO2)", img: "./images/mag.jpg" },
    { key: "ThumbSafety", x: 41, y: 25.7, desc: "Stainless Steel Ambidextrous Thumb safety", img: "./images/thumbsafty.webp" },
    { key: "BarrelThread", x: 22, y: 91, desc: "M11 CW Female Thread", img: "./images/detail3.jpg" },
    { key: "MagRelease", x: 61.5, y: 51.4, desc: "Extended Match Grade Magazine Release", img: "./images/detail4.jpg" },
    { key: "HopUp", x: 52.5, y: 55.3, desc: "Patented Quickly-Adjustable Hop-Up System", img: "./images/hop1.webp" },
    { key: "Trigger", x: 58.2, y: 59.8, desc: "Patented Match Grade Trigger", img: "./images/detail6.jpg" },
    { key: "Frame", x: 49.5, y: 79.5, desc: "Stainless Steel Middle Frame with Tactical Rail", img: "./images/detail7.jpg" },
    { key: "Slide", x: 49.8, y: 49.5, desc: "7075 Aluminum Alloy Light-Weight Slide", img: "./images/detail8.jpg" },
    { key: "RearSight", x: 53.4, y: 22.1, desc: "The rear sight can be replaced with an optic mount or a charging handle.", img: "./images/opticmount1.webp" }
  ];
  useEffect(() => {
    if (!isVisible) return;
    const container = containerRef.current;
    if (!container) return;

    let shadowRoot;
    if (!container.shadowRoot) {
      shadowRoot = container.attachShadow({ mode: "open" });

      const bootstrapCSS = document.createElement("link");
      bootstrapCSS.rel = "stylesheet";
      bootstrapCSS.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";

      const wrapper = document.createElement("div");
      wrapper.innerHTML = `
        <style>
          .image-wrapper {
            position: relative;
            display: inline-block;
          }

          .btn-danger {
            width: 16px !important;
            height: 16px !important;
            border-radius: 50% !important;
            padding: 0 !important;
            line-height: 1 !important;
            position: absolute;
            transform: translate(-50%, -50%);
            animation: scale 2.0s infinite ease-in-out;
            opacity: 0;
            transition: opacity 0.8s ease-in-out;
          }

          .btn-danger.visible {
            opacity: 1;
          }

          @keyframes scale {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.3); }
          }

          .popover {
            background-color: white !important;
            color: black !important;
            border: 1px solid #ddd !important;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3) !important;
          }

          .popover-body {
            background-color: white !important;
            color: black !important;
            padding: 10px !important;
            font-family: "Arial", sans-serif !important;
            font-size: 17px !important;
            width: 380px;
          }

          .popover-body img {
            max-width: 360px !important;
            margin-bottom:10px;
          }
        </style>

        <div class="d-flex justify-content-center">
          <div class="image-wrapper">
            <img src="./images/hicapa說明.webp" alt="Hicapa 說明" class="w-75 mt-5 mx-auto d-block">
            <div id="hotspots"></div>
          </div>
        </div>
      `;

      shadowRoot.appendChild(bootstrapCSS);
      shadowRoot.appendChild(wrapper);
    } else {
      shadowRoot = container.shadowRoot;
    }

    const hotspotsContainer = shadowRoot.getElementById("hotspots");
    if (hotspotsContainer) {
      hotspotsContainer.innerHTML = "";

      positions.forEach((pos) => {
        const button = document.createElement("button");
        button.className = "btn btn-danger";
        button.style.top = `${pos.y}%`;
        button.style.left = `${pos.x}%`;
        button.setAttribute("data-bs-toggle", "popover");
        button.setAttribute("data-bs-trigger", "hover focus");
        button.setAttribute("data-bs-placement", "right");
        button.setAttribute("data-bs-html", "true");
        button.setAttribute(
          "data-bs-content",
          `<div>
            <img src='${pos.img}' class='popover-img'/>
            <p class='small'>${pos.desc}</p>
          </div>`
        );

        hotspotsContainer.appendChild(button);
      });

      import("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js").then(() => {
        shadowRoot.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
          new Popover(popover, { html: true, container: shadowRoot });
        });
        shadowRoot.querySelectorAll(".btn-danger").forEach((btn) => {
          setTimeout(() => btn.classList.add("visible"), 500);
        });
      });
    }
  }, [isVisible]);

  return (
    <>
    <div className="desktop-content-d">
    <div className="position-relative w-100" style={{ maxHeight: "900px", overflow: "hidden" }}>
      {isVisible && (
        <h2
          className="archivo-black-regular hi-capa-title no-select"
          style={{
            fontSize: "clamp(28px, 8vw, 120px)",
            textAlign: "center",
            width: "100%",
            color: "white",
            margin: "55px auto 0px auto",
            lineHeight: "1.1",
            wordBreak: "break-word",
            pointerEvents: "none"
          }}
        >
          Technical Breakdown
        </h2>
      )}
      <div ref={containerRef} className="w-100"></div>
    </div>
    </div>

    
    <div className="mobile-only-d">
    <img src="./images/hicapa說明.webp" alt="TM Compatibility" className="mt-5" style={{ width: "100%", }} />
  </div>
</>
  );
}

export default function Detail() {
  const wrapperRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldRender(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef}>
      {shouldRender && (
        <Suspense fallback={null}>
          <LazyDetailContent />
        </Suspense>
      )}
    </div>
  );
}
