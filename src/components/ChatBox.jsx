import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from "../store";
import { TextToSpeech } from "./TextToSpeech";
import { GrammarCheck } from "./GrammarCheck"
import axios from 'axios';

let gradeResponse = '';
let gradeReason = '';
let totalXP = null; 
export const getPlayerScores = async () => {
  return [gradeResponse, gradeReason]; 
};

const ChatBox = (style) => {
  const {setChatState, bakerState, setBakerState, levelFreeRoam, setGameState, setGrade } = useGameStore((state) => ({
    levelFreeRoam: state.levelFreeRoam,
    setChatState: state.setChatState,
    bakerState: state.bakerState,
    setBakerState: state.setBakerState,
    setGameState: state.setGameState,
    setGrade: state.setGrade, 
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
    console.log("message: ", message)
    for(let i=0; i < levelFreeRoam[0].length; i++){
      console.log("CHECKLIST[i].word: ", levelFreeRoam[0][i].word);
      if(message.includes(levelFreeRoam[0][i].word)){
        greenChecked(i, levelFreeRoam[1][i]);
      }
    }
    const newAttempts = attempts + 1; 
    setAttempts(newAttempts); // add another attempt after sending a message
    if(newAttempts == 2){
        const localGradeResponse = await GrammarCheck(newMessages);
        const localGradeList = localGradeResponse.split(':::');
        gradeResponse = localGradeList[0]; 
        gradeReason = localGradeList[1]; 
        setGrade([gradeResponse, gradeReason, totalXP]); 
        return; 
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
      const firstMessages = ["Bonjour! ", "Salut...", "Coucou ", "Allô", "Bon matin" ]
      const initialMessage = firstMessages[Math.floor(Math.random() * 5)]; // Random number between 0 and 4
      addMessageWithTypingEffect(initialMessage, 'Baker');
    }
    console.log("levelFreeRoam: ", levelFreeRoam)
  }, []);
  useEffect(() => {
    const endGame = async () => {
      if(attempts === 2){ // at 10 attempts we end the game. 
        await addMessageWithTypingEffect("Game Over. Thank you for playing!", 'Baker');
        // additional code to handle end of game
        setGameState("GAME_OVER_FREEROAM"); 
        setChatState("FALSE")
      }
    };
    endGame();
  }, [attempts]);
  
  const handleSend = () => {
    if (input.trim() !== '') {
      const userInput = input;
      setInput('');
      sendMessage(userInput, 'Player');
    }
  };
  const handleFocus = () => setChatState({ mode: "TRUE" });
  const handleBlur = () => setChatState({ mode: "FALSE" });

  const greenChecked = (index, wordXP) => {
    setCheckedItems((prev) => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = true;
      return newCheckedItems;
    });
    console.log("wordXP: ", wordXP)
    let temp = totalXP; 
    totalXP = temp + wordXP; 
  };
  
  return (
    <>
     <div className="checklist" style={{ position: 'fixed', top: '90px', left: '10px', backgroundColor: '#333', padding: '10px', borderRadius: '5px', color: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <p>Checklist:</p>
        <ol>
          {levelFreeRoam[0].map((item, index) => (
            // Depending on if the checkedItems[Index] is true we used different css className
            <li key={index} className={`checklist-item ${checkedItems[index] ? 'checked' : ''}`}> 
              <span className="check-circle">{checkedItems[index] && '✔'}</span> {`Use the word "${item.word}" (${item.english}) +${levelFreeRoam[1][index]}`}
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
