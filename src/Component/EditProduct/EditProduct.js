import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './edit.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const EditProduct = () => {
const nevigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: ''
    });

    const params = useParams();
    const productId = params.id;

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${productId}`);
                if (response.data) {
                    const { title, price, description } = response.data;
                    setProduct(response.data);
                    setFormData({ title, price, description });
                } else {
                    console.error('Invalid product data received:', response.data);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://dummyjson.com/products/${productId}`, formData);
            if (response.status === 200) {
                console.log('Product details updated successfully');
               nevigate('/ProductList');
            } else {
                console.error('Failed to update product details:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating product details:', error.message);
        }
    };
    const handleClose = () => {
        nevigate('/ProductList');
    }

    return (
        <section className='edit-section'>
            <div className='edit-form container'>
                {product && (
                    <form className='row' onSubmit={handleSubmit} style={{ gap: '0', marginBottom: '4rem' }}>
                        <div className="edit-mb-3">
                            <label htmlFor="productTitle" className="form-label">Product Title</label>
                            <input
                                type="text" name="title" value={formData.title} onChange={handleInputChange}
                                required
                                className="edit-product form-control " id="productTitle" placeholder="Product Title" /> 
                        </div>
                        <div className="edit-mb-3"> 
                            <label htmlFor="productPrice" className="form-label">Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleInputChange}
                                className="edit-product form-control " id="productPrice" placeholder="Price" /> 
                        </div>
                        <div className="edit-mb-3"> 
                            <label htmlFor="productDescription" className="form-label">Description</label>
                            <input type="text"
                                name="description" value={formData.description} onChange={handleInputChange}
                                className="edit-product form-control " id="productDescription" placeholder="Description" /> 
                        </div>
                        <button className='edit-add' type="submit">Update Product</button> 
                        <button className='edit-cancel' type="button" onClick={handleClose}>Cancel</button> 
                    </form>
                )}
            </div>
        </section>
    );
};

export default EditProduct;

