import React from 'react';
import axios from 'axios';

export const TextToSpeech = async (text, voice, bakerState, setBakerState) => {
  try {
    const response = await axios.post('https://pratiquebackend-production.up.railway.app/api/tts', { text, voice });
    const base64Audio = response.data.audioContent;

    const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
    audio.play();
    if (voice == "Baker") {
      let randomState;
      do {
        randomState = Math.floor(Math.random() * 5); // Random number between 0 and 4
      } while (randomState === bakerState);
      setBakerState(randomState);
    }
  } catch (error) {
    console.error('Error fetching TTS response:', error);
  }
};
