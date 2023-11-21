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
    const [productMaterial, setProductMaterial] = useState("Wood");
    const [productCoating, setProductCoating] = useState("Paint");
    const [validated, setValidated] = useState(false);
    const [validatedNum, setValidatedNum] = useState(false);
    const [validatedImg, setValidatedImg] = useState(true);

    const navigate = useNavigate();

    const onDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
        setSelectedImages([...selectedImages, ...newImages]);
        setValidatedImg(true)
    };

    const removeImage = (index, e) => {
        e.stopPropagation();
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
        if (selectedImages.length === 1) {
            setValidatedImg(false)
        }
    };

    const uploadImages = async () => {
        const formData = new FormData();
        selectedImages.forEach((image) => {
            formData.append('images', image);
        });
        if (selectedImages.length === 0) {
            setValidatedImg(false)
        }

        if (selectedImages.length > 0 && productName.length > 0 && productPrice.length > 0 && !isNaN(productPrice)) {
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
        }
    };
    const numValid = (number) => {
        if (!isNaN(number)) {
            setProductPrice(number);
            setValidatedNum(true);
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        uploadImages();
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });

    return (
        <div className="container m-top d-flex align-items-center justify-content-center">
            <div className="centered-container">
                <div {...getRootProps()} className={`dropzone ${validatedImg ? "" : "failed-valid"}`}>
                    <input {...getInputProps()} />
                    <p>Select images or drag them here.{"(png, jpg)"}</p>
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

                <div className={`row g-3 ${validated ? 'was-validated' : ''}`} noValidate >
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
                            <input
                                type="text"
                                id="productPrice"
                                value={productPrice}
                                onChange={(e) => numValid(e.target.value)}
                                className={`form-control ${validatedNum && !productPrice ? 'is-invalid' : ''}`}
                                aria-label="Amount (to the nearest dollar)"
                                required
                            />
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
                            className={`form-control`}
                            required
                        ></textarea>
                        <div className="invalid-feedback">
                            Please provide a product description.
                        </div>
                    </div>

                    <div>
                        <button onClick={handleSubmit} className="btn btn-success" type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
