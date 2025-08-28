"use client";

import { Canvas } from "@react-three/fiber";
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

// 3D 模型
function Model() {
  const gltf = useGLTF("./models/open.glb");
  const modelRef = useRef();

  // 硬編碼模型屬性
  const scale = 12;
  const posX = 0.6;
  const posY = 0.9;
  const posZ = 0;
  const rotX = 0;
  const rotY = 0;
  const rotZ = 0;

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={scale}
      position={[posX, posY, posZ]}
      rotation={[rotX, rotY, rotZ]}
    />
  );
}

// 場景
function Scene() {
  // 硬編碼相機位置
  const camX = 3.1;
  const camY = 2.0;
  const camZ = 3.4;

  return (
    <>
      <Environment files="./quad.hdr" background={false} />
      <Model />

      {/* OrbitControls 禁用縮放 */}
      <OrbitControls
        enablePan={false} // 禁止平移
        enableZoom={false} // 禁止滾輪縮放
        enableRotate={true} // 允許旋轉
        autoRotate={true} // 自動旋轉
        autoRotateSpeed={-2.5} // 自動旋轉速度
        target={[0, 0.5, 0]} // 聚焦到模型中心
        position={[camX, camY, camZ]}
      />
    </>
  );
}

// 主組件
export default function OpenKit() {
  const buttons = Object.keys(partsData); // 直接用 partsData 的 key 當按鈕
  const [activePart, setActivePart] = useState(null);

  // ✅ IntersectionObserver 控制是否渲染模型
  const [shouldRender, setShouldRender] = useState(false);
  const sceneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect(); // 只觸發一次
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
      {/* 標題 */}
      <h2
        className="archivo-black-regular hi-capa-secondary-title no-select text-center"
        style={{
          fontSize: "120px",
          textAlign: "center",
          width: "100%",
          color: "white",
          zIndex: 0,
          pointerEvents: "none",
          margin: "55px auto 30px auto",
          lineHeight: "1.1",
        }}
      >
        IPSC Open Kit
      </h2>

      {/* 簡介文字 */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          marginTop: "2rem",
          color: "white",
        }}
      >
        A complete upgrade package designed for IPSC Open Division pistols. <br />
        Featuring essential components such as compensator, thumb rest, magwell,
        optic mount, and charging handle — each part engineered for speed, control,
        and precision in competition.
      </p>

      {/* 3D 模型區域 → IntersectionObserver 控制 */}
      <div ref={sceneRef} className="w-100" style={{ height: "80vh" }}>
        {shouldRender && (
          <Canvas camera={{ position: [3.1, 2.0, 3.4], fov: 35 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* 按鈕區域 → 永遠在 Canvas 下方 */}
      <div className="mt-5 d-flex flex-wrap justify-content-center gap-4">
        {buttons.map((b, i) => (
          <button
            key={i}
            className="btn btn-outline-light px-4 "
            onMouseEnter={() => setActivePart(b)}
            onMouseLeave={() => setActivePart(null)}
            onClick={() => setActivePart(b)}
          >
            {b}
          </button>
        ))}
      </div>

      {/* 說明文字區 → 固定最小高度避免跳動 */}
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
