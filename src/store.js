import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { frenchWords } from "./frenchWords"

export const gameStates = {
  MENU: "MENU",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER",
  FREEROAM: "FREEROAM",
};

export const playAudio = (path, callback) => {
  const audio = new Audio(`./sounds/${path}.mp3`);
  if (callback) {
    audio.addEventListener("ended", callback);
  }
  audio.play();
};

export const generateGameLevel = ({ nbStages }) => {
  const level = [];
  const goodKanas = [];

  for (let i = 0; i < nbStages; i++) {
    const stage = [];
    const nbOptions = 3 + i;
    for (let j = 0; j < nbOptions; j++) {
      let kana = null;
      while (!kana || stage.includes(kana) || goodKanas.includes(kana)) {
        kana = frenchWords[Math.floor(Math.random() * frenchWords.length)];
      }
      stage.push(kana);
    }
    const goodKana = stage[Math.floor(Math.random() * stage.length)];
    goodKana.correct = true;
    goodKanas.push(goodKana);
    level.push(stage);
  }
  return level;
};

export const useGameStore = create(
  subscribeWithSelector((set, get) => ({
    level: null,
    currentStage: 0,
    currentKana: null,
    lastWrongKana: null,
    mode: "default",
    gameState: gameStates.MENU,
    chatState: "FALSE",
    bakerState: "FALSE", 
    setBakerState: (state) => set({ bakerState: state }),
    wrongAnswers: 0,


    // VOCAB GAME 
    startGame: ({ mode }) => {
      const level = generateGameLevel({ nbStages: 5 });
      const currentKana = level[0].find((word) => word.correct);
      playAudio("start", () => {
        playAudio(`frenchWords/${currentKana.word}`);
      });
      console.log(currentKana.word.length);
      set({
        level,
        currentStage: 0,
        currentKana,
        gameState: gameStates.GAME,
        mode,
        wrongAnswers: 0,
      });
    },
    nextStage: () => {
      set((state) => {
        if (state.currentStage + 1 === state.level.length) { // If it is the last stage 
          playAudio("toutes nos félicitations");
          return {
            currentStage: 0,
            currentKana: null,
            level: null,
            gameState: gameStates.GAME_OVER,
            lastWrongKana: null,
          };
        }
        // If it is not the last stage. We prepare for next word

        const currentStage = state.currentStage + 1;
        const currentKana = state.level[currentStage].find(
          (word) => word.correct
        );
        playAudio(`correct${currentStage % 3}`, () => {
          playAudio(`frenchWords/${currentKana.word}`);
        });
        return { currentStage, currentKana, lastWrongKana: null };
      });
    },
    goToMenu: () => {
      set({
        gameState: gameStates.MENU,
      });
    },
    kanaTouched: (kana) => {
      const currentKana = get().currentKana;
      if (currentKana.word === kana.word) {
        get().nextStage();
      } else {
        playAudio("pas correcte");
        set((state) => ({
          wrongAnswers: state.wrongAnswers + 1,
          lastWrongKana: kana,
        }));
      }
    },
    // CHARACTER CONTROLLER
    characterState: "Idle",
    setCharacterState: (characterState) =>
      set({
        characterState,
      }),
    startFreeRoam: ({ mode }) => { 
      console.log(mode)
      playAudio("start"); 
      set({
        gameState: gameStates.FREEROAM,
        mode,
      });
    },
    setChatState: ({ mode }) => { // mode can be "TRUE" or "FALSE"
      set({
        chatState: mode,
      });
    }

  }))
);
