// components/FreeRoamInstructions.js
import React from 'react';

export const FreeRoamInstructions = ({ handleStart }) => {
  return (
    <div style={{position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", background: "rgba(0, 0, 0, 0.8)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", textAlign: "center", zIndex: 10}}>
      <h2>Welcome to the Game!</h2>
      <p>Instructions: To progress in the game, you need to hold conversations in French with characters like the baker. Make sure your responses are more than just 'yes' or 'no' to move on to the next level and earn rewards. You will have 10 sentences to speak!</p>
      <button onClick={handleStart} style={{padding: "10px 20px", fontSize: "16px", cursor: "pointer", border: "none", borderRadius: "5px", background: "#4CAF50", color: "white", marginTop: "20px"}}>
        Start
      </button>
    </div>
  );
};
