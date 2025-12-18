import React, { useState, useEffect } from 'react';
import Carousel from '../components/myPlan/Carousel.jsx';
import PlanList from '../components/myPlan/PlanList.jsx';
import './MyPlan.css';

// ============================================================================
// MOCK BACKEND SERVICE
// ============================================================================
const PlanService = {
  async getUserPlans(userId) {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      recentlyOpened: [
        {
          id: 'demo-recent-1',
          title: 'Morning Workout Routine',
          duration: '30 days • Fitness',
          authorId: userId,
          createdAt: new Date('2024-12-15'),
          lastOpened: new Date('2024-12-18')
        }
      ],
      inProgress: [
        {
          id: 'demo-progress-1',
          title: 'Learn React Advanced',
          duration: '60 days • Programming',
          authorId: userId,
          createdAt: new Date('2024-12-10'),
          status: 'in-progress',
          progress: 45
        }
      ],
      allPlans: [
        {
          id: 'demo-recent-1',
          title: 'Morning Workout Routine',
          duration: '30 days • Fitness',
          authorId: userId,
          createdAt: new Date('2024-12-15'),
          lastOpened: new Date('2024-12-18')
        },
        {
          id: 'demo-progress-1',
          title: 'Learn React Advanced',
          duration: '60 days • Programming',
          authorId: userId,
          createdAt: new Date('2024-12-10'),
          status: 'in-progress',
          progress: 45
        },
        {
          id: 'demo-all-1',
          title: 'Healthy Meal Planning',
          duration: '14 days • Nutrition',
          authorId: userId,
          createdAt: new Date('2024-12-05')
        }
      ]
    };
  }
};

const MyPlanPage = () => {
  const [fullView, setFullView] = useState(null);
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState({
    recentlyOpened: [],
    inProgress: [],
    allPlans: []
  });

  const currentUserId = 'user123';

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = await PlanService.getUserPlans(currentUserId);
        setPlanData(data);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [currentUserId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner" />
          <p className="loading-text">Loading your plans...</p>
        </div>
      </div>
    );
  }

  if (fullView) {
    return (
      <div className="fullview-container">
        <button
          onClick={() => setFullView(null)}
          className="back-button"
        >
          ← Back
        </button>
        <h1 className="fullview-title">{fullView.title}</h1>
        <PlanList plans={fullView.items} />
      </div>
    );
  }

  return (
    <div className="myplan-container">
      <Carousel
        title="Recently Opened"
        items={planData.recentlyOpened}
        onViewMore={() => setFullView({
          title: 'Recently Opened',
          items: planData.recentlyOpened
        })}
      />
      <Carousel
        title="In Progress"
        items={planData.inProgress}
        onViewMore={() => setFullView({
          title: 'In Progress',
          items: planData.inProgress
        })}
      />
      <PlanList plans={planData.allPlans} />
    </div>
  );
};

export default MyPlanPage;