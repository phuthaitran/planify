import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditPlan from './EditPlan';
import PreviewModal from '../createplan/Preview';
import StatusDropdown from '../../components/home/StatusDropdown';
import ReviewPlanPopup from './ReviewPlanPopUp';
import { usePlans } from '../../context/PlanContext';
import { deletePlan } from '../../api/plan';
import httpPublic from '../../api/httpPublic';
import './ViewMyPlan.css';

const ViewMyPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reviewBtnRef = useRef(null);

  const [plan, setPlan] = useState(null);
  const [originalPlan, setOriginalPlan] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { getCachedPlanById, plans } = usePlans();

  // Get plan from context
  const contextPlan = useMemo(() => {
    return getCachedPlanById(Number(id));
  }, [id, getCachedPlanById]);

  // Initialize plan state from context
  useMemo(() => {
    if (contextPlan && !plan) {
      setPlan(contextPlan);
      setOriginalPlan(JSON.parse(JSON.stringify(contextPlan)));
    }
  }, [contextPlan, plan]);

  // Calculate review statistics
  const calculateReviewData = useCallback(() => {
    if (!plan) return {};

    let totalSubtasks = 0;
    let cancelled = 0;
    let completedOnTime = 0;
    let completedLate = 0;
    let inProgress = 0;
    let incomplete = 0;

    plan.stages.forEach(stage => {
      stage.tasks.forEach(task => {
        if (task.subtasks) {
          task.subtasks.forEach(subtask => {
            totalSubtasks++;

            switch (subtask.status) {
              case 'DONE':
                if (subtask.completedAt && subtask.deadline) {
                  const completed = new Date(subtask.completedAt);
                  const deadline = new Date(subtask.deadline);
                  if (completed <= deadline) {
                    completedOnTime++;
                  } else {
                    completedLate++;
                  }
                } else {
                  completedOnTime++;
                }
                break;
              case 'CANCELLED':
                cancelled++;
                break;
              case 'IN_PROGRESS':
                inProgress++;
                break;
              case 'INCOMPLETE':
                incomplete++;
                break;
              default:
                incomplete++;
            }
          });
        }
      });
    });

    return {
      totalSubtasks,
      cancelled,
      completedOnTime,
      completedLate,
      inProgress,
      incomplete,
    };
  }, [plan]);

  // Handle subtask status change
  const handleSubtaskStatusChange = useCallback((stageIdx, taskIdx, subtaskIdx, newStatus) => {
    setPlan(prevPlan => {
      const updatedPlan = JSON.parse(JSON.stringify(prevPlan));
      const subtask = updatedPlan.stages[stageIdx].tasks[taskIdx].subtasks[subtaskIdx];

      subtask.status = newStatus;

      // Set completedAt timestamp when marked as DONE
      if (newStatus === 'DONE' && !subtask.completedAt) {
        subtask.completedAt = new Date().toISOString().split('T')[0];
      } else if (newStatus !== 'DONE') {
        subtask.completedAt = null;
      }

      // TODO: Send update to backend API
      // await updateSubtaskStatus(planId, stageIdx, taskIdx, subtaskIdx, { status: newStatus, completedAt: subtask.completedAt });

      return updatedPlan;
    });
  }, []);

  const handleSave = useCallback(() => {
    console.log('Saved plan:', plan);
    setOriginalPlan(JSON.parse(JSON.stringify(plan)));
    setIsEditing(false);
    // TODO: Send to API
    // await savePlan(id, plan);
  }, [plan]);

  const handleCancel = useCallback(() => {
    setPlan(JSON.parse(JSON.stringify(originalPlan)));
    setIsEditing(false);
  }, [originalPlan]);

  const handlePreview = useCallback(() => {
    setShowPreview(true);
  }, []);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleDeleteClick = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await deletePlan(id);
      // Refresh the page and navigate to My Plan
      window.location.href = '/myplan';
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Failed to delete plan. Please try again.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  }, [id]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  // Show loading state while plans are being fetched from context
  if (!plans || plans.length === 0) {
    return (
      <div className="viewplan-loading">
        <div className="spinner" role="status" aria-label="Loading"></div>
        <p>Loading plan...</p>
      </div>
    );
  }

  // Show error if plan not found
  if (!plan) {
    return (
      <div className="viewplan-error">
        <h2>Plan not found</h2>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <>
        <EditPlan
          plan={plan}
          setPlan={setPlan}
          onPreview={handlePreview}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        {showPreview && (
          <PreviewModal
            planData={plan}
            onClose={() => setShowPreview(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="viewplan-container">
      <div className="viewplan-header">
        <button className="viewplan-back-btn" onClick={handleGoBack}>
          ← Back
        </button>

        <div className="viewplan-actions">
          <div ref={reviewBtnRef} style={{ position: 'relative' }}>
            <button className="btn-review" onClick={() => setShowReview(!showReview)}>
              Review
            </button>
            <ReviewPlanPopup
              isOpen={showReview}
              onClose={() => setShowReview(false)}
              containerRef={reviewBtnRef}
              reviewData={calculateReviewData()}
            />
          </div>
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            Edit Plan
          </button>
          <button className="btn-delete" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>

      <h1 className="viewplan-title">{plan.title}</h1>

      <div className="viewplan-main">
        <div className="viewplan-sidebar">
          <div className="viewplan-image">
            {plan.picture ? (
              <img src={`${httpPublic.defaults.baseURL}${plan.picture}`} alt={plan.title} />
            ) : (
              <div className="placeholder-image">
                <div className="landscape-icon"></div>
              </div>
            )}
          </div>

          <div className="viewplan-info">
            <div className="info-section">
              <strong>Description</strong>
              <p>{plan.description}</p>
            </div>

            <div className="info-section">
              <strong>Tags</strong>
              <div className="category-tags">
                {(plan.categories || []).map((cat, i) => (
                  <span key={i} className="category-tag">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className='info-section'>
              <strong>Duration</strong>
              <p>{plan.duration} Days</p>
            </div>

            <div className='info-section'>
              <strong>Visibility</strong>
              <p>{plan.visibility}</p>
            </div>
          </div>
        </div>

        <div className="viewplan-stages">
          {plan.stages.map((stage, stageIdx) => (
            <div key={stageIdx} className="viewplan-stage">
              <div className="stage-header">
                <h3 className="stage-title">
                  Stage {stageIdx + 1}: {stage.title || 'Untitled Stage'}
                </h3>
              </div>

              {stage.description && (
                <p className="stage-description">{stage.description}</p>
              )}

              {stage.duration && (
                <p className="stage-duration">Duration: {stage.duration} Days</p>
              )}

              <div className="stage-tasks">
                {stage.tasks.map((task, taskIdx) => (
                  <div key={taskIdx} className="viewplan-task">
                    <div className="task-header">
                      <h4 className="task-title">
                        Task {taskIdx + 1}: {task.description || 'Untitled Task'}
                      </h4>
                    </div>

                    {task.duration && (
                      <p className="task-duration">
                        Duration: {task.duration} Days
                      </p>
                    )}

                    {task.subtasks?.length > 0 && (
                      <div className="subtasks">
                        <strong>Subtasks:</strong>
                        <ul>
                          {task.subtasks.map((subtask, subtaskIdx) => (
                            <li key={subtaskIdx} className="subtask-item">
                              <div className="subtask-content">
                                <span className="subtask-title">
                                  {typeof subtask === 'string' ? subtask : subtask.title}
                                </span>
                                {typeof subtask === 'object' && subtask.description && (
                                  <div className="subtask-description">{subtask.description}</div>
                                )}
                                {typeof subtask === 'object' && subtask.duration && (
                                  <div className="subtask-duration">Duration: {subtask.duration} Days</div>
                                )}
                              </div>
                              {typeof subtask === 'object' && (
                                <StatusDropdown
                                  value={subtask.status || 'INCOMPLETE'}
                                  onChange={(newStatus) =>
                                    handleSubtaskStatusChange(stageIdx, taskIdx, subtaskIdx, newStatus)
                                  }
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {plan.stages.length === 0 && (
            <p className="no-stages">No stages defined yet.</p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <h3>Delete Plan</h3>
            <p>Are you sure you want to delete "{plan.title}"?</p>
            <p className="delete-warning">This action cannot be undone.</p>
            <div className="delete-confirm-actions">
              <button
                className="btn-cancel"
                onClick={handleCancelDelete}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="btn-confirm-delete"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMyPlan;