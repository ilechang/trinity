
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
        { key: "B", x: 44.1, y: 36, desc: "Stainless Steel Ambidextrous Thumb safety", img: "./images/thumbsafty1.jpg" },
        { key: "C", x: 31.5, y: 79.5, desc: "M11 CW Female Thread", img: "./images/detail3.jpg" },
        { key: "D", x: 58.4, y: 51.4, desc: "Extended Match Grade Magazine Release", img: "./images/detail4.jpg" },
        { key: "E", x: 51.5, y: 57.3, desc: "Patented Quickly-Adjustable Hop-Up System", img: "./images/hop1.jpg" },
        { key: "F", x: 55.5, y: 59.8, desc: "Patented Match Grade Trigger", img: "./images/detail6.jpg" },
        { key: "G", x: 49.5, y: 73, desc: "Stainless Steel Middle Frame with Tactical Rail", img: "./images/detail7.jpg" },
        { key: "H", x: 49.8, y: 49.5, desc: "7075 Aluminum Alloy Light-Weight Slide", img: "./images/detail8.jpg" },
        { key: "Removable rear sight", x: 52.4, y: 34.2, desc: "The rear sight can be replaced with an optic mount or a charging handle.", img: "./images/opticmount1.jpg" },
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
                    <img src="./images/hicapa說明.png" alt="Hicapa 說明" class="w-50 mt-5">
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






















// import { useEffect, useRef, useState } from "react";
// import { Popover } from "bootstrap";

// export default function Detail() {
//     const containerRef = useRef(null);
//     const [isVisible, setIsVisible] = useState(false);

//     // ✅ 監聽 Detail 是否進入視窗（至少 30% 可見時觸發）
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => setIsVisible(entry.intersectionRatio > 0.3),
//             { threshold: [0.3] } // 30% threshold
//         );

//         if (containerRef.current) observer.observe(containerRef.current);
//         return () => observer.disconnect();
//     }, []);

//     // ✅ **Hardcode 紅點數值**
//     const positions = [
//         { key: "Magazine", x: 72, y: 52, desc: "30rd Magazine (Green gas/CO2)", img: "./images/mag.jpg" },
//         { key: "B", x: 44.1, y: 36, desc: "Stainless Steel Ambidextrous Thumb safety", img: "./images/thumbsafty1.jpg" },
//         { key: "C", x: 31.5, y: 79.5, desc: "M11 CW Female Thread", img: "./images/detail3.jpg" },
//         { key: "D", x: 58.4, y: 51.4, desc: "Extended Match Grade Magazine Release", img: "./images/detail4.jpg" },
//         { key: "E", x: 51.5, y: 57.3, desc: "Patented Quickly-Adjustable Hop-Up System", img: "./images/hop1.jpg" },
//         { key: "F", x: 55.5, y: 59.8, desc: "Patented Match Grade Trigger", img: "./images/detail6.jpg" },
//         { key: "G", x: 49.5, y: 73, desc: "Stainless Steel Middle Frame with Tactical Rail", img: "./images/detail7.jpg" },
//         { key: "H", x: 49.8, y: 49.5, desc: "7075 Aluminum Alloy Light-Weight Slide", img: "./images/detail8.jpg" },
//         { key: "Removable rear sight", x: 52.4, y: 34.2, desc: "The rear sight can be replaced with an optic mount or a charging handle.", img: "./images/opticmount1.jpg" },
//     ];

//     useEffect(() => {
//         if (!isVisible) return; // ✅ **如果 Detail 還沒到 30% 可見，就不生成紅點**
        
//         const container = containerRef.current;
//         if (!container) return;

//         let shadowRoot;
//         if (!container.shadowRoot) {
//             shadowRoot = container.attachShadow({ mode: "open" });

//             const bootstrapCSS = document.createElement("link");
//             bootstrapCSS.rel = "stylesheet";
//             bootstrapCSS.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";

//             const wrapper = document.createElement("div");
//             wrapper.innerHTML = `
//                 <style>
//                   .position-relative {
//                     margin: 0;
//                     padding: 0;
//                     width: 100%;
//                     height: auto;
//                   }

//                   .btn-danger {
//                     width: 16px !important;
//                     height: 16px !important;
//                     border-radius: 50% !important;
//                     padding: 0 !important;
//                     line-height: 1 !important;
//                     display: inline-block !important;
//                     text-align: center !important;
//                     box-sizing: content-box !important;
//                     position: absolute;
//                     transform: translate(-50%, -50%);
//                     animation: scale 2.0s infinite ease-in-out;
//                     opacity: 0; /* 初始隱藏 */
//                     transition: opacity 0.8s ease-in-out;
//                   }

//                   .btn-danger.visible {
//                     opacity: 1; /* 滾動到 30% 後才顯示 */
//                   }

//                   @keyframes scale {
//                       0%, 100% {
//                           transform: translate(-50%, -50%) scale(1);
//                       }
//                       50% {
//                           transform: translate(-50%, -50%) scale(1.3);
//                       }
//                   }

//                   .popover {
//                     background-color: white !important;
//                     color: black !important;
//                     border: 1px solid #ddd !important;
//                     box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3) !important;
//                   }

//                   .popover-body {
//                     background-color: white !important;
//                     color: black !important;
//                     padding: 10px !important;
//                     font-family: "Arial", sans-serif !important;
//                     font-size: 17px !important;
//                     width: 380px;
//                   }

//                   .popover-body img {
//                     max-width: 360px !important;
//                     margin-bottom:10px;
//                   }
//                 </style>
//                 <div class="position-relative w-100">
//                   <div class="d-flex justify-content-center">
//                     <img src="./images/hicapa說明.png" alt="Hicapa 說明" class="w-50 mt-5">
//                   </div>
//                   <div id="hotspots"></div>
//                 </div>
//             `;

//             shadowRoot.appendChild(bootstrapCSS);
//             shadowRoot.appendChild(wrapper);
//         } else {
//             shadowRoot = container.shadowRoot;
//         }

//         const hotspotsContainer = shadowRoot.getElementById("hotspots");
//         if (hotspotsContainer) {
//             hotspotsContainer.innerHTML = "";

//             positions.forEach((pos) => {
//                 const button = document.createElement("button");
//                 button.className = "btn btn-danger"; // 初始隱藏
//                 button.style.position = "absolute";
//                 button.style.top = `${pos.y}%`;
//                 button.style.left = `${pos.x}%`;
//                 button.setAttribute("data-bs-toggle", "popover");
//                 button.setAttribute("data-bs-trigger", "hover focus");
//                 button.setAttribute("data-bs-placement", "right");
//                 button.setAttribute("data-bs-html", "true");
//                 button.setAttribute(
//                   "data-bs-content",
//                   `<div>
//                     <img src='${pos.img}' class='popover-img'/>
//                     <p class='small'>${pos.desc}</p>
//                   </div>`
//                 );

//                 hotspotsContainer.appendChild(button);
//             });

//             // ✅ **重新初始化 Bootstrap Popover 並附加到 Shadow DOM**
//             import("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js").then(() => {
//                 shadowRoot.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
//                     new Popover(popover, { html: true, container: shadowRoot });
//                 });

//                 // ✅ **滾動到 30% 之後，讓紅點顯示**
//                 shadowRoot.querySelectorAll(".btn-danger").forEach((btn) => {
//                     setTimeout(() => btn.classList.add("visible"), 500);
//                 });
//             });
//         }
//     }, [isVisible]); // ✅ **當 isVisible 變化時才重新執行**

//     return (
//       <div className="position-relative w-100">
//         {isVisible && (
//           <h2 
//             className="archivo-black-regular hi-capa-title no-select text-center"
//             style={{ 
//               fontSize: "120px", 
//               textAlign: "center", 
//               width: "100%",
//               position: "absolute",
//               top: "10%",
//               left: "50%",
//               transform: "translate(-50%, -190%)",
//               color: "white",
//               zIndex: "0"
//             }}
//           >
//             Technical Breakdown
//           </h2>
//         )}
//         <div ref={containerRef} className="w-100"></div>
//       </div>
//     );
// }






















// import { useEffect, useRef, useState } from "react";
// import { Popover } from "bootstrap";

// export default function Detail() {
//     const containerRef = useRef(null);
//     const [isVisible, setIsVisible] = useState(false);

//     // ✅ 監聽 Detail 是否進入視窗
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => setIsVisible(entry.isIntersecting),
//             { threshold: 0.6 }
//         );

//         if (containerRef.current) observer.observe(containerRef.current);
//         return () => observer.disconnect();
//     }, []);

//     // ✅ **Hardcode 紅點數值**
//     const positions = [
//         { key: "Magazine", x: 72, y: 52, desc: "30rd Magazine (Green gas/CO2)", img: "./images/mag.jpg" },
//         { key: "B", x: 44.1, y: 36, desc: "Stainless Steel Ambidextrous Thumb safety", img: "./images/thumbsafty1.jpg" },
//         { key: "C", x: 31.5, y: 79.5, desc: "M11 CW Female Thread", img: "./images/detail3.jpg" },
//         { key: "D", x: 58.4, y: 51.4, desc: "Extended Match Grade Magazine Release", img: "./images/detail4.jpg" },
//         { key: "E", x: 51.5, y: 57.3, desc: "Patented Quickly-Adjustable Hop-Up System", img: "./images/hop1.jpg" },
//         { key: "F", x: 55.5, y: 59.8, desc: "Patented Match Grade Trigger", img: "./images/detail6.jpg" },
//         { key: "G", x: 49.5, y: 73, desc: "Stainless Steel Middle Frame with Tactical Rail", img: "./images/detail7.jpg" },
//         { key: "H", x: 49.8, y: 49.5, desc: "7075 Aluminum Alloy Light-Weight Slide", img: "./images/detail8.jpg" },
//         { key: "Removable rear sight", x: 52.4, y: 34.2, desc: "The rear sight can be replaced with an optic mount or a charging handle.", img: "./images/opticmount1.jpg" },
//     ];

//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         let shadowRoot;
//         if (!container.shadowRoot) {
//             shadowRoot = container.attachShadow({ mode: "open" });

//             const bootstrapCSS = document.createElement("link");
//             bootstrapCSS.rel = "stylesheet";
//             bootstrapCSS.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";

//             const wrapper = document.createElement("div");
//             wrapper.innerHTML = `
//                 <style>
//                   .position-relative {
//                     margin: 0;
//                     padding: 0;
//                     width: 100%;
//                     height: auto;
//                   }

//                   .btn-danger {
//                     width: 16px !important;
//                     height: 16px !important;
//                     border-radius: 50% !important;
//                     padding: 0 !important;
//                     line-height: 1 !important;
//                     display: inline-block !important;
//                     text-align: center !important;
//                     box-sizing: content-box !important;
//                     position: absolute;
//                     transform: translate(-50%, -50%);
//                     animation: scale 2.0s infinite ease-in-out;
//                   }

//                   @keyframes scale {
//                       0%, 100% {
//                           transform: translate(-50%, -50%) scale(1);
//                       }
//                       50% {
//                           transform: translate(-50%, -50%) scale(1.3);
//                       }
//                   }

//                   .popover {
//                     background-color: white !important;
//                     color: black !important;
//                     border: 1px solid #ddd !important;
//                     box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3) !important;
//                   }


//                   .popover-body {
//                     background-color: white !important;
//                     color: black !important;
//                     padding: 10px !important;
//                     font-family: "Arial", sans-serif !important; /* 更改字體 */
//                     font-size: 17px !important; /* 更改字體大小 */
//                     width: 380px
//                   }

//                   .popover-body strong {
//                     font-family: "Arial", sans-serif !important; /* 更改字體 */
//                     font-size: 17px !important;
//                     font-weight: bold !important;
//                     color: black !important;
//                 }

//                   .popover-arrow {
//                     display: none !important;
//                 }

//                   .popover-body img {
//                     max-width: 360px !important;
//                     margin-bottom:10px
                   
//                   }

//                 </style>
//                 <div class="position-relative w-100">
//                   <div class="d-flex justify-content-center">
//                     <img src="./images/hicapa說明.png" alt="Hicapa 說明" class="w-50 mt-5">
//                   </div>
//                   <div id="hotspots"></div>
//                 </div>
//             `;

//             shadowRoot.appendChild(bootstrapCSS);
//             shadowRoot.appendChild(wrapper);
//         } else {
//             shadowRoot = container.shadowRoot;
//         }

//         const hotspotsContainer = shadowRoot.getElementById("hotspots");
//         if (hotspotsContainer) {
//             hotspotsContainer.innerHTML = "";

//             positions.forEach((pos) => {
//                 const button = document.createElement("button");
//                 button.className = "btn btn-danger";
//                 button.style.position = "absolute";
//                 button.style.top = `${pos.y}%`;
//                 button.style.left = `${pos.x}%`;
//                 button.setAttribute("data-bs-toggle", "popover");
//                 button.setAttribute("data-bs-trigger", "hover focus");
//                 button.setAttribute("data-bs-placement", "right");
//                 button.setAttribute("data-bs-html", "true");
//                 button.setAttribute(
//                   "data-bs-content",
//                   `<div>
//                     <img src='${pos.img}' class='popover-img'/>
                    
//                     <p class='small'>${pos.desc}</p>
//                   </div>`
//                 );

//                 hotspotsContainer.appendChild(button);
//             });

//             // ✅ **重新初始化 Bootstrap Popover 並附加到 Shadow DOM**
//             import("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js").then(() => {
//                 shadowRoot.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
//                     new Popover(popover, { html: true, container: shadowRoot });
//                 });
//             });
//         }
//     }, []);

//     return (
//       <div className="position-relative w-100">
//         {isVisible && (
//           <h2 
//             className="archivo-black-regular hi-capa-title no-select text-center"
//             style={{ 
//               fontSize: "120px", 
//               textAlign: "center", 
//               width: "100%",
//               position: "absolute",
//               top: "10%",
//               left: "50%",
//               transform: "translate(-50%, -190%)",
//               color: "white",
//               zIndex: "0"
//             }}
//           >
//             Technical Breakdown
//           </h2>
//         )}
//         <div ref={containerRef} className="w-100"></div>
//       </div>
//     );
// }















// import { useEffect, useRef, useState } from "react";
// import { Popover } from "bootstrap";

// export default function Detail() {
//     const containerRef = useRef(null);
//     const [isVisible, setIsVisible] = useState(false);
    

//     // ✅ 監聽 Detail 是否進入視窗
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => setIsVisible(entry.isIntersecting),
//             { threshold: 0.6 } // 當 Detail 50% 進入視窗時觸發
//         );

//         if (containerRef.current) observer.observe(containerRef.current);
//         return () => observer.disconnect();
//     }, []);

    

//     // ✅ **Hardcode 紅點數值**
//     const positions = [
//         { key: "A", x: 72, y: 52, desc: "30rd Magazine (Green gas/CO2)", img: "./images/detail1.jpg" },
//         { key: "B", x: 44.1, y: 36, desc: "Stainless Steel Ambidextrous Thumb safety", img: "./images/detail2.jpg" },
//         { key: "C", x: 31.5, y: 79.5, desc: "M11 CW Female Thread", img: "./images/detail3.jpg" },
//         { key: "D", x: 58.4, y: 51.4, desc: "Extended Match Grade Magazine Release", img: "./images/detail4.jpg" },
//         { key: "E", x: 51.5, y: 57.3, desc: "Patented Quickly-Adjustable Hop-Up System", img: "./images/detail5.jpg" },
//         { key: "F", x: 55.5, y: 59.8, desc: "Patented Match Grade Trigger", img: "./images/detail6.jpg" },
//         { key: "G", x: 49.5, y: 73, desc: "Stainless Steel Middle Frame with Tactical Rail", img: "./images/detail7.jpg" },
//         { key: "H", x: 49.8, y: 49.5, desc: "7075 Aluminum Alloy Light-Weight Slide", img: "./images/detail8.jpg" },
//         { key: "Removable rear sight", x: 52.4, y: 34.2, desc: "The rear sight can be replaced with an optic mount or a charging handle.", img: "./images/opticmount1.jpg" },
//     ];

//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         if (!container.shadowRoot) {
//             // **創建 Shadow DOM**
//             const shadowRoot = container.attachShadow({ mode: "open" });

//             // **創建 Bootstrap CSS**
//             const bootstrapCSS = document.createElement("link");
//             bootstrapCSS.rel = "stylesheet";
//             bootstrapCSS.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";

//             // **創建 HTML 結構**
//             const wrapper = document.createElement("div");
//             wrapper.innerHTML = `
//                 <style>
//                   .position-relative {
//                     margin: 0;
//                     padding: 0;
//                     width: 100%;
//                     height: auto;
//                   }

//                   .btn-danger {
//                     width: 16px !important;
//                     height: 16px !important;
//                     border-radius: 50% !important;
//                     padding: 0 !important;
//                     line-height: 1 !important;
//                     display: inline-block !important;
//                     text-align: center !important;
//                     box-sizing: content-box !important;
//                     position: absolute;
//                     transform: translate(-50%, -50%);
//                     animation: scale 2.0s infinite ease-in-out; /* 🔥 放大縮小動畫 */
//                 }
                
//                 @keyframes scale {
//                     0%, 100% {
//                         transform: translate(-50%, -50%) scale(1);
//                     }
//                     50% {
//                         transform: translate(-50%, -50%) scale(1.3);
//                     }
//                 }

//                   /* 🔥 確保 Popover 背景為白色 */
//                   .popover {
//                     background-color: white !important;
//                     color: black !important;
//                     border: 1px solid #ddd !important;
//                     box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3) !important;
//                   }

//                   .popover-body {
//                     background-color: white !important;
//                     color: black !important;
//                     padding: 10px !important;
//                     border-radius: 5px !important;
//                   }

//                   /* 🔥 確保箭頭也是白色 */
//                   .popover-arrow::before {
//                     border-top-color: white !important;
//                     border-bottom-color: white !important;
//                     border-left-color: white !important;
//                     border-right-color: white !important;
//                   }
//                 </style>
//                 <div class="position-relative w-100">
//                   <div class="d-flex justify-content-center">
//                     <img src="./images/hicapa說明.png" alt="Hicapa 說明" class="w-50 mt-5">
//                   </div>
//                   <div id="hotspots"></div> <!-- 🔥 React 會在這裡插入紅點 -->
//                 </div>
//             `;

//             // **將 Bootstrap CSS 和內容插入 Shadow DOM**
//             shadowRoot.appendChild(bootstrapCSS);
//             shadowRoot.appendChild(wrapper);
//         }

//         const shadowRoot = container.shadowRoot;
//         const hotspotsContainer = shadowRoot.getElementById("hotspots");

//         if (hotspotsContainer) {
//             hotspotsContainer.innerHTML = ""; // 清空舊內容

//             positions.forEach((pos, index) => {
//                 const button = document.createElement("button");
//                 button.className = "btn btn-danger";
//                 button.style.position = "absolute";
//                 button.style.top = `${pos.y}%`;
//                 button.style.left = `${pos.x}%`;
//                 button.style.width = "16px";
//                 button.style.height = "16px";
//                 button.style.borderRadius = "50%";
//                 button.style.animation = "scale 2.2s infinite ease-in-out";
//                 button.setAttribute("data-bs-toggle", "popover");
//                 button.setAttribute("data-bs-trigger", "hover focus");
//                 button.setAttribute("data-bs-placement", "top");
//                 button.setAttribute("data-bs-html", "true");
//                 button.setAttribute(
//                     "data-bs-content",
//                     `<div style='background: white; padding: 10px; border-radius: 5px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);'>
//                       <img src='${pos.img}' class='img-fluid mb-2' style='max-width: 100px;' />
//                       <strong>${pos.key}</strong>
//                       <p class='small'>${pos.desc}</p>
//                     </div>`
//                 );

//                 hotspotsContainer.appendChild(button);
//             });

//             // **重新初始化 Bootstrap Popover**
//             import("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js").then(() => {
//                 shadowRoot.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
//                     new Popover(popover, { html: true });
//                 });
//             });
//         }
//     }, []); 

//     return (
//       <div className="position-relative w-100">
//         {/* 只有 Detail 可見時，標題才顯示 */}
//         {isVisible && (
//           <h2 
//             className="archivo-black-regular hi-capa-title no-select text-center"
//             style={{ 
//               fontSize: "120px", 
//               textAlign: "center", 
//               width: "100%",
//               position: "absolute",
//               top: "10%",
//               left: "50%",
//               transform: "translate(-50%, -190%)",
//               color: "white",
//               zIndex: "0"
//             }}
//           >
//             Technical Breakdown
//           </h2>
//         )}
//         <div ref={containerRef} className="w-100"></div>
//       </div>
//     );
// }









// // 用leva操控點的位置


// import { useEffect, useRef } from "react";
// import { Popover } from "bootstrap";
// import { useControls } from "leva";

// export default function Detail() {
//     const containerRef = useRef(null);

//     // ✅ Leva 控制紅點位置（8 個點）
//     const positions = useControls({
//         Point1: { x: 20, y: 30 },
//         Point2: { x: 50, y: 40 },
//         Point3: { x: 70, y: 60 },
//         Point4: { x: 40, y: 20 },
//         Point5: { x: 60, y: 50 },
//         Point6: { x: 80, y: 70 },
//         Point7: { x: 30, y: 80 },
//         Point8: { x: 50, y: 90 },
//     });

//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         if (!container.shadowRoot) {
//             // **創建 Shadow DOM**
//             const shadowRoot = container.attachShadow({ mode: "open" });

//             // **創建 Bootstrap CSS**
//             const bootstrapCSS = document.createElement("link");
//             bootstrapCSS.rel = "stylesheet";
//             bootstrapCSS.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";

//             // **創建 HTML 結構**
//             const wrapper = document.createElement("div");
//             wrapper.innerHTML = `
//                 <style>
//                   .position-relative {
//                     margin: 0;
//                     padding: 0;
//                     width: 100%;
//                     height: auto;
//                   }

//                   /* 🔥 讓紅點閃爍 */
//                   @keyframes blink {
//                     0% { opacity: 1; }
//                     50% { opacity: 0.5; }
//                     100% { opacity: 1; }
//                   }

//                   .btn-danger {
//                     width: 16px !important;
//                     height: 16px !important;
//                     border-radius: 50% !important;
//                     padding: 0 !important;
//                     line-height: 1 !important;
//                     display: inline-block !important;
//                     text-align: center !important;
//                     box-sizing: content-box !important;
//                     position: absolute;
//                     transform: translate(-50%, -50%);
//                     animation: blink 2.2s infinite ease-in-out; /* 🔥 閃爍動畫 */
//                   }

//                   /* 🔥 確保 Popover 背景為白色 */
//                   .popover {
//                     background-color: white !important;
//                     color: black !important;
//                     border: 1px solid #ddd !important;
//                     box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3) !important;
//                   }

//                   .popover-body {
//                     background-color: white !important;
//                     color: black !important;
//                     padding: 10px !important;
//                     border-radius: 5px !important;
//                   }

//                   /* 🔥 確保箭頭也是白色 */
//                   .popover-arrow::before {
//                     border-top-color: white !important;
//                     border-bottom-color: white !important;
//                     border-left-color: white !important;
//                     border-right-color: white !important;
//                   }
//                 </style>
//                 <div class="position-relative w-100">
//                   <div class="d-flex justify-content-center">
//                     <img src="./images/hicapa說明.png" alt="Hicapa 說明" class="w-50 mt-5">
//                   </div>
//                   <div id="hotspots"></div> <!-- 🔥 React 會在這裡插入紅點 -->
//                 </div>
//             `;

//             // **將 Bootstrap CSS 和內容插入 Shadow DOM**
//             shadowRoot.appendChild(bootstrapCSS);
//             shadowRoot.appendChild(wrapper);
//         }

//         const shadowRoot = container.shadowRoot;
//         const hotspotsContainer = shadowRoot.getElementById("hotspots");

//         if (hotspotsContainer) {
//             hotspotsContainer.innerHTML = ""; // 清空舊內容

//             Object.entries(positions).forEach(([key, pos], index) => {
//                 const button = document.createElement("button");
//                 button.className = "btn btn-danger";
//                 button.style.position = "absolute";
//                 button.style.top = `${pos.y}%`;
//                 button.style.left = `${pos.x}%`;
//                 button.style.width = "16px";
//                 button.style.height = "16px";
//                 button.style.borderRadius = "50%";
//                 button.style.animation = "blink 2.2s infinite ease-in-out";
//                 button.setAttribute("data-bs-toggle", "popover");
//                 button.setAttribute("data-bs-trigger", "hover focus");
//                 button.setAttribute("data-bs-placement", "top");
//                 button.setAttribute("data-bs-html", "true");
//                 button.setAttribute(
//                     "data-bs-content",
//                     `<div style='background: white; padding: 10px; border-radius: 5px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);'>
//                       <img src='./images/detail${index + 1}.jpg' class='img-fluid mb-2' style='max-width: 100px;' />
//                       <strong>${key}</strong>
//                       <p class='small'>Details for ${key}.</p>
//                     </div>`
//                 );

//                 hotspotsContainer.appendChild(button);
//             });

//             // **重新初始化 Bootstrap Popover**
//             import("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js").then(() => {
//                 shadowRoot.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
//                     new Popover(popover, { html: true });
//                 });
//             });
//         }
//     }, [positions]); // ✅ `positions` 變動時，會觸發 `useEffect` 重新渲染紅點

//     return <div ref={containerRef}></div>;
// }
