import { KeyboardControls, Loader, useFont, useProgress, OrbitControls  } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Leva } from "leva";
import { Suspense, useMemo, useState, useEffect } from "react";
import { Experience } from "./components/Experience";
import { ExperienceFreeRoam } from "./components/ExperienceFreeRoam";
import { Menu } from "./components/Menu";
import { gameStates, useGameStore } from "./store";
import { FreeRoamInstructions } from "./components/FreeRoamInstructions";
import { Badges } from "./components/Badges";
import ChatBox from "./components/ChatBox";

export const Controls = { forward: "forward", back: "back", left: "left", right: "right", jump: "jump" };

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const handleStart = () => {
    setHasStarted(true);
  };
  useFont.preload("./fonts/FrenchCanon.json");
  const { startGame, gameState, goToMenu, bakerState  } = useGameStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
    bakerState: state.bakerState,
  }));

  useEffect(() => {
    console.log("Current game state:", gameState);
    setHasStarted(false);
  }, [gameState]);

  // useEffect(() => { // when we used to toggle the chatbox when baker and player collided no more. 
  //   console.log("getting baker touch in app ", bakerState); 
  // }, [bakerState]);

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  const { progress } = useProgress();
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <KeyboardControls map={map}>
        <Leva hidden />
        <Canvas style={{ width: "100%", height: "100%" }} shadows camera={{ position: [2, 40, 14], fov: 42 }}>
          <color attach="background" args={["#e3daf7"]} />
          <fog attach="fog" args={["#dbecfb", 30, 40]} />
          <Suspense>
            <Physics >
              {(gameState === "GAME" || gameState === "MENU") && <Experience />}
              {gameState === "FREEROAM" && <ExperienceFreeRoam />}
            </Physics>
          </Suspense>
          {/* <OrbitControls /> */}
        </Canvas>
        <Loader />
        {progress === 100 && <Menu />}
      </KeyboardControls>
      {(gameState === "GAME" || gameState === "FREEROAM") && (
        <div style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1000 }}>
          <button onClick={goToMenu}>Back to Menu</button>
        </div>
      )}
      {(gameState === "FREEROAM" && hasStarted === false) && (
        <FreeRoamInstructions handleStart={handleStart} />
      )}
      {(gameState === "FREEROAM") && (  // Used to have  && bakerState === "TRUE"
        <ChatBox style={{ position: "fixed", top: "10px", right: "10px", zIndex: 2000 }} />
      )}
      {/* <Badges /> */}
    </div>
  );
}

export default App;
