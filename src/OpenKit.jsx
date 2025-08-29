"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";

// 📌 配件資料集中在這裡
const partsData = {
  Compensator:
    "On an airsoft gun, the compensator is not only for aesthetics — it also allows for an extended inner barrel length (up to one inch), enhancing accuracy and shot consistency.",
  "Thumb Rest":
    "A thumb rest improves a gun’s stability and helps control muzzle rise, enhancing accuracy during rapid fire.",
  magwell:
    "A flared magwell speeds up reloads by guiding the magazine into place, ensuring faster and more consistent magazine changes under pressure.",
  "optic mount":
    "The frame-mounted optic provides a stable platform for red dot sights, improving target acquisition speed and overall aiming precision. Because it does not reciprocate with the slide, it ensures greater stability and consistency.",
  optic:
    "A red dot optic allows for faster target acquisition and improved accuracy, especially during dynamic shooting stages.",
  "charging handle":
    "An extended charging handle offers better grip and accessibility, making slide manipulation faster and more efficient, especially during competition.",
};

// 3D 模型 (自轉)
function Model() {
  const gltf = useGLTF("./models/open.glb");
  const modelRef = useRef();

  // ✅ 讓模型本身旋轉（fps independent）
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= delta * 0.5; // 調整 0.5 速度
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={11.2}
      position={[0.6, 1.1, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// 場景
function Scene() {
  return (
    <>
      <Environment files="./quad.hdr" background={false} />
      <Model />

      {/* OrbitControls 只保留互動，不用 autoRotate */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        target={[0, 0.5, 0]}
      />
    </>
  );
}

// 主組件
export default function OpenKit() {
  const buttons = Object.keys(partsData);
  const [activePart, setActivePart] = useState(null);
  const [shouldRender, setShouldRender] = useState(false);
  const sceneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="text-white min-vh-100 d-flex flex-column align-items-center"
      style={{ position: "relative", width: "100vw" }}
    >
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
        IPSC Open Kit
      </h2>

      <p
        style={{
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          marginTop: "2rem",
          color: "white",
        }}
      >
This kit features essential IPSC Open Division upgrades: compensator, thumb rest, magwell, optic mount, and charging handle. 
<br/>Each component is precision-engineered for competition, delivering faster handling, enhanced control, and unmatched accuracy.
      </p>

      {/* 3D 模型區域 */}
      <div ref={sceneRef} className="w-100 canvas-container-open">
        {shouldRender && (
          <Canvas camera={{ position: [3.1, 2.0, 3.4], fov: 35 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* 按鈕 */}
      <div className="mt-5 d-flex flex-wrap  justify-content-center gap-4">
        {buttons.map((b, i) => (
          <button
            key={i}
            className="btn btn-outline-light rounded-0 px-4"
            onMouseEnter={() => setActivePart(b)}
            onMouseLeave={() => setActivePart(null)}
            onClick={() => setActivePart(b)}
           
          >
            {b}
          </button>
        ))}
      </div>

      {/* 說明文字 */}
      <div
        style={{
          marginTop: "1.5rem",
          minHeight: "80px",
          maxWidth: "800px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "clamp(14px, 1.2vw, 1rem)", color: "white" }}>
          {activePart ? partsData[activePart] : ""}
        </p>
      </div>
    </div>
  );
}

useGLTF.preload("./models/open.glb");
