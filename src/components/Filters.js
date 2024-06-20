// Filters.js

import React from 'react';
import '../styles/projects.css';

const Filters = ({ onFilterChange }) => {
    const handleFilterClick = (filter) => {
        onFilterChange(filter);
    };

    return (
        <div className="filters">
            <button onClick={() => handleFilterClick('all')} data-filter="all">Все</button>
            <button onClick={() => handleFilterClick('architecture')} data-filter="architecture">Архитектура</button>
            <button onClick={() => handleFilterClick('commercial')} data-filter="commercial">Коммерческие интерьеры</button>
            <button onClick={() => handleFilterClick('private')} data-filter="private">Частные интерьеры</button>
        </div>
    );
};

export default Filters;


