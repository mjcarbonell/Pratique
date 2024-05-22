import { gameStates, useGameStore } from "../store";

export const Menu = () => {
  const { startGame, gameState, goToMenu } = useGameStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
  }));
  return (
    <>
      <div
        className={`menu ${
          gameState !== gameStates.MENU ? "menu--hidden" : ""
        }`}
      >
        <div>
          <h1>Pratique Game</h1>
          <p>What do you want to practice today? (more modes coming soon)</p>
        </div>
        <button
          disabled={gameState !== gameStates.MENU}
          onClick={() => startGame({ mode: "default" })}
        >
          Start Vocab Game
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
