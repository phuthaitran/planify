import React from 'react';
import LikeButton from './LikeButton';
import './PlanCard.css';

const PlanCard = ({ item, onClick }) => {
  return (
    <div className="plan-card" onClick={() => onClick && onClick(item)}>
      <div className="card-image" />
      <div className="card-info">
        <h3>{item.title}</h3>
        <p>{item.duration}</p>
      </div>
      <LikeButton itemId={item.id} />
    </div>
  );
};

export default PlanCard;