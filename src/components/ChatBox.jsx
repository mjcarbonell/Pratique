import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from "../store";
import { TextToSpeech } from "./TextToSpeech";
import { GrammarCheck } from "./GrammarCheck"
import axios from 'axios';

let gradeResponse = '';
let gradeReason = '';

export const getPlayerScores = async () => {
  return [gradeResponse, gradeReason]; 
};

const ChatBox = (style) => {
  const {setChatState, bakerState, setBakerState, checklist } = useGameStore((state) => ({
    checklist: state.checklist,
    setChatState: state.setChatState,
    bakerState: state.bakerState,
    setBakerState: state.setBakerState,
  }));

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [count, setCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const messagesEndRef = useRef(null);
  const initialRender = useRef(true);


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
      TextToSpeech(message, user, bakerState, setBakerState);
    });
  };

  const sendMessage = async (message, user = 'Player') => {
    const newMessages = [...messages, { user, text: message }];
    await addMessageWithTypingEffect(message, user);
    const formattedMessages = [
      {
        role: "system",
        content: `Vous êtes un boulanger français qui ne parle que français. Vous serez nourri d’une conversation entre vous et quelqu’un d’autre. Si quelqu’un fait une erreur d’orthographe ou de grammaire, vous pouvez la corriger poliment. S'ils parlent anglais, vous devriez parler français avec un peu d'anglais mélangé et les encourager à parler davantage français dans la conversation. Vous trouverez ci-dessous un exemple des messages que vous recevrez. Vous êtes le système et le joueur est l'utilisateur.
        [
        {"role": "système", "content": "exemple"},
        {"role": "système", "content": "..."},
        {"role": "utilisateur", "content": "..."},
        {"role": "système", "content": "..."},
        {"role": "utilisateur", "content": "..."}
        ]»`
      },
      ...newMessages.map((msg) => ({
        role: msg.user === 'Player' ? 'user' : 'system',
        content: msg.text,
      }))
    ];
    setAttempts(attempts => attempts += 1); // add another attempt after sending a message
    if (attempts == 9){ // grade the conversation after 9 attempts
      const localGradeResponse = await GrammarCheck(newMessages);
      const localGradeList = localGradeResponse.split(':::');
      gradeResponse = localGradeList[0]; 
      gradeReason = localGradeList[1]; 
    }
    try {
      console.log("formatted messages: ", formattedMessages)
      const response = await axios.post('https://pratiquebackend-production.up.railway.app/api/openai', { messages: formattedMessages });
      const botMessage = response.data;
      await addMessageWithTypingEffect(botMessage, 'Baker');
    } catch (error) {
      console.error('Error fetching response from OpenAI API', error);
      await addMessageWithTypingEffect('Sorry, I am having trouble responding right now.', 'Baker');
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      const initialMessage = "Bonjour! Comment puis-je vous aider aujourd'hui?";
      addMessageWithTypingEffect(initialMessage, 'Baker');
    }
    console.log("checklist: ", checklist)
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

  const greenChecked = (index) => {
    console.log("green checked");
    setCheckedItems((prev) => {
      console.log("prev : ", prev);
      const newCheckedItems = [...prev];
      newCheckedItems[index] = true;
      console.log("new items: ", newCheckedItems);
      return newCheckedItems;
    });
  };
  
  return (
    <>
     <div className="checklist" style={{ position: 'fixed', top: '90px', left: '10px', backgroundColor: '#333', padding: '10px', borderRadius: '5px', color: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <p>Checklist:</p>
        <ol>
          {checklist.map((item, index) => (
            // Depending on if the checkedItems[Index] is true we used different css className
            <li key={index} className={`checklist-item ${checkedItems[index] ? 'checked' : ''}`}> 
              <span className="check-circle">{checkedItems[index] && '✔'}</span> {`Use the word "${item.word}" (${item.english})`}
            </li>
          ))}
        </ol>
      </div>

    <div className="chatbox-container" style={{ ...style, maxWidth: '400px' }}>
      
      <div className="chatbox-icon" style={{ position: 'absolute', top: '-5px', left: '-100px' }}>
        <img src={`/icons/baker${bakerState}.png`} alt="Portrait" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      </div>
      <div className="chatbox-messages" style={{ maxHeight: '300px', overflowY: 'auto', wordWrap: 'break-word' }}>
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
    </div>
    
    </>
    
  );
};

export default ChatBox;
