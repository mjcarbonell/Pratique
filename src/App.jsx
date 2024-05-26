import { KeyboardControls, Loader, useFont, useProgress, Text, Html,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Leva } from "leva";
import { Suspense, useMemo, useEffect  } from "react";
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
  useFont.preload("./fonts/FrenchCanon.json");
  const { startGame, gameState, goToMenu } = useGameStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
  }));
  useEffect(() => {
    console.log("Current game state:", gameState);
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
    <KeyboardControls map={map}>
      <Leva hidden />
      <Canvas shadows camera={{ position: [0, 20, 14], fov: 42 }}>
        <color attach="background" args={["#e3daf7"]} />
        <Suspense>
          <Physics>
              {(gameState === "GAME" || gameState === "FREEROAM") && (
                <group position position-x={-5} position-y={4}>
                  <Html>
                    <div>
                      <button onClick={goToMenu} >
                        Back to Menu Test
                      </button>
                    </div>
                  </Html>
                </group>
              )} 
              {(gameState === "GAME" || gameState === "MENU") && <Experience />}
              {gameState === "FREEROAM" && (
                // <Text
                //   position={[0, 5, 0]}
                //   fontSize={2}
                //   color="black"
                //   anchorX="center"
                //   anchorY="middle"
                // >
                //   Free Roam
                // </Text>
                <ExperienceFreeRoam />
              )}
           </Physics>
        </Suspense>
      </Canvas>
      <Loader />
      {progress === 100 && <Menu />}
      <Menu />
    </KeyboardControls>
  );
}

export default App;
