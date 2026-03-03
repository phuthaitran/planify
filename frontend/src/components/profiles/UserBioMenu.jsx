// src/components/profiles/UserBioMenu.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { followApi } from "../../api/follow";
import UserCard from "../users/UserCard";
import PlanCard from "../plans/PlanCard";
import { usePlans } from "../../queries/usePlans";

import "./UserBioMenu.css";

export default function UserBioMenu({ bio }) {
  const { id: profileId } = useParams();

  const [activeTab, setActiveTab] = useState("public-plans");

  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  const [loadingFollow, setLoadingFollow] = useState(true);
  const [errorFollow, setErrorFollow] = useState(null);

  const { data: plans = [], isLoading: isLoadingPlans } = usePlans();

  // Pre-fetch followers & followings upon mounting
  useEffect(() => {
    if (!profileId) return;

    const fetchFollowData = async () => {
      setLoadingFollow(true);
      setErrorFollow(null);
      try {
        const [followersRes, followingsRes] = await Promise.all([
          followApi.getFollowers(profileId),
          followApi.getFollowings(profileId),
        ]);

        setFollowers(followersRes?.data?.result || []);
        setFollowings(followingsRes?.data?.result || []);
      } catch (err) {
        console.error("Preload follow data error:", err);
        setErrorFollow("Unable to load follow data");
      } finally {
        setLoadingFollow(false);
      }
    };

    fetchFollowData();
  }, [profileId]);

  const publicPlans = useMemo(() => {
    if (isLoadingPlans || !plans?.length || !profileId) return [];

    return plans.filter(
      (plan) => plan.ownerId === Number(profileId) && plan.visibility === "public"
    );
  }, [plans, isLoadingPlans, profileId]);

  const handleFollowToggle = useCallback(
    (targetUserId, newIsFollowing) => {
      // Update the local state so the UI reflects it immediately
      if (activeTab === "followers") {
        setFollowers((prev) =>
          newIsFollowing
            ? prev
            : prev.filter((u) => u.id !== targetUserId)
        );
      } else if (activeTab === "followings") {
        setFollowings((prev) =>
          newIsFollowing
            ? prev
            : prev.filter((u) => u.id !== targetUserId)
        );
      }
    },
    [activeTab]
  );

  const renderContent = useMemo(() => {
    if (loadingFollow && (activeTab === "followers" || activeTab === "followings")) {
      return <div className="user-empty-state">Loading...</div>;
    }

    if (errorFollow && (activeTab === "followers" || activeTab === "followings")) {
      return <div className="user-empty-state error">{errorFollow}</div>;
    }

    switch (activeTab) {
      case "public-plans":
        if (isLoadingPlans) {
          return <div className="user-empty-state">Loading plans...</div>;
        }

        if (publicPlans.length === 0) {
          return (
            <div className="user-empty-state">
              <p>No public plans here</p>
              <span>This user have not made a public plan</span>
            </div>
          );
        }

        return (
          <div className="user-content-grid public-plans-grid">
            {publicPlans.map((plan) => (
              <PlanCard key={plan.id} item={plan} />
            ))}
          </div>
        );

      case "followings":
        if (followings.length === 0) {
          return (
            <div className="user-empty-state">
              <p>No follwings</p>
              <span>This user have not follow anyone</span>
            </div>
          );
        }
        return (
          <div className="user-content-grid">
            {followings.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onFollowToggle={handleFollowToggle}
              />
            ))}
          </div>
        );

      case "followers":
        if (followers.length === 0) {
          return (
            <div className="user-empty-state">
              <p>No followers</p>
              <span>This user does not have any followers</span>
            </div>
          );
        }
        return (
          <div className="user-content-grid">
            {followers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onFollowToggle={handleFollowToggle}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  }, [
    activeTab,
    loadingFollow,
    errorFollow,
    followers,
    followings,
    publicPlans,
    isLoadingPlans,
    handleFollowToggle,
  ]);

  return (
    <div className="user-bio-menu-container">
      <div className="user-content-section">
        <div className="user-content-tabs">
          <button
            className={`user-content-tab ${activeTab === "public-plans" ? "active" : ""}`}
            onClick={() => setActiveTab("public-plans")}
          >
            Public Plans ({publicPlans.length})
          </button>

          <button
            className={`user-content-tab ${activeTab === "followings" ? "active" : ""}`}
            onClick={() => setActiveTab("followings")}
          >
            Followings ({followings.length})
          </button>

          <button
            className={`user-content-tab ${activeTab === "followers" ? "active" : ""}`}
            onClick={() => setActiveTab("followers")}
          >
            Followers ({followers.length})
          </button>
        </div>

        <div className="user-content-area">{renderContent}</div>
      </div>
    </div>
  );
}