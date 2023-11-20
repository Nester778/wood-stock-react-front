import { useState } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import logo from "./assets/logo.svg";

import Home from "./Home"
import Catalog from "./Catalog"
import CreateProd from './CreateProd'
import ProductInfo from './ProductInfo'

function App() {

  return (
    <Router>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a href="/" className="navbar-brand px-3">Wood<img className="logo" src={logo} alt="" />Stock</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a href="/" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="/catalog" className="nav-link">Catalog</a>
              </li>
              <li className="nav-item">
                <a href="/new" className="nav-link">New Product</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/new" element={<CreateProd />} />
        <Route path="/product/:id" element={<ProductInfo />} />
      </Routes>
    </Router>
  )
}

export default App
