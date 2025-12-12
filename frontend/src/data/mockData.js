// src/data/mockData.js
export const plansData = Array(12).fill(null).map((_, i) => ({
  id: i + 1,
  title: 'Plan '+i,
  duration: i+ ' month',
}));

export const usersData = Array(12).fill(null).map((_, i) => ({
  id: i + 1,
  name: 'User ' + i,
  info: 'Information '+ i ,
}));