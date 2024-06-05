// task-1 - part-1,2
import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { Suspense } from "react";

export default function Experience() {
    
  return (
    <>  
      <OrbitControls makeDefault />
      <Suspense>
        <Center position={[-1.5, 0, 0]}>
          <Text3D
            font="./fonts/gentilis_regular.typeface.json"   // try font-1
            size={1}
            height={0.5}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.002}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={0.5}
          >
            hello
            <meshNormalMaterial />
          </Text3D>
        </Center>
        <Center position={[1.5, 0, 0]}>
          <Text3D
            font="./fonts/optimer_regular.typeface.json"   // try font-2
            size={1}
            height={0.5}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.002}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={0.5}
          >
            r3f
            <meshNormalMaterial />
          </Text3D>
        </Center>
      </Suspense>
    </>
  );
}