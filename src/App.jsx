import { KeyboardControls, Loader, useFont, useProgress, Text, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Leva } from "leva";
import { Suspense, useMemo, useState, useEffect } from "react";
import { Experience } from "./components/Experience";
import { ExperienceFreeRoam } from "./components/ExperienceFreeRoam";
import { Menu } from "./components/Menu";
import { gameStates, useGameStore } from "./store";


export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const handleStart = () => {
    setHasStarted(true)
  };
  useFont.preload("./fonts/FrenchCanon.json");
  const { startGame, gameState, goToMenu } = useGameStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
  }));

  useEffect(() => { // Gets called whenever gameState changes  
    console.log("Current game state:", gameState);
    setHasStarted(false); 
  }, [gameState]);

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
        <Canvas style={{ width: "100%", height: "100%" }} shadows camera={{ position: [0, 20, 14], fov: 42 }}>
          <color attach="background" args={["#e3daf7"]} />
          <Suspense>
            <Physics>
              {(gameState === "GAME" || gameState === "MENU") && <Experience />}
              {gameState === "FREEROAM" && <ExperienceFreeRoam />}
            </Physics>
          </Suspense>
        </Canvas>
        <Loader />
        {progress === 100 && <Menu />}
        <Menu />
      </KeyboardControls>
      {/* Menu button */}
      {(gameState === "GAME" || gameState === "FREEROAM") && (
        <div style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1000 }}>
          <button onClick={goToMenu}>Back to Menu Test</button>
        </div>
      )}
      {/* Instructions for freeRoam level. If gameState is FREEROAM and hasStarted is false we show it.  */}
      {(gameState === "FREEROAM" && hasStarted === false) && (
        <div style={{position: "fixed",top: "0",left: "0",width: "100vw",height: "100vh",background: "rgba(0, 0, 0, 0.8)",display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",color: "white",textAlign: "center",zIndex: 10}}>
        <h2>Welcome to the Game!</h2>
        <p>Instructions: To progress in the game, you need to hold conversations in French with characters like the baker. Make sure your responses are more than just 'yes' or 'no' to move on to the next level and earn rewards.</p>
        <button onClick={handleStart}style={{padding: "10px 20px", fontSize: "16px", cursor: "pointer",border: "none",borderRadius: "5px",background: "#4CAF50",color: "white",marginTop: "20px"}}>
          Start
        </button>
      </div>
      )}
    </div>
  );
}

export default App;
