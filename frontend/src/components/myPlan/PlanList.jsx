import React, { useState } from 'react';
import PlanCard from './PlanCard';
import './PlanList.css';

const PlanList = ({ plans = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = plans.filter(item => {
    const search = searchTerm.toLowerCase();
    const text = (item?.title || '').toLowerCase();
    return text.includes(search);
  });

  return (
    <div className="planlist-wrapper">
      <div className="planlist-container">
        <div className="planlist-header">
          <h1 className="planlist-title">All Plans</h1>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <div className="planlist-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="plan-card-wrapper">
                <PlanCard
                  item={item}
                  onClick={(plan) => console.log('Navigate to:', plan.id)}
                />
              </div>
            ))
          ) : (
            <div className="no-results">
              {searchTerm
                ? `No results found for "${searchTerm}"`
                : 'No plans available yet.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanList;