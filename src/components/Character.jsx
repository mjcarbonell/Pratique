import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useGameStore } from "/src/store.js";

export default function Character(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./models/male/model.gltf");
  const { actions } = useAnimations(animations, group);


  const characterState = useGameStore((state) => state.characterState);

  const actionMap = {
    Idle: "IdleAnimation",
    Run: "RunAnimation",
  };

  useEffect(() => {
    //console.log("Available actions:", Object.keys(actions));
    //console.log("Current characterState:", characterState);

    const currentAction = actions[actionMap[characterState]];
    if (currentAction) {
      currentAction.reset().fadeIn(0.2).play();
      return () => {
        currentAction.fadeOut(0.2);
      };
    } else {
      console.error(`Action for state "${characterState}" not found. Available actions are:`, Object.keys(actions));
    }
  }, [characterState, actions]);

  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="character" scale={0.64}>
          <primitive object={nodes.LeftFootCtrl} />
          <primitive object={nodes.RightFootCtrl} />
          <primitive object={nodes.HipsCtrl} />
          <skinnedMesh name="characterMedium" geometry={nodes.characterMedium.geometry} material={materials['skin.001']} skeleton={nodes.characterMedium.skeleton} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/male/model.gltf");