// src/data/mockData.js
export const plansData = Array(15).fill(null).map((_, i) => ({
  id: i + 1,
  title: 'Plan '+i,
  duration: i+ ' month',
}));

export const usersData = Array(18).fill(null).map((_, i) => ({
  id: i + 1,
  name: 'User ' + i,
  info: 'Information '+ i ,
}));