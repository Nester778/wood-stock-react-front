import React, { useState, useEffect, useRef } from 'react'
import "./CreateProd.css"
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


export default function CreateProd() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productMaterial, setProductMaterial] = useState('');
    const [productCoating, setProductCoating] = useState('');
    const navigate = useNavigate();

    const onDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
        setSelectedImages([...selectedImages, ...newImages]);
    };

    const removeImage = (index, e) => {
        e.stopPropagation();
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const uploadImages = async () => {
        const formData = new FormData();
        selectedImages.forEach((image) => {
            formData.append('images', image);
        });
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productDescription', productDescription);
        formData.append('productMaterial', productMaterial);
        formData.append('productCoating', productCoating);

        try {
            await axios.post('https://www.nester.website/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/catalog');
            console.log('Product data and images uploaded successfully');
        } catch (error) {
            console.error('Error uploading product data and images:', error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });

    return (
        <div className="container m-top d-flex align-items-center justify-content-center">
            <div className="centered-container">
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <p>Select images or drag them here.</p>
                    <div className="selected-images">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="image-container">
                                <img src={image.preview} alt={`preview-${index}`} className="image-preview" />
                                <button onClick={(e) => removeImage(index, e)} className="remove-button">
                                    <AiOutlineClose />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`row g-3 ${validated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="productName" className="form-label">Product name:</label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className={`form-control ${validated && !productName ? 'is-invalid' : ''}`}
                            required
                        />
                        <div className="invalid-feedback">
                            Please provide a product name.
                        </div>
                    </div>

                    <div>
                        <label htmlFor="productPrice" className="form-label">Price:</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input
                                type="text"
                                id="productPrice"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                className={`form-control ${validated && !productPrice ? 'is-invalid' : ''}`}
                                aria-label="Amount (to the nearest dollar)"
                                required
                            />
                            <span className="input-group-text">.00</span>
                            <div className="invalid-feedback">
                                Please provide a valid price.
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <label htmlFor="productMaterial" className="form-label">Material:</label>
                        <select
                            value={productMaterial}
                            onChange={(e) => setProductMaterial(e.target.value)}
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="Wood">Wood</option>
                            <option value="Metal">Metal</option>
                            <option value="Plastic">Plastic</option>
                        </select>
                    </div>

                    <div className="col-6">
                        <label htmlFor="productCoating" className="form-label">Coating:</label>
                        <select
                            value={productCoating}
                            onChange={(e) => setProductCoating(e.target.value)}
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="Paint">Paint</option>
                            <option value="Varnish">Varnish</option>
                            <option value="Film">Film</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="productDescription" className="form-label">Description:</label>
                        <textarea
                            id="productDescription"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className={`form-control ${validated && !productDescription ? 'is-invalid' : ''}`}
                            required
                        ></textarea>
                        <div className="invalid-feedback">
                            Please provide a product description.
                        </div>
                    </div>

                    <div>
                        <button onClick={uploadImages} className="btn btn-success" type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}