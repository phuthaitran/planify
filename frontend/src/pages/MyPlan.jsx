import React, { useState, useCallback, useMemo } from 'react';
import Carousel from '../components/plans/Carousel.jsx';
import PlanList from '../components/plans/PlanList.jsx';
import { usePlans } from '../context/PlanContext.jsx';
import { jwtDecode } from 'jwt-decode';
import './MyPlan.css';

const MyPlan = () => {
  const [fullView, setFullView] = useState(null);
  const { plans } = usePlans();

  // Get current user ID from JWT token
  const currentUserId = useMemo(() => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return null;
      const decoded = jwtDecode(token);
      return decoded.userId;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }, []);

  // Filter plans to show only those owned by current user
  const planData = useMemo(() => {
    const userPlans = plans.filter(plan => plan.ownerId === currentUserId);

    return {
      recentlyOpened: [
        {
          id: 'my-recent-1',
          title: 'Morning Workout Routine',
          duration: '30 days • Fitness',
          ownerId: currentUserId,
          createdAt: new Date('2024-12-15'),
          lastOpened: new Date('2024-12-18')
        }
      ],
      inProgress: [
        {
          id: 'my-progress-1',
          title: 'Learn React Advanced',
          duration: '60 days • Programming',
          ownerId: currentUserId,
          createdAt: new Date('2024-12-10'),
          status: 'in-progress',
          progress: 45
        }
      ],
      allPlans: userPlans
    };
  }, [plans, currentUserId]);

  const handleViewMore = useCallback((title, items) => {
    setFullView({ title, items });
  }, []);

  const handleBack = useCallback(() => {
    setFullView(null);
  }, []);

  // Full view mode
  if (fullView) {
    return (
      <div className="explore-page">
        <PlanList
          initialPlans={fullView.items}
          isFullView={true}
          fullViewTitle={fullView.title}
          onBack={handleBack}
        />
      </div>
    );
  }

  // Main view - carousel sections
  return (
    <div className="myplan-container">
      <PlanList plans={planData.allPlans} />
    </div>
  );
};

export default MyPlan;