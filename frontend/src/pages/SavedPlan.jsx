import { useState, useCallback, useMemo } from 'react';
import Carousel from '../components/plans/Carousel';
import PlanList from '../components/plans/PlanList';
import { useBookmarks } from '../queries/useBookmarks';
import { useHydratedPlans } from '../queries/useHydratedPlans';
import './SavedPlan.css';

const SavedPage = () => {
  const [fullView, setFullView] = useState(null);
  const {bookmarks: plans, isLoading, isError } = useBookmarks();
  const hydratedPlans = useHydratedPlans(plans);
  const fullPlans = hydratedPlans.filter(q => q.data).map(q => q.data);

  const savedPlans = useMemo(() => {
  if (!fullPlans) {
    return {
      english: [],
      math: [],
      computerScience: [],
      all: [],
    };
  }

  return {
    english: fullPlans.filter(plan =>
      plan.categories?.includes('English')
    ),
    math: fullPlans.filter(plan =>
      plan.categories?.includes('Math')
    ),
    computerScience: fullPlans.filter(plan =>
      plan.categories?.includes('Computer Science')
    ),
    all: fullPlans,
  };
}, [fullPlans]);


  // Memoized handler to prevent unnecessary re-renders
  const handleViewMore = useCallback((category, title) => {
    setFullView({
      title,
      items: savedPlans[category],
    });
  }, [savedPlans]);

  const handleBack = useCallback(() => {
    setFullView(null);
  }, []);

  // Memoized full view content
  const fullViewContent = useMemo(() => {
    if (!fullView) return null;

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
  }, [fullView, handleBack]);

  // Full view mode
  if (fullView) {
    return fullViewContent;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="saved-page loading-container">
        <div className="spinner-wrapper">
          <div className="spinner" role="status" aria-label="Loading"></div>
          <p className="loading-text">Loading saved plans...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="saved-page loading-container">
        <div className="spinner-wrapper">
          <p className="loading-text" style={{ color: '#ef4444' }}>
            Failed to load plans. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Main view - carousel sections
  return (
    <div className="saved-page">
      <Carousel
        title="English"
        items={savedPlans.english}
        type="plan"
        onViewMore={() => handleViewMore('english', 'English')}
      />

      <Carousel
        title="Math"
        items={savedPlans.math}
        type="plan"
        onViewMore={() => handleViewMore('math', 'Math')}
      />

      <Carousel
        title="Computer Science"
        items={savedPlans.computerScience}
        type="plan"
        onViewMore={() => handleViewMore('computerScience', 'Computer Science')}
      />

      <Carousel
        title="All Saved Plans"
        items={fullPlans}
        type="plan"
        onViewMore={() => handleViewMore('all', 'All Saved Plans')}
      />
    </div>
  );
};

export default SavedPage;