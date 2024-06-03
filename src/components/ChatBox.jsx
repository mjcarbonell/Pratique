import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from "../store";
import { TextToSpeech } from "./TextToSpeech";
import { GrammarCheck } from "./GrammarCheck"
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gradeResponse, setGradeResponse] = useState(''); 
  const messagesEndRef = useRef(null);

  const { setChatState } = useGameStore(
    (state) => ({
      setChatState: state.setChatState,
    })
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessageWithTypingEffect = (message, user) => {
    return new Promise((resolve) => {
      let currentText = '';
      setMessages(prevMessages => [...prevMessages, { user, text: currentText }]);
      let index = 0;
      const interval = setInterval(() => {
        if (index < message.length) {
          currentText += message.charAt(index);
          setMessages(prevMessages => prevMessages.map((msg, i) => 
            i === prevMessages.length - 1 ? { ...msg, text: currentText } : msg
          ));
          index++;
          scrollToBottom();
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 50);
      TextToSpeech(message, user);
    });
  };

  const sendMessage = async (message, user = 'Player') => {
    const newMessages = [...messages, { user, text: message }]; // Stack the message with the past messages between Player and NPC. 
    await addMessageWithTypingEffect(message, user);
    
    // Prepare the formatted messages for the API call
    const formattedMessages = [
      {
        role: "system",
        content: "Vous êtes un boulanger français qui ne parle que français. Tout ce qu’on vous dira viendra de quelqu’un qui essaie d’apprendre le français. Vous ne comprenez pas l'anglaisVous êtes un boulanger français qui ne parle que français. Tout ce qu’on vous dira viendra de quelqu’un qui essaie d’apprendre le français. Vous ne comprenez pas l'anglais. S'ils parlent anglais, vous devez agir comme si vous ne compreniez pas."
        // [
        //   {"role": "system", "content": "exemple"},
        //   {"role": "system", "contenu": "..."},
        //   {"role": "user", "contenu": "..."},
        //   {"role": "system", "contenu": "..."},
        //   {"role": "user", "contenu": "..."}
        // ]`
      },
      ...newMessages.map((msg) => ({
        role: msg.user === 'Player' ? 'user' : 'system',
        content: msg.text,
      }))
    ];
    setAttempts(attempts => attempts += 1); // Increment the attempts counter
    if (attempts == 2){ // when they  attempts we grade the conversation 
      const localGradeResponse = await GrammarCheck(newMessages);
      setGradeResponse(localGradeResponse); ``
      console.log(localGradeResponse); 
    }
    try {
      const response = await axios.post('https://pratiquebackend-production.up.railway.app/api/openai', { messages: formattedMessages });
      const botMessage = response.data;
      await addMessageWithTypingEffect(botMessage, 'Baker');
    } catch (error) {
      console.error('Error fetching response from OpenAI API', error);
      await addMessageWithTypingEffect('Sorry, I am having trouble responding right now.', 'Baker');
    }
  };

  useEffect(() => {
    const initialMessage = "Bonjour! Comment puis-je vous aider aujourd'hui?";
    addMessageWithTypingEffect(initialMessage, 'Baker');
  }, []);
  
  const handleSend = () => {
    if (input.trim() !== '') {
      const userInput = input;
      setInput('');
      sendMessage(userInput, 'Player');
    }
  };

  const handleFocus = () => setChatState({ mode: "TRUE" });
  const handleBlur = () => setChatState({ mode: "FALSE" });

  return (
    <div className="chatbox-container">
      <div className="chatbox-messages" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.user === 'Player' ? 'right' : 'left' }}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbox-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="chatbox-input"
        />
        <button onClick={handleSend} className="chatbox-button">
          Send
        </button>
      </div>
      <div className="attempts-counter">
        Attempts: {attempts} / 10
      </div>
      <div className="attempts-counter">
        Score: {gradeResponse}
      </div>
    </div>
  );
};

export default ChatBox;
