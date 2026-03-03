// src/components/profiles/MyBioMenu.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { followApi } from "../../api/follow";
import UserCard from "../users/UserCard";
import PlanCard from "../plans/PlanCard";
import { usePlans } from "../../queries/usePlans";

import "./MyBioMenu.css";

export default function MyBioMenu({ bio, userId }) {
  const [activeTab, setActiveTab] = useState("public-plans");

  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loadingFollow, setLoadingFollow] = useState(true); 
  const [errorFollow, setErrorFollow] = useState(null);

  const { data: plans = [], isLoading: isLoadingPlans } = usePlans();

  // Pre-fetch followers & followings upon mounting
  useEffect(() => {
    if (!userId) return;

    const fetchFollowData = async () => {
      setLoadingFollow(true);
      setErrorFollow(null);
      try {
        const [followersRes, followingsRes] = await Promise.all([
          followApi.getFollowers(userId),
          followApi.getFollowings(userId),
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
  }, [userId]); 

  const publicPlans = useMemo(() => {
    if (isLoadingPlans || !plans?.length) return [];

    return plans.filter(
      (plan) => plan.ownerId === Number(userId) && plan.visibility === "public"
    );
  }, [plans, isLoadingPlans, userId]);

  const handleFollowToggle = useCallback(
    (targetUserId, newIsFollowing) => {
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
      return <div className="my-empty-state">Loading...</div>;
    }

    if (errorFollow && (activeTab === "followers" || activeTab === "followings")) {
      return <div className="my-empty-state error">{errorFollow}</div>;
    }

    switch (activeTab) {
      case "public-plans":
        if (isLoadingPlans) return <div className="my-empty-state">Loading plans...</div>;

        if (publicPlans.length === 0) {
          return (
            <div className="my-empty-state">
              <p>No public plans here</p>
              <span>Create a public plan to display here</span>
            </div>
          );
        }

        return (
          <div className="my-content-grid public-plans-grid">
            {publicPlans.map((plan) => (
              <PlanCard key={plan.id} item={plan} />
            ))}
          </div>
        );

      case "followings":
        if (followings.length === 0) {
          return (
            <div className="my-empty-state">
              <p>No followings</p>
              <span>Start exploring and follow users to see them here</span>
            </div>
          );
        }
        return (
          <div className="my-content-grid">
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
            <div className="my-empty-state">
              <p>No followers</p>
              <span>Share your profile to gain more followers</span>
            </div>
          );
        }
        return (
          <div className="my-content-grid">
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
    <div className="my-bio-menu-container">
      <div className="my-content-section">
        <div className="my-content-tabs">
          <button
            className={`my-content-tab ${activeTab === "public-plans" ? "active" : ""}`}
            onClick={() => setActiveTab("public-plans")}
          >
            Public Plans ({publicPlans.length})
          </button>

          <button
            className={`my-content-tab ${activeTab === "followings" ? "active" : ""}`}
            onClick={() => setActiveTab("followings")}
          >
            Followings ({followings.length})
          </button>

          <button
            className={`my-content-tab ${activeTab === "followers" ? "active" : ""}`}
            onClick={() => setActiveTab("followers")}
          >
            Followers ({followers.length})
          </button>
        </div>

        <div className="my-content-area">{renderContent}</div>
      </div>
    </div>
  );
}