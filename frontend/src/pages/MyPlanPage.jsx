// src/pages/MyPlanPage.jsx
import React from 'react';
import myPlanData from '../data/myPlanData';   // đúng tên file

import Carousel from "../components/common/Carousel";
import PlanList from "../components/common/PlanList";

// Lọc cho 2 carousel (tuỳ chọn)
const recentlyOpened = myPlanData
  .filter(p => {
    const last = new Date(p.lastOpened);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return last >= weekAgo;
  })
  .sort((a, b) => new Date(b.lastOpened) - new Date(a.lastOpened));

const inProcess = myPlanData.filter(p => p.status === 'in-process');

const MyPlanPage = () => {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Carousel title="Recently opened" items={recentlyOpened} type="plan" />
      <Carousel title="In Process"       items={inProcess}       type="plan" />
      <PlanList initialPlans={myPlanData} />   {/* ĐÚNG PROP */}
    </div>
  );
};

export default MyPlanPage;