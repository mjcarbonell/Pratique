import { Center, Cylinder, Sphere, Box, Plane, Text3D } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useGameStore } from "../store";

export const KanaSpots = () => {
  const { level, kanaTouched, currentStage, mode } = useGameStore((state) => ({
    level: state.level,
    kanaTouched: state.kanaTouched,
    currentStage: state.currentStage,
    mode: state.mode,
  }));

  const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: { value: 10, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0, min: 0, max: 10, step: 0.01 },
    ior: { value: 1, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0, min: 0, max: 1 },
    anisotropy: { value: 0, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 1, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#efbeff",
    bg: "#ffffff",
  });

  if (!level) {
    return null;
  }

  return level[currentStage].map((word, index) => (
    <group
      key={`${currentStage}-${word.name || index}`}
      rotation-y={(index / level[currentStage].length) * Math.PI * 2}
    >
      <group position-x={3.5} position-z={-4.5}>
        <RigidBody colliders={false} type="fixed" onCollisionEnter={() => {
            kanaTouched(word);
          }}
        >
          <CylinderCollider args={[0.25 / 2, 1]} />
          <Cylinder scale={[1, 0.25, 1]}>
            <meshStandardMaterial color="white" />
          </Cylinder>
        </RigidBody>
        <Sphere scale={[2.3, 1.22, 2.3]} position={[0, 0.8, 0]}>
          <meshPhysicalMaterial {...config} />
        </Sphere>
        <Center position-y={0.8}>
          <Text3D
            font={"./fonts/FrenchCanon.json"}
            size={0.82}
            rotation-y={-(index / level[currentStage].length) * Math.PI * 2}
          >
            {word.english}
            <meshStandardMaterial color="#ebbe89" toneMapped={false} />
          </Text3D>
        </Center>
      </group>
    </group>
  ));
};
