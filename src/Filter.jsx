import React from 'react';
import './Filter.css';

export default function Filter({ onFilterChange }) {
    const handleFilterChange = (filterType, e) => {
        const value = e.target.value;
        onFilterChange(filterType, value);
    };

    return (
        <div className="filter-container">
            <h3>Filter</h3>
            <div className="filter-group">
                <div className="input-group row">
                    <div className="col-6">
                        <label htmlFor="minPrice">Min Price:</label>
                    </div>
                    <div className="col-6">
                        <label htmlFor="maxPrice">Max Price:</label>
                    </div>
                </div>
                <div className="input-group row">
                    <div className="col-6">
                        <input
                            type="text"
                            id="minPrice"
                            className="form-control"
                            placeholder="Min"
                            onChange={(e) => handleFilterChange('minPrice', e)}
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="text"
                            id="maxPrice"
                            className="form-control"
                            placeholder="Max"
                            onChange={(e) => handleFilterChange('maxPrice', e)}
                        />
                    </div>

                </div>
            </div>

            <div className="filter-group">
                <label htmlFor="coating">Coating:</label>
                <select
                    id="coating"
                    className="form-control"
                    onChange={(e) => handleFilterChange('coating', e)}
                >
                    <option value="" selected>Any</option>
                    <option value="Paint">Paint</option>
                    <option value="Varnish">Varnish</option>
                    <option value="Film">Film</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="material">Material:</label>
                <select
                    id="material"
                    className="form-control"
                    onChange={(e) => handleFilterChange('material', e)}
                >
                    <option value="" selected>Any</option>
                    <option value="Wood">Wood</option>
                    <option value="Metal">Metal</option>
                    <option value="Plastic">Plastic</option>
                    {/* Добавьте другие варианты материала */}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="search"
                    className="form-control"
                    placeholder="Enter search term"
                    onChange={(e) => handleFilterChange('search', e)}
                />
            </div>
        </div>
    );
}