import React, { useState, useEffect, useRef } from 'react';
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
  const [valid, setValid] = useState(true);
  const searchRef = useRef(null);
  const maxPriceRef = useRef(null);
  const minPriceRef = useRef(null);
  const coatingRef = useRef(null);
  const materialRef = useRef(null);

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


  const handleFilterChange = () => {
    let arr = ["search", "material", "coating", "maxPrice", "minPrice"]
    let arrValue = [searchRef.current.value, materialRef.current.value, coatingRef.current.value, maxPriceRef.current.value, minPriceRef.current.value]
    if (arrValue[3] >= arrValue[4] || arrValue[4] === '' || arrValue[3] === '') {
      if (!isNaN(arrValue[4]) || arrValue[4] === '') {
        if (!isNaN(arrValue[3]) || arrValue[3] === '') {
          setValid(true);
          for (let i = 0; i < arr.length; i++) {
            setFilter(prevFilter => ({ ...prevFilter, [arr[i]]: arrValue[i] }))
          }
        }
        else {
          setValid(false);
        }
      }
      else {
        setValid(false);
      }
    }
    else {
      setValid(false);
    }
  };


  return (
    <div className="container m-top">
      <div className="row">
        <div className="col-12 col-lg-4">
          <div className="filter-container">
            <h3>Filter</h3>
            <div className="filter-group">
              <div className="input-group row">
                <div className="filter-group">
                  <label htmlFor="search">Search:</label>
                  <input
                    type="text"
                    id="search"
                    className="form-control"
                    placeholder="Enter search term"
                    ref={searchRef}
                  />
                </div>
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
                    className={`form-control ${valid ? '' : 'failed-valid'}`}
                    placeholder="Min"
                    ref={minPriceRef}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    id="maxPrice"
                    className={`form-control ${valid ? '' : 'failed-valid'}`}
                    placeholder="Max"
                    ref={maxPriceRef}
                  />
                </div>

              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="coating">Coating:</label>
              <select
                id="coating"
                className="form-select"
                ref={coatingRef}
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
                ref={materialRef}
              >
                <option value="" selected>Any</option>
                <option value="Wood">Wood</option>
                <option value="Metal">Metal</option>
                <option value="Plastic">Plastic</option>
              </select>
            </div>
            <div>
              <button onClick={handleFilterChange} className="btn btn-success" type="submit">Search</button>
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