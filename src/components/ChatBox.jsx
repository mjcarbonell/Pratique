import React, { useState } from 'react';
import { useGameStore } from "../store";


const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  const { setChatState } = useGameStore(
    (state) => ({
      setChatState: state.setChatState,
    })
  );

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { user: 'Player', text: input }]);
      setInput('');
      // Simulate a response from the Baker
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { user: 'Baker', text: 'Hello, how can I help you?' }]);
      }, 1000);
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
