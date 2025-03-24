// Loader.jsx
import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html fullscreen>
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none', // optional, so it doesn’t block scene interaction
      }}>
        <div style={{
          transform: 'translateY(-25vh)', // shifts the loader upwards to ~50vh
          color: "white",
          fontSize: "18px",
          background: "rgba(0,0,0,0.8)",
          padding: "20px 30px",
          borderRadius: "8px",
          textAlign: "center",
          fontFamily: "Arial",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)"
        }}>
          Loading... {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
};

export default Loader;
