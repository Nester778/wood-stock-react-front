import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import Filter from './Filter';

import './App.css';
import './Catalog.css';

export default function Catalog() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
    coating: '',
    material: '',
    search: '',
  });
  const [maxPriceHook, setMaxPriceHook] = useState("");
  const [minPriceHook, setMinPriceHook] = useState("");

  useEffect(() => {
    setLoading(true);

    axios.get('https://www.nester.website/catalog', { params: filter })
      .then(response => {
        setImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, [filter]);
  console.log(images);
  const handleFilterChange = (filterType, e) => {
    const value = e.target.value;
    setFilter(prevFilter => ({ ...prevFilter, [filterType]: value }));
  };

  const validMaxPrise = (filterType, e) => {
    const value = e.target.value;
    if (value >= minPriceHook && !isNaN(value)) {
      setMaxPriceHook(value);
      handleFilterChange(filterType, e);
    }
  }

  const validMinPrise = (filterType, e) => {
    const value = e.target.value;
    if (value <= maxPriceHook && !isNaN(value)) {
      setMinPriceHook(value);
      handleFilterChange(filterType, e);
    }
  }

  return (
    <div className="container m-top">
      <div className="row">
        <div className="col-12 col-lg-4">
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
                    onChange={(e) => validMinPrise('minPrice', e)}
                    value={minPriceHook}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    id="maxPrice"
                    className="form-control"
                    placeholder="Max"
                    onChange={(e) => validMaxPrise('maxPrice', e)}
                    value={maxPriceHook}
                  />
                </div>

              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="coating">Coating:</label>
              <select
                id="coating"
                className="form-select"
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
                className="form-select"
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
        </div>
        <div className="col-12 col-lg-8">
          <div className="container py-3">
            {
              loading ? (
                <div class="spinner-border text-success" role="status" >
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                images.length > 0 ? (
                  <div className="row">
                    {images.map((image, index) => (
                      <Card prod={image} key={index} />
                    ))}
                  </div>
                ) : (
                  <div>
                    <span>product not found</span>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div >
  );
}