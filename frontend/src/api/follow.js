// src/api/follow.js
import httpAuth from "./httpAuth";
import { authApi } from "./auth";

let followingCache = null; // null = not loaded, Set = loaded

export const followApi = {
  // POST /users/{targetId}/follow
  follow: async (targetId) => {
    const res = await httpAuth.post(`/users/${targetId}/follow`);
    if (followingCache instanceof Set) {
      followingCache.add(Number(targetId));
    }
    return res;
  },

  // DELETE /users/{targetId}/unfollow
  unfollow: async (targetId) => {
    const res = await httpAuth.delete(`/users/${targetId}/unfollow`);
    if (followingCache instanceof Set) {
      followingCache.delete(Number(targetId));
    }
    return res;
  },

  // GET /users/{id}/followers
  getFollowers: (id) => httpAuth.get(`/users/${id}/followers`),

  // GET /users/{id}/followings
  getFollowings: (id) => httpAuth.get(`/users/${id}/followings`),

  // check follow
  getIsFollowing: async (targetId) => {
    if (!targetId) return false;
    targetId = Number(targetId);

    // loaded cache
    if (followingCache instanceof Set) {
      return followingCache.has(targetId);
    }

    // Cache not available → load users followings
    try {
      const meRes = await authApi.me();
      const myId = meRes?.data?.result?.id;

      if (!myId) {
        console.warn("Unable to retrieve myID");
        return false;
      }

      const res = await httpAuth.get(`/users/${myId}/followings`);
      const followings = res?.data?.result || [];

      followingCache = new Set(
        followings.map((u) => Number(u.id || u.userId || 0))
      );

      return followingCache.has(targetId);
    } catch (err) {
      console.error("Error loading followings for checking:", err);
      return false;
    }
  },

  isFollowing: async (targetId) => {
    console.warn("isFollowing deprecated → use getIsFollowing instead");
    return followApi.getIsFollowing(targetId);
  },

  // clear the cache
  clearFollowingCache: () => {
    followingCache = null;
  },
};