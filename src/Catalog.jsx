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

  useEffect(() => {
    setLoading(true);

    axios.get('http://www.nester.website/catalog/', { params: filter })
      .then(response => {
        setImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, [filter]);

  const handleFilterChange = (filterType, value) => {
    setFilter(prevFilter => ({ ...prevFilter, [filterType]: value }));
  };

  return (
    <div className="container m-top">
      <div className="row">
        <div className="col-12 col-lg-4">
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <div className="col-12 col-lg-8">
          <div className="container py-3">
            {loading ? ( // Если загружается, отобразить надпись загрузки
              <p>Loading...</p>
            ) : (
              <div className="row">
                {images.map((image, index) => (
                  <Card prod={image} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}