import React from 'react';
import './Filter.css';

export default function Filter({ onFilterChange }) {
    const handleFilterChange = (filterType, e) => {
        const value = e.target.value;
        onFilterChange(filterType, value);
    };

    return (<></>);
}