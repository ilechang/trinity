




import { useEffect, useRef, useState, Suspense } from "react";
import { Popover } from "bootstrap";

function LazyDetailContent() {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.intersectionRatio > 0.3),
            { threshold: [0.3] }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const positions = [
        { key: "Magazine", x: 72, y: 52, desc: "30rd Magazine (Green gas/CO2)", img: "./images/mag.jpg" },
        { key: "B", x: 44.1, y: 36, desc: "Stainless Steel Ambidextrous Thumb safety", img: "./images/thumbsafty.webp" },
        { key: "C", x: 31.5, y: 79.5, desc: "M11 CW Female Thread", img: "./images/detail3.jpg" },
        { key: "D", x: 58.4, y: 51.4, desc: "Extended Match Grade Magazine Release", img: "./images/detail4.jpg" },
        { key: "E", x: 51.5, y: 57.3, desc: "Patented Quickly-Adjustable Hop-Up System", img: "./images/hop1.webp" },
        { key: "F", x: 55.5, y: 59.8, desc: "Patented Match Grade Trigger", img: "./images/detail6.jpg" },
        { key: "G", x: 49.5, y: 73, desc: "Stainless Steel Middle Frame with Tactical Rail", img: "./images/detail7.jpg" },
        { key: "H", x: 49.8, y: 49.5, desc: "7075 Aluminum Alloy Light-Weight Slide", img: "./images/detail8.jpg" },
        { key: "Removable rear sight", x: 52.4, y: 34.2, desc: "The rear sight can be replaced with an optic mount or a charging handle.", img: "./images/opticmount1.webp" },
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
                  .position-relative {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: auto;
                  }

                  .btn-danger {
                    width: 16px !important;
                    height: 16px !important;
                    border-radius: 50% !important;
                    padding: 0 !important;
                    line-height: 1 !important;
                    display: inline-block !important;
                    text-align: center !important;
                    box-sizing: content-box !important;
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
                      0%, 100% {
                          transform: translate(-50%, -50%) scale(1);
                      }
                      50% {
                          transform: translate(-50%, -50%) scale(1.3);
                      }
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
                <div class="position-relative w-100">
                  <div class="d-flex justify-content-center">
                    <img src="./images/hicapa說明.webp" alt="Hicapa 說明" class="w-50 mt-5">
                  </div>
                  <div id="hotspots"></div>
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
                button.style.position = "absolute";
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
        <div className="position-relative w-100">
            {isVisible && (
                <h2
                    className="archivo-black-regular hi-capa-title no-select text-center"
                    style={{
                        fontSize: "120px",
                        textAlign: "center",
                        width: "100%",
                        position: "absolute",
                        top: "65%",
                        left: "50%",
                        transform: "translate(-50%, -190%)",
                        color: "white",
                        zIndex: "0"
                    }}
                >
                    Technical Breakdown
                </h2>
            )}
            <div ref={containerRef} className="w-100"></div>
        </div>
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




