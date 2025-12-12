import React from "react";
import LikeButton from "./LikeButton";

const PlanCard = ({ item }) => {
  return (
    <>
      {/* Unified Card Styles */}
      <style jsx>{`
        .card {
          position: relative;
          width: 240px;
          flex-shrink: 0;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-image {
          width: 100%;
          height: 140px;
          background: linear-gradient(135deg, #6366f1, #4f46e5); /* Nice indigo-purple gradient */
        }

        .card-info {
          padding: 16px 20px;
          text-align: left;
        }

        .card-info h3 {
          margin: 0 0 6px 0;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .card-info p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.4;
        }
      `}</style>

      {/* Unified Card Markup */}
      <div className="card">
        <div className="card-image" />

        <div className="card-info">
          <h3>{item.title || item.name}</h3>
          <p>{item.duration || item.info || "No description available"}</p>
        </div>

        <LikeButton itemId={item.id} />
      </div>
    </>
  );
};

export default PlanCard;