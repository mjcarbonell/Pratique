import { useAnimations, useGLTF, Html } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import {CapsuleCollider,RigidBody} from "@react-three/rapier";
import { useGameStore, playAudio } from "/src/store.js";

export default function Baker(props) {
  const group = useRef();
  const rigidbody = useRef();

  const { nodes, materials, animations } = useGLTF("./models/baker/model.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => { // detects any change in the characterState value. 

    // gets called anytime the player moves
    const currentAction = actions["IdleAnimation"]; // we play idle animation the whole time. 
    if (currentAction) {
      currentAction.reset().fadeIn(0.2).play();
      return () => {
        currentAction.fadeOut(0.2);
      };
    } 
  }, [actions]);
  
  return (
    <RigidBody
        ref={rigidbody}
        colliders={false}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
        type="fixed"
        position={[2, 0, -10.074]}
        name={"baker"}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[-2, 1, 0]} sensor />
        <group ref={group} {...props} dispose={null}>
          <group name="Scene">
            <group name="Baker" position={[-2, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.02}>
              <primitive object={nodes.mixamorigHips} />
              <skinnedMesh name="Baker001" geometry={nodes.Baker001.geometry} material={materials['Material_0.001']} skeleton={nodes.Baker001.skeleton} />
            </group>
          </group>
        </group>
      </RigidBody>
  );
}

useGLTF.preload("./models/baker/model.gltf");