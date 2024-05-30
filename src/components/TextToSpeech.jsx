export const TextToSpeech = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);

  const setVoiceAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    console.log("Available Voices:", voices.map((voice, index) => ({
      index,
      name: voice.name,
      lang: voice.lang,
    })));

    // Select a French voice if available
    // const frenchVoice = voices.find(voice => voice.lang.startsWith('fr'));
    const frenchVoice = voices[12];
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    } else if (voices.length > 0) {
      utterance.voice = voices[0];
    }

    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
  } else {
    setVoiceAndSpeak();
  }
};
