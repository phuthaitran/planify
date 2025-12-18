// ExplorePage.jsx
import React, { useState, useEffect } from 'react';
import ExploreHeader from '../components/explore/ExploreHeader';
import ExploreTags from '../components/explore/ExploreTags';
import Carousel from '../components/myPlan/Carousel';
import PlanList from '../components/myPlan/PlanList';
import './ExplorePage.css';

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState('subject');
  const [pinnedTags, setPinnedTags] = useState([]);
  const [fullView, setFullView] = useState(null);
  const [explorePlans, setExplorePlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch explore data from backend
  useEffect(() => {
    const fetchExploreData = async () => {
      setLoading(true);
      
      try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/explore/plans');
        // const data = await response.json();
        
        // Simulated API call with demo data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockData = [
          {
            id: 'plan-1',
            title: 'IELTS Speaking Mastery',
            duration: '8 weeks • Advanced',
            category: 'english',
            isPublic: true
          }
        ];
        
        setExplorePlans(mockData);
      } catch (error) {
        console.error('Error fetching explore data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreData();
  }, []);

  const handlePinTag = (tag) => {
    if (!pinnedTags.includes(tag)) {
      setPinnedTags([...pinnedTags, tag]);
    }
  };

  const handleUnpinTag = (tag) => {
    setPinnedTags(pinnedTags.filter(t => t !== tag));
  };

  const handleViewMore = (title, items) => {
    setFullView({ title, items });
  };

  // Full view mode
  if (fullView) {
    return (
      <div className="explore-page">
        <div className="full-view-header">
          <button 
            className="back-btn" 
            onClick={() => setFullView(null)}
          >
            ← Quay lại khám phá
          </button>
          <h1 className="page-title">{fullView.title}</h1>
        </div>
        <PlanList initialPlans={fullView.items} />
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="explore-page loading-container">
        <div className="spinner-wrapper">
          <div className="spinner"></div>
          <p className="loading-text">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Main view
  return (
    <div className="explore-page">
      <ExploreHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <ExploreTags
        activeTab={activeTab}
        pinnedTags={pinnedTags}
        onPin={handlePinTag}
        onUnpin={handleUnpinTag}
      />

      <Carousel
        title="Kế hoạch nổi bật"
        items={explorePlans}
        type="plan"
        onViewMore={() => handleViewMore('Kế hoạch nổi bật', explorePlans)}
      />

      <Carousel
        title="Người dùng"
        items={explorePlans}
        type="teacher"
        onViewMore={() => handleViewMore('Tất cả người dùng', explorePlans)}
      />
    </div>
  );
};

export default ExplorePage;