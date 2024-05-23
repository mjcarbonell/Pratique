import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { frenchWords } from "./frenchWords"



export const useGameStoreRoam = create(
    subscribeWithSelector((set, get) => ({
      level: null,
      mode: "default",
      
      startGameRoam: ({ mode }) => {
        console.log("in roaming store");
        const level = [1, 2, 3]; 
        set({
          level,
          mode,
        });
      },

      goToMenuRoam: () => {
        set({
          gameState: gameStates.MENU,
        });
      },

      // CHARACTER CONTROLLER
      characterState: "Idle",
      setCharacterState: (characterState) =>
        set({
          characterState,
        }),
    }))
  );