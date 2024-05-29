import React, { useState } from 'react';
import { useGameStore } from "../store";
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const openAIKey = import.meta.env.VITE_OPENAI_KEY;

  const { setChatState } = useGameStore(
    (state) => ({
      setChatState: state.setChatState,
    })
  );

  const handleSend = async () => {
    console.log(import.meta.env); // This should print all environment variables prefixed with VITE_

    if (input.trim() !== '') {
      setMessages([...messages, { user: 'Player', text: input }]);
      const userInput = input;
      setInput('');
      
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-4', // You can use 'gpt-3.5-turbo' or another model if you prefer
          messages: [{ role: 'user', content: userInput }],
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAIKey}`, // Replace with your actual OpenAI API key
          }
        });
        
        const botMessage = response.data.choices[0].message.content;
        setMessages(prevMessages => [...prevMessages, { user: 'Baker', text: botMessage }]);
      } catch (error) {
        console.error('Error fetching response from OpenAI API', error);
        setMessages(prevMessages => [...prevMessages, { user: 'Baker', text: 'Sorry, I am having trouble responding right now.' }]);
      }
    }
  };

  const handleFocus = () => setChatState( {mode: "TRUE"} );
  const handleBlur = () => setChatState({mode: "FALSE"});
  
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