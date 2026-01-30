import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { usePlans } from '../../context/PlanContext';
import ViewMyPlan from './ViewMyPlan';
import ViewPlan from './ViewPlan';

/**
 * Smart wrapper component that decides whether to show ViewMyPlan or ViewPlan
 * based on plan ownership
 */
const ViewPlanWrapper = () => {
  const { id } = useParams();
  const { getCachedPlanById, plans } = usePlans();

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

  // Get the plan from context
  const plan = useMemo(() => {
    return getCachedPlanById(Number(id));
  }, [id, getCachedPlanById]);

  // Determine if current user owns this plan
  const isOwnedByCurrentUser = useMemo(() => {
    if (!plan || !currentUserId) return false;
    return plan.ownerId === currentUserId;
  }, [plan, currentUserId]);

  // Show loading state while plans are being fetched
  if (!plans || plans.length === 0) {
    return (
      <div className="viewplan-loading">
        <div className="spinner" role="status" aria-label="Loading"></div>
        <p>Loading plan...</p>
      </div>
    );
  }

  // Render appropriate component based on ownership
  if (isOwnedByCurrentUser) {
    return <ViewMyPlan />;
  } else {
    return <ViewPlan />;
  }
};

export default ViewPlanWrapper;
