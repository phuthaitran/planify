// src/components/explore/ExploreCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import ExploreCard from './ExploreCard';
import ViewMoreButton from './ViewMoreButton';

import PrevIcon from '../../assets/icons/PreviousBtn.svg';
import NextIcon from '../../assets/icons/NextBtn.svg';

const ExploreCarousel = ({ title, items, type }) => {
  const [offset, setOffset] = useState(0);
  const wrapperRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(5);

  const CARD_WIDTH = 240;
  const GAP = 24;
  const ITEM_TOTAL_WIDTH = CARD_WIDTH + GAP;

  // Tính số item hiển thị dựa trên width thực tế
  useEffect(() => {
    const calculateVisible = () => {
      if (wrapperRef.current) {
        const width = wrapperRef.current.offsetWidth;
        setVisibleItems(Math.floor(width / ITEM_TOTAL_WIDTH));
      }
    };

    calculateVisible();
    window.addEventListener('resize', calculateVisible);
    return () => window.removeEventListener('resize', calculateVisible);
  }, []);

  const maxOffset = Math.max(0, items.length - visibleItems);
  const hasPrev = offset > 0;
  const hasNext = offset < maxOffset;

  return (
    <div className="carousel-box">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <ViewMoreButton />
      </div>

      <div className="carousel" data-has-prev={hasPrev} data-has-next={hasNext}>
        {hasPrev && (
          <button className="nav-btn left" onClick={() => setOffset(Math.max(0, offset - 1))}>
            <img src={PrevIcon} className="w-5 h-5 " />
          </button>
        )}
        {hasNext && (
          <button className="nav-btn right" onClick={() => setOffset(Math.min(maxOffset, offset + 1))}>
            <img src={NextIcon} className="w-3 h-3 " />
          </button>
        )}

        <div className="carousel-wrapper" ref={wrapperRef}>
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${offset * ITEM_TOTAL_WIDTH}px)` }}
          >
            {items.map(item => (
              <ExploreCard key={item.id} item={item} type={type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCarousel;