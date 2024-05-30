import React, { useState, useEffect } from 'react';
import { useGameStore } from "../store";
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const { setChatState } = useGameStore(
    (state) => ({
      setChatState: state.setChatState,
    })
  );

  // Function to send messages to the backend
  const sendMessage = async (message, user = 'Player') => {
    setMessages(prevMessages => [...prevMessages, { user, text: message }]);
    try {
      const response = await axios.post('https://pratiquebackend-production.up.railway.app/api/openai', { message });
      const botMessage = response.data;
      setMessages(prevMessages => [...prevMessages, { user: 'Baker', text: botMessage }]);
    } catch (error) {
      console.error('Error fetching response from OpenAI API', error);
      setMessages(prevMessages => [...prevMessages, { user: 'Baker', text: 'Sorry, I am having trouble responding right now.' }]);
    }
  };

  // Send initial greeting message from the baker when the component mounts
  useEffect(() => {
    const initialMessage = "Bonjour! Je suis votre boulanger français. Comment puis-je vous aider aujourd'hui?";
    setMessages(prevMessages => [...prevMessages, { user:'Baker', text: initialMessage }]);
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
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.user === 'Player' ? 'right' : 'left' }}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
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
