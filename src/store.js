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

  for (let i = 0; i < nbStages; i++) { // for every i up until specified stages (usually 7)
    const stage = []; // define stage. An array
    const nbOptions = 3 + i; // define options to be 3 + the current stage e.g. 0, 1, 2, 3... (Basically the first stage starts with 3 the second stage starts with 4)
    for (let j = 0; j < nbOptions; j++) { // for every j up until options (usually 10 because stages is usally 7). 
      let kana = null; // define kana to be null 
      while (!kana || stage.includes(kana) || goodKanas.includes(kana)) { // While loop to ensure we pick a random kana that 1. exist 2. is not in the stage already 3. is not in the good kanas. 
        kana = frenchWords[Math.floor(Math.random() * frenchWords.length)]; // kana will be defined as one of the random french words. 
      }
      stage.push(kana); // We push the kana when it fulfilles all conditions 
    }
    const goodKana = stage[Math.floor(Math.random() * stage.length)]; // We define a goodKana for every stage 
    goodKana.correct = true; // set it's correct variable to true. 
    goodKanas.push(goodKana);
    level.push(stage);
  }
  return level;
};
export const generateFreeRoam = () => {
  const level = []; // what we are returning;
  const checklist = []
  // we want a checklist of 3 randomly selected words
  for(let i=0; i < 3; i++){
    let word = null; 
    while(!word || checklist.includes(word)){
      word = frenchWords[Math.floor(Math.random() * frenchWords.length)];
    }
    checklist.push(word);
  }
  level.push(checklist);
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
    wrongAnswers: 0,
    // FOR FREE ROAM
    chatState: "FALSE",
    bakerState: 0, 
    grade: [], 
    setBakerState: (state) => set({ bakerState: state }),
    setGameState: (state) => set({ gameState: state }),
    setGrade: (state) => set({ grade: state }),
    checklist: [],



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
    // FREEROAM
    startFreeRoam: ({ mode }) => { 
      playAudio("start");
      const level = generateFreeRoam(); // level contains necessary information. level[0] is the checklist 
      set({
        gameState: gameStates.FREEROAM,
        mode,
        checklist: level[0],
      });
    },
    setChatState: ({ mode }) => { // mode can be "TRUE" or "FALSE"
      set({
        chatState: mode,
      });
    }

  }))
);
