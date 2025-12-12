// src/pages/PlanDetailPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlanHeader from '../components/plan/PlanHeader';
import StageItem from '../components/plan/StageItem';

export default function PlanDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;

  // Nếu không có dữ liệu (truy cập trực tiếp URL), quay về
  if (!plan) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontSize: '18px', color: '#64748b' }}>
        Không tìm thấy kế hoạch. <button onClick={() => navigate(-1)} style={{ color: '#3b82f6', textDecoration: 'underline' }}>Quay lại</button>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '24px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Nút quay lại */}
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: '24px',
            background: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: '600',
            color: '#475569',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          ← Quay lại
        </button>

        {/* Header lớn */}
        <PlanHeader
          description={plan.description || "Chưa có mô tả chi tiết."}
          tags={plan.tags || ["Chưa có tag"]}
          duration={plan.duration || 30}
        />

        {/* Các giai đoạn */}
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {(plan.stages || []).map(stage => (
            <StageItem key={stage.id} stage={stage} />
          ))}
        </div>
      </div>
    </div>
  );
}