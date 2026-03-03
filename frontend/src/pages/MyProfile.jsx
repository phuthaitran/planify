// src/pages/MyProfile.jsx
import { useState, useEffect } from "react";
import MyAvatar from "../components/profiles/MyAvatar";
import MyBioMenu from "../components/profiles/MyBioMenu";
import { authApi } from "../api/auth";
import "./MyProfile.css";

export default function MyProfile() {
  const [userData, setUserData] = useState(null);
  const [myId, setMyId] = useState(null);
  const [stats, setStats] = useState({
    followings: 0,
    followers: 0,
    plans: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await authApi.me();
        console.log("API /users/myInfo response:", response); // debug

        const result = response?.data?.result;
        if (!result || !result.id) {
          throw new Error("User or ID information not found");
        }

        setUserData(result);
        setMyId(result.id); // Lưu ID để truyền xuống MyBioMenu

        setStats({
          followings: Number(result.followings) || 0,
          followers: Number(result.followers) || 0,
          plans: Number(result.plans) || 0,
        });

        setLoading(false);
      } catch (err) {
        console.error("Fetch profile error:", err);
        console.error("Error detail:", err.response?.data);
        setError("Unable to load profile information. Please log in again.");
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleStatsChange = (updater) => {
    setStats((prev) => {
      if (typeof updater === "function") {
        return updater(prev);
      }
      return { ...prev, ...updater };
    });
  };

  if (loading) {
    return <div className="loading">Loading profile information...</div>;
  }

  if (error || !userData || myId === null) {
    return <div className="error">{error || "User information not found"}</div>;
  }

  return (
    <div className="myprofile-page">
      <MyAvatar
        username={userData.username || "User"}
        email={userData.email || ""}
        avatar={userData.avatar}
        stats={stats}
      />

      <MyBioMenu
        bio={userData.bio || "No bio available"}
        stats={stats}
        onStatsChange={handleStatsChange}
        userId={myId}
      />
    </div>
  );
}