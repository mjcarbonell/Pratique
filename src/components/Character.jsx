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
        <group name="tourist" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="tmpbqj9rwud001" geometry={nodes.tmpbqj9rwud001.geometry} material={materials['Material.005']} skeleton={nodes.tmpbqj9rwud001.skeleton} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/male/model.gltf");