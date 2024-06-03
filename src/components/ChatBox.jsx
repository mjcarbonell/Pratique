import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from "../store";
import { TextToSpeech } from "./TextToSpeech";
import { GrammarCheck } from "./GrammarCheck"
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
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
        content: `Vous êtes un boulanger français qui ne parle que français. Tout ce qui vous sera dit proviendra de quelqu'un qui essaie d'apprendre le français. S'ils peuvent donner 4 réponses grammaticalement correctes et qui sont plus que de simples réponses « oui ou non », vous pouvez dire « TRUE » sur votre 5ème réponse. S'ils ne remplissent pas les conditions, vous pouvez dire « FALSE » lors de votre 5ème réponse. Vous trouverez ci-dessous un exemple des messages que vous recevrez. Lorsque vous voyez que l'utilisateur a envoyé 4 messages, vous pouvez dire « TRUE » ou « FALSE ».
        [
          {"role": "system", "content": "exemple"},
          {"role": "system", "contenu": "..."},
          {"role": "user", "contenu": "..."},
          {"role": "system", "contenu": "..."},
          {"role": "user", "contenu": "..."}
        ]`
      },
      ...newMessages.map((msg) => ({
        role: msg.user === 'Player' ? 'user' : 'system',
        content: msg.text,
      }))
    ];
    console.log("formatted chat: ", formattedMessages);
    if (attempts >= 0){ // at 10 attempts we grade the conversation 
      const gradeResponse = GrammarCheck(newMessages);
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
  
  // useEffect(() => {
  //   if (attempts == 1){ // at 10 attempts we grade the conversation 
  //     GrammarCheck(messages);
  //   }
  //   return; 
  // }, [attempts]);

  const handleSend = () => {
    if (input.trim() !== '') {
      const userInput = input;
      setInput('');
      setAttempts(attempts => attempts += 1); // Increment the attempts counter
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
          Send ({attempts})
        </button>
      </div>
      <div className="attempts-counter">
        Attempts: {attempts} / 10
      </div>
    </div>
  );
};

export default ChatBox;
