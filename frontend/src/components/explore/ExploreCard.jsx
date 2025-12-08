// src/components/explore/ExploreCard.jsx
import React from 'react';
import LikeButton from './LikeButton';

const ExploreCard = ({ item, type }) => {
  const isPlan = type === 'plan';
  
  return (
    <div className={isPlan ? 'plan-card' : 'user-card'}>
      <div className={isPlan ? 'plan-image' : 'user-image'} style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)' }} />
      
      <div className="plan-info">
        <h3>{isPlan ? item.title : item.name}</h3>
        <p>{isPlan ? item.duration : item.info}</p>
      </div>

      <LikeButton itemId={item.id} type={type} />
    </div>
  );
};

export default ExploreCard;