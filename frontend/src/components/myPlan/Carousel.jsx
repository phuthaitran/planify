import React, { useState, useEffect, useRef } from 'react';
import PlanCard from './PlanCard';
import ViewMoreButton from './ViewMoreButton';
import './Carousel.css';

const Carousel = ({ title, items, onViewMore }) => {
  const [offset, setOffset] = useState(0);
  const wrapperRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(3);

  const CARD_WIDTH = 240;
  const GAP = 20;
  const ITEM_TOTAL_WIDTH = CARD_WIDTH + GAP;

  useEffect(() => {
    const calculateVisible = () => {
      if (wrapperRef.current) {
        const width = wrapperRef.current.offsetWidth;
        const calculated = Math.floor(width / ITEM_TOTAL_WIDTH);
        setVisibleItems(Math.max(1, Math.min(calculated, 3)));
      }
    };
    calculateVisible();
    window.addEventListener('resize', calculateVisible);
    return () => window.removeEventListener('resize', calculateVisible);
  }, []);

  const maxOffset = Math.max(0, items.length - visibleItems);
  const hasPrev = offset > 0;
  const hasNext = offset < maxOffset;

  if (items.length === 0) return null;

  return (
    <div className="carousel-box">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {onViewMore && items.length > 0 && (
          <ViewMoreButton onClick={onViewMore}>
            View More →
          </ViewMoreButton>
        )}
      </div>

      <div className={`carousel ${hasPrev ? 'has-prev' : ''} ${hasNext ? 'has-next' : ''}`}>
        {hasPrev && (
          <button
            className="nav-btn left"
            onClick={() => setOffset(Math.max(0, offset - 1))}
          >
            ←
          </button>
        )}

        {hasNext && (
          <button
            className="nav-btn right"
            onClick={() => setOffset(Math.min(maxOffset, offset + 1))}
          >
            →
          </button>
        )}

        <div className="carousel-wrapper" ref={wrapperRef}>
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${offset * ITEM_TOTAL_WIDTH}px)` }}
          >
            {items.map(item => (
              <PlanCard
                key={item.id}
                item={item}
                onClick={(plan) => console.log('Navigate to:', plan.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;