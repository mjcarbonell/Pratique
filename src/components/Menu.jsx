import { gameStates, useGameStore } from "../store";
import { useGameStoreRoam } from "../storeRoam"; 

export const Menu = () => {
  const { startGame, gameState, goToMenu } = useGameStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
  }));

  const { startGameRoam, goToMenuRoam } = useGameStoreRoam((state) => ({
    startGameRoam: state.startGameRoam,
    goToMenuRoam: state.goToMenuRoam,
  }));


  return (
    <>
      {/* We hide the menu if we are not in menu state */}
      <div className={`menu ${  gameState !== gameStates.MENU ? "menu--hidden" : ""}`}> 
        <div>
          <h1>Pratique Game</h1>
          <p>HEY, WELCOME TO PRATIQUE! MORE MODES COMING SOON. :) New Character</p>
        </div>
        {/* disables the button unless game state is in menu  */}
        <button disabled={gameState !== gameStates.MENU} onClick={() => startGame({ mode: "default" })}>
          Start Vocab Game
        </button>
         {/* disables the button unless game state is in menu  */}
        
        {/* <button disabled={gameState !== gameStates.MENU} onClick={() => startGameRoam({ mode: "freeRoam" })}>
          Start FreeRoam Game
        </button> */}
        
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
      <div
        className={`scores ${
          gameState !== gameStates.GAME_OVER ? "scores--hidden" : ""
        }`}
      >
        <h1>félicitations, tu apprends</h1>
        <button
          onClick={goToMenu}
          disabled={gameState !== gameStates.GAME_OVER}
        >
          Play again
        </button>
      </div>
    </>
  );
};
