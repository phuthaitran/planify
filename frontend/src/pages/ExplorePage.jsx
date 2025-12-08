// src/pages/ExplorePage.jsx

import React, { useState } from 'react';

import ExploreHeader from '../components/explore/ExploreHeader';
import ExploreTags from '../components/explore/ExploreTags';
import ExploreCarousel from '../components/explore/ExploreCarousel';

//mockData
import { plansData, usersData } from '../components/explore/data/mockData';


import './ExplorePage.css';


const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState('subject');
  const [pinnedTags, setPinnedTags] = useState([]);

  const handlePinTag = (tag) => {
    if (!pinnedTags.includes(tag)) setPinnedTags([...pinnedTags, tag]);
  };

  const handleUnpinTag = (tag) => {
    setPinnedTags(pinnedTags.filter(t => t !== tag));
  };

  return (
    <div className="explore-page">
      <ExploreHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <ExploreTags
        activeTab={activeTab}
        pinnedTags={pinnedTags}
        onPin={handlePinTag}
        onUnpin={handleUnpinTag}
      />

      <ExploreCarousel
        title="Plan"
        items={plansData}
        type="plan"
      />

      <ExploreCarousel
        title="User"
        items={usersData}
        type="user"
      />
    </div>
  );
};

export default ExplorePage;