import { gameStates, useGameStore } from "../store";

export const Menu = () => {
  const { startGame, startFreeRoam, gameState, goToMenu } = useGameStore((state) => ({
    startGame: state.startGame,
    startFreeRoam: state.startFreeRoam,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
  }));

  return (
    <>
      {/* We hide the menu if we are not in menu state */}
      <div className={`menu ${  gameState !== gameStates.MENU ? "menu--hidden" : ""}`}> 
        <div>
          <h1>Pratique Game</h1>
          <p>HEY, WELCOME TO PRATIQUE! MORE MODES COMING SOON. :)</p>
        </div>
        {/* disables the button unless game state is in menu  */}
        <button disabled={gameState !== gameStates.MENU} onClick={() => startGame({ mode: "default" })}>
          Start Vocab Game
        </button>
         {/* disables the button unless game state is in menu  */}
        
        <button disabled={gameState !== gameStates.MENU} onClick={() => startFreeRoam({ mode: "freeRoam" })}>
          Start FreeRoam Game
        </button>
        
        <div>
          <p>
            Made with 💙 by{" Maxim Carbonell-Kiamtia "}
            <a href="https://mjcarbonell.github.io/" target="_blank">
              Portfolio
            </a>
            , 3D models from{" "}
            <a href="https://poly.pizza/" target="_blank">
              Polly Pizza
            </a>
          </p>
        </div>
      </div>
      {/* This button is disabled unless we are in GAME_OVER state */}
      <div className={`scores ${ (gameState !== gameStates.GAME_OVER) ? "scores--hidden" : ""}`}>
        <h1>toutes nos félicitations</h1>
        <button onClick={goToMenu} disabled={gameState !== gameStates.GAME_OVER}> 
          Go to Menu
        </button>
      </div>
    </>
  );
};
