import React, { useState, useEffect, useRef } from 'react';
import { getPlayerScores } from './ChatBox';
const badges = [
  { id: 1, name: 'Baker', icon: '/icons/bakerBadge.png' },
  { id: 2, name: 'Cook', icon: '/icons/cookBadge.png' },
  { id: 3, name: 'Florist', icon: '/icons/floristBadge.png' },
];

export const Badges = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [scores, setScores] = useState([]);
  
  useEffect(() => {
    const fetchScores = async () => {
      const scoresResponse = await getPlayerScores();
      setScores(scoresResponse); 
      console.log("Scores:", scores);
      console.log("SCORES[0]: ", scores[0])
    };
    fetchScores();
  }, [showOverlay]);

  const handleBadgeClick = (badgeId) => {
    if (badgeId === 1) {
      setShowOverlay(true);
    }
  };
  const closeOverlay = () => {
    setShowOverlay(false);
  };
  return (
    <div>
      <div style={{position: 'fixed',bottom: '10px',left: '10px',background: 'rgba(255, 255, 255, 0.9)',padding: '15px',borderRadius: '10px',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
        <h3 style={{margin: '0 0 10px 0',fontSize: '18px',fontWeight: 'bold', color: 'black',}}>Badges</h3>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>
          {badges.map(badge => (
            <div key={badge.id} onClick={() => handleBadgeClick(badge.id)}style={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',width: '100px',height: '100px',
                padding: '10px',border: '2px solid #ddd',borderRadius: '10px',background: '#fff',cursor: 'pointer',}}>
              <img src={badge.icon} alt={badge.name} style={{ width: '100%', height: '100%', objectFit: 'contain', marginBottom: '5px' }} />
            </div>
          ))}
        </div>
      </div>

      {showOverlay && (
        <div style={{position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", background: "rgba(0, 0, 0, 0.8)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", textAlign: "center", zIndex: 10}}>
          <h3>Scores:</h3>
            <div>Scores: {scores[0]}</div>
            <div>Feedback: {scores[1]}</div>
          <button onClick={closeOverlay} style={{padding: '10px 20px',marginTop: '20px',fontSize: '16px',cursor: 'pointer',border: 'none',borderRadius: '5px',background: '#4CAF50',color: 'white',}}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};
