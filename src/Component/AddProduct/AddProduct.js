import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './addProduct.css';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/products/add', formData);
      if (response.status === 200) {
        console.log('Product added successfully!');
        navigate('/ProductList');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const handleCancel = () => {
    navigate('/ProductList');
  }

  return (
    <>
    <section className='add-section'>
    <div className='add-form container'>
        <form className='row' onSubmit={handleSubmit} style={{ gap: '0', marginBottom: '4rem' }}>
            <div className="add-mb-3">
                <label htmlFor="productName" className="form-label">Product Name</label>
                <input type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="add-product form-control " id="productName" placeholder="Product Name" />
            </div>
            <div className="add-mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
              <input type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required  className="product form-control " id="exampleFormControlInput1" placeholder="Description" />
            </div>
            <div className="add-mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Price</label>
              <input type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required className="product form-control " id="exampleFormControlInput1" placeholder="Price" />
            </div>
            <div className="add-mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Quantity</label>
              <input type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required className="product form-control " id="exampleFormControlInput1" placeholder="Quantity" />
            </div>
            <button className='add-add' type="submit">Add Product</button>
            <button className='add-cancel' type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddProduct;
