// src/pages/ExplorePage.jsx
import React, { useState } from 'react';
import { plansData, usersData } from '../data/mockData';


import Carousel from "../components/common/Carousel.jsx"

const MyPlanPage = () => {
  
  return (
    <div className="my-plan-page">
      <Carousel title="English" items={plansData} type="plan" />
      <Carousel title="Math" items={plansData} type="plan" />
      <Carousel title="Coding" items={plansData} type="plan" />
    </div>
  );
};

export default MyPlanPage;