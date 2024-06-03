// components/Badges.js
import React from 'react';

const badges = [
  { id: 1, name: 'Beginner', icon: '/icons/bakerBadge.png' },
  { id: 2, name: 'Intermediate', icon: '/icons/cookBadge.png' },
  { id: 3, name: 'Advanced', icon: '/icons/floristBadge.png' },
];

export const Badges = () => {
    return (
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h3 style={{
          margin: '0 0 10px 0',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>Badges</h3>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>
          {badges.map(badge => (
            <div key={badge.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '10px',
              background: '#fff',
            }}>
              <img src={badge.icon} alt={badge.name} style={{ width: '100%', height: '100%', objectFit: 'contain', marginBottom: '5px' }} />
            </div>
          ))}
        </div>
      </div>
    );
  };