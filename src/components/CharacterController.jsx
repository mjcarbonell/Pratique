import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { Controls } from "../App";
import { gameStates, playAudio, useGameStore } from "../store";
import Character from "./Character";
import * as THREE from "three";
import Baker from "./Baker";

const JUMP_FORCE = 8; // 0.5 before 
const MOVEMENT_SPEED = 1.2; // 0.1 before
const MAX_VEL = 3;
const RUN_VEL = 1.5;


// let bakerTouched = false; 

export const CharacterController = () => {
  const { characterState, setCharacterState, gameState, chatState, setBakerState } = useGameStore(
    (state) => ({
      character: state.characterState,
      setCharacterState: state.setCharacterState,
      gameState: state.gameState,
      chatState: state.chatState,
      setBakerState: state.setBakerState,
    })
  );
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );
  const rigidbody = useRef();
  const isOnFloor = useRef(true);

  useFrame((state, delta) => {

    if (chatState === "TRUE") {
      return; // Disable movement if chatState is TRUE
    }
    
    // if (bakerTouched === true) {
    //   setBakerState("TRUE");
    // } else {
    //   setBakerState("FALSE");
    // }

    const impulse = { x: 0, y: 0, z: 0 };
    if (jumpPressed && isOnFloor.current) {
      console.log("here!")
      impulse.y += JUMP_FORCE;
      isOnFloor.current = false;
    }

    const linvel = rigidbody.current.linvel();
    let changeRotation = false;
    if (rightPressed && linvel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (leftPressed && linvel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (backPressed && linvel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (forwardPressed && linvel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      changeRotation = true;
    }

    rigidbody.current.applyImpulse(impulse, true);

    if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
      if (characterState !== "Run") {
        setCharacterState("Run");
      }
    } else {
      if (characterState !== "Idle") {
        setCharacterState("Idle");
      }
    }

    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      character.current.rotation.y = angle;
    }

    // CAMERA FOLLOW
    const characterWorldPosition = character.current.getWorldPosition(
      new THREE.Vector3()
    );
    const targetCameraPosition = new THREE.Vector3(
      characterWorldPosition.x,
      0,
      characterWorldPosition.z + 14
    );
    if (gameState === gameStates.GAME || gameState === gameStates.FREEROAM) {
      targetCameraPosition.y = 9;
    }
    if (gameState !== gameStates.GAME && gameState !== gameStates.FREEROAM) {
      targetCameraPosition.y = 0;
    }

    state.camera.position.lerp(targetCameraPosition, delta * 2);

    const targetLookAt = new THREE.Vector3(
      characterWorldPosition.x,
      0,
      characterWorldPosition.z
    );

    const direction = new THREE.Vector3();
    state.camera.getWorldDirection(direction);

    const position = new THREE.Vector3();
    state.camera.getWorldPosition(position);

    const currentLookAt = position.clone().add(direction);
    const lerpedLookAt = new THREE.Vector3();

    lerpedLookAt.lerpVectors(currentLookAt, targetLookAt, delta * 2);

    state.camera.lookAt(lerpedLookAt);
  });

  const character = useRef();

  const resetPosition = () => {
    rigidbody.current.setTranslation(vec3({ x: 0, y: 0, z: 0 }));
    rigidbody.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }));
  };

  useEffect(
    () => useGameStore.subscribe((state) => state.currentStage, resetPosition),
    []
  );

  useEffect(
    () => useGameStore.subscribe((state) => state.wrongAnswers, resetPosition),
    []
  );

  return (
    <group>
      <RigidBody ref={rigidbody} colliders={false} scale={[0.5, 0.5, 0.5]} name={"mainCharacter"} enabledRotations={[false, false, false]} onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "void") {
            resetPosition();
            playAudio("fall");
          }
          // if (other.rigidBodyObject.name === "baker") { // Running into the baker shows the chatbox
          //   bakerTouched = true; 
          //   playAudio("fall");
          // }
        }}
        // onIntersectionExit={({ other }) => { // when player stops touching the baker, bakerTouched is false. 
        //   if (other.rigidBodyObject.name === "baker") {
        //     bakerTouched = false;
        //   }
        // }}
      >
        <CapsuleCollider args={[1, 1.2]} position={[0, 2.2, 0]} />
        <group ref={character}>
          <Character />
        </group>
      </RigidBody>
    </group>
  );
};
