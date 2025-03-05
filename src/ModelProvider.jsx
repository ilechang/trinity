import { createContext, useContext } from "react";
import { useGLTF } from "@react-three/drei";

// 創建 Context 來共享模型
const ModelContext = createContext(null);

// 共享 Model 的 Provider
export const ModelProvider = ({ children }) => {
  const model = useGLTF("./models/trinity12.glb"); // 只載入一次
  return (
    <ModelContext.Provider value={{ scene: model.scene, animations: model.animations }}>
      {children}
    </ModelContext.Provider>
  );
};

// 取得共享的 GLTF 模型
export const useSharedModel = () => {
  return useContext(ModelContext);
};









// // ModelProvider.js
// import { createContext, useContext } from "react";
// import { useGLTF } from "@react-three/drei";

// // 創建 Context 來共享模型
// const ModelContext = createContext(null);

// // 共享 Model 的 Provider
// export const ModelProvider = ({ children }) => {
//   const model = useGLTF("./models/trinity12.glb"); // 只載入一次
//   return (
//     <ModelContext.Provider value={model}>
//       {children}
//     </ModelContext.Provider>
//   );
// };

// // 取得共享的 GLTF 模型
// export const useSharedModel = () => {
//   return useContext(ModelContext);
// };
