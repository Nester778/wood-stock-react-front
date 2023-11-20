import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


import "./ProductInfo.css"

export default function ProductInfo() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Запрос к серверу для получения информации о товаре по id
        axios.get(`https://www.nester.website/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    const handleDeleteProduct = async () => {
        try {
            const response = await axios.delete(`https://www.nester.website/products/${id}`);
            console.log(response.data);
            navigate('/catalog');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (product === null) {
        return <div className='m-top text-center'>Loading...</div>;
    }
    return (
        <div className="container m-top">

            <p className="title">{product.Name}</p>

            <div className="btn-group title-btn" role="group" aria-label="Basic example">
                <button className="btn btn-outline-danger" onClick={handleDeleteProduct}>
                    Delete
                </button>
            </div>
            <hr />
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <div id="carouselExampleControls" class="carousel slide"
                        data-bs-ride="carousel">
                        <div class="carousel-inner">
                            {product.data.map(data => (
                                <div class="carousel-item active">
                                    <div class="cont" id='prod-img-card-wrapper'>
                                        <img
                                            src={`data:image/jpeg;base64,${arrayBufferToBase64(data.data)}`}
                                            class="img-style card-img-top"
                                            id="img-card"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button class="carousel-control-prev" type="button"
                            data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button"
                            data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 p-3">
                    <div className="row cost-wrapper m-0 p-2">
                        <div className="col-6">
                            <p className="px-2 m-0 description">{product.Price}<span>$</span></p>
                            <hr />
                            <p className="px-2 m-0 on-stock">on stock <span>123</span></p>
                        </div>
                        <div className="col-6 p-0 d-flex justify-content-center">
                            <a href="" className="btn btn-outline-success container-fluid p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
                                    class="bi bi-cart-plus" viewBox="0 0 16 16">
                                    <path
                                        d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                                    <path
                                        d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                            </a>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-6">
                            <p className="my-3 mx-1 description">Materials</p>
                            <p className="my-3 mx-1 description-text">{product.Material}</p>
                        </div>
                        <div className="col-6">
                            <p className="my-3 mx-1 description text-right">Coating</p>
                            <p className="my-3 mx-1 description-text text-right">{product.Coating}</p>
                        </div>
                    </div>


                </div>
            </div>

            <hr />
            <p className="my-0 mx-0 description">Description</p>
            <p className="my-3 description-text">
                {product.Description}
            </p>

            <hr />
        </div>
    )
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}