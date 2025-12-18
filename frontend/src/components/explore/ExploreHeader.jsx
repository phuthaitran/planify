// src/components/explore/ExploreHeader.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './ExploreHeader.css';

const ExploreHeader = ({ activeTab, setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  const tabs = [
    { id: 'subject', label: 'Môn học' },
    { id: 'certificate', label: 'Chứng chỉ' },
    { id: 'other', label: 'Khác' }
  ];

  return (
    <div className="explore-header">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm khóa học, giáo viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          type="submit"
          className="search-icon-btn"
          aria-label="Search"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="search-icon-img"
          />
        </button>
      </form>

      <div className="main-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExploreHeader;
