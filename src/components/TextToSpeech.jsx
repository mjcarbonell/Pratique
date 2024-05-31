import React from 'react';
import axios from 'axios';

export const TextToSpeech = async (text) => {
  try {
    const response = await axios.post('https://pratiquebackend-production.up.railway.app/api/tts', { text });
    const base64Audio = response.data.audioContent;

    const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
    audio.play();

  } catch (error) {
    console.error('Error fetching TTS response:', error);
  }
};