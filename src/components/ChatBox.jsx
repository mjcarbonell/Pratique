import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from "../store";
import { TextToSpeech } from "./TextToSpeech";
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
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
    await addMessageWithTypingEffect(message, user);
    try {
      const response = await axios.post('https://pratiquebackend-production.up.railway.app/api/openai', { message });
      const botMessage = response.data;
      await addMessageWithTypingEffect(botMessage, 'Baker');
    } catch (error) {
      console.error('Error fetching response from OpenAI API', error);
      await addMessageWithTypingEffect('Sorry, I am having trouble responding right now.', 'Baker');
    }
  };

  useEffect(() => {
    const initialMessage = "Bonjour! Je suis votre boulanger français. Comment puis-je vous aider aujourd'hui?";
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
    </div>
  );
};

export default ChatBox;
