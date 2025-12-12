// src/pages/ExplorePage.jsx
import React, { useState } from 'react';
import ExploreHeader from '../components/explore/ExploreHeader';
import ExploreTags from '../components/explore/ExploreTags';
import { plansData, usersData } from '../data/mockData';
import './ExplorePage.css';

import Carousel from "../components/common/Carousel.jsx";
import PlanList from "../components/common/PlanList.jsx";

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState('subject');
  const [pinnedTags, setPinnedTags] = useState([]);

  // Chỉ cần 1 state duy nhất: lưu lại cái carousel nào đang được xem toàn bộ
  const [fullView, setFullView] = useState(null);
  // fullView = null hoặc { title: "Tất cả kế hoạch", items: [...] }

  const handlePinTag = (tag) => {
    if (!pinnedTags.includes(tag)) setPinnedTags([...pinnedTags, tag]);
  };

  const handleUnpinTag = (tag) => {
    setPinnedTags(pinnedTags.filter(t => t !== tag));
  };

  // ================== CHẾ ĐỘ XEM TẤT CẢ (DUY NHẤT 1 KHỐI) ==================
  if (fullView) {
    return (
      <div className="explore-page">

        <div style={{ padding: '24px 40px 0', maxWidth: '1400px', margin: '0 auto' }}>
          <button
            onClick={() => setFullView(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6366f1',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 0',
            }}
          >
            ← Quay lại khám phá
          </button>

        </div>

        <PlanList initialPlans={fullView.items} />
      </div>
    );
  }

  // ================== TRẠNG THÁI BÌNH THƯỜNG – CAROUSEL ==================
  return (
    <div className="explore-page">
      <ExploreHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <ExploreTags
        activeTab={activeTab}
        pinnedTags={pinnedTags}
        onPin={handlePinTag}
        onUnpin={handleUnpinTag}
      />

      <Carousel
        title="Kế hoạch nổi bật"
        items={plansData}
        type="plan"
        onViewMore={() => setFullView({
          title: 'Kế hoạch nổi bật',
          items: plansData
        })}
      />

      <Carousel
        title="Người dùng nổi bật"
        items={usersData}
        type="teacher"
        onViewMore={() => setFullView({
          title: 'Tất cả người dùng',
          items: usersData
        })}
      />

      {/* Sau này thêm thoải mái */}
      {/*
      <Carousel
        title="Mới nhất"        items={newItems}        type="plan"
        onViewMore={() => setFullView({ title: 'Kế hoạch mới nhất', items: newItems })}
      />
      */}
    </div>
  );
};

export default ExplorePage;