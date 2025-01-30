import React from "react";
import { useGLTF } from "@react-three/drei";

export const Roam = (props) => {
  const { scene } = useGLTF("./models/roam/model.glb");
  return <primitive object={scene} {...props} />;
};
