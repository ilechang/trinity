


import { Image, useScroll } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Images = () => {
    const { width, height } = useThree((state) => state.viewport);
    const scroll = useScroll()
    const groupRef = useRef()

    useFrame(() => {
        if (!groupRef.current) return;
    
        groupRef.current.children[0].material.zoom = 1 + scroll.range(0, 0.33) / 3;
        groupRef.current.children[1].material.zoom = 1 + scroll.range(0.33, 0.33) / 3;
        groupRef.current.children[2].material.zoom = 1 + scroll.range(0.33, 0.33) / 3;
        groupRef.current.children[3].material.zoom = 1 + scroll.range(0.33, 0.33) / 3;
        groupRef.current.children[4].material.zoom = 1 + scroll.range(0.66, 0.33) / 3;
        groupRef.current.children[5].material.zoom = 2 - scroll.range(0.66, 0.33);
    
        groupRef.current.children[4].material.grayscale = 1 - scroll.range(0.66, 0.33);
    
        // ✅ `images/4.jpg` 初始放大，滑入視窗縮回原大小
        const lastIndex = groupRef.current.children.length - 1;
        groupRef.current.children[lastIndex].material.zoom = 3 - scroll.range(0.33, 0.66) * 2;
    });
    
    return (
        <group ref={groupRef}>
            <Image url="images/bg.jpg" scale={[width * 5, height * 1.3, 1]} position={[0, 0, -1.2]}
                zoom={1}
            />
            <Image url="images/airsoft.jpg" scale={[5, height*0.6, 1]} position={[2.8, -6.5, 0]}
                zoom={1}
            />

            <Image
                position={[-2.3, -height - 6, 2]}
                scale={[1, 3, 1]}
                url="./images/2.webp"
                zoom={1}
            />
            <Image
                position={[-0.6, -height - 6, 3]}
                scale={[1, 2, 1]}
                url="./images/1.webp"
                zoom={1}
            />
            <Image
                position={[0, -height * 1.5 - 6, 2.5]}
                scale={[1.5, 3, 1]}
                url="./images/6.jpg"
                grayscale={1}
            />
             <Image position={[0.75, -height-6, 3.5]} scale={1.5} url="./images/6.jpg" />
            <Image
                position={[0, -height * 1.5 - 6, 2.5]}
                scale={[1.5, 3, 1]}
                url="./images/1.png"
                grayscale={1}
            />
            <Image
                position={[0, -height * 2 - height / 4 - 6, 0]}
                scale={[width, height / 2, 1]}
                url="./images/trinity5.jpg"
            />

        </group>


    )

}

export default Images;