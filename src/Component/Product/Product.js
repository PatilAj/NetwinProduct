import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';
import { IconButton, Modal, Box, Typography, Button, Pagination } from '@mui/material';
import { Delete, Edit, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);



    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/products');
            if (response.data && response.data.products) {
                setProducts(response.data.products);
                setCurrentPage(1);
            } else {
                console.error('Invalid data format for products:', response.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDeleteClick = (productId) => {
        setSelectedProductId(productId);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`https://dummyjson.com/products/${selectedProductId}`);
            setProducts(products.filter(product => product.id !== selectedProductId));
            setSelectedProductId(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    const handleCloseModal = () => {
        setSelectedProductId(null);
    };

    return (
        <>
            <section>
                <div className='container' style={{ justifyContent: "center", width: "100%" }}>
                    <div className="row" style={{ display: "flex", justifyContent: "center", marginTop: "3rem", marginBottom: '2rem', gap: '3rem' }}>
                        {currentProducts.map((product) => (
                            <div key={product.id} className="card col-md-3" style={{ width: '18rem' }}>
                                {product.images && <img src={product.images} className="card-img-top" alt="loading" />}
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <div className='price'>
                                        <p className='original-price'>${product.price}</p>
                                        <p className='discount-price'>${product.discountPercentage}</p>
                                    </div>
                                    <p className="card-text">{product.description} </p>
                                    <div className='action-buttons'>
                                        <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(product.id)}>
                                            <Delete />
                                        </IconButton>
                                        <Link to={`/EditProduct/${product.id}`}>
                                            <IconButton aria-label="edit" color="success">
                                                <Edit />
                                            </IconButton>
                                        </Link>
                                        <IconButton aria-label="favorite" color="warning">
                                            <FavoriteBorder />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section>

                <Pagination style={{ display: 'flex', justifyContent: 'center' , backgroundColor:'none !important'}}
                    count={Math.ceil(products.length / productsPerPage)}
                    page={currentPage}
                    onChange={(event, page) => paginate(page)}
                    color="primary"
                />
            </section>
            <Modal
                open={!!selectedProductId}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    width: 350,
                    bgcolor: 'background.paper',
                    border: 'none',
                    borderRadius: '5px',
                    boxShadow: 24,
                    p: 4,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm Deletion
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                        Are you sure you want to delete this product?
                    </Typography>
                    <Button sx={{ mt: 2, mr: 3 }} color="error" variant="contained" onClick={handleCloseModal}>Cancel</Button>
                    <Button sx={{ mt: 2, ml: 3 }} color='success' variant="contained" onClick={handleConfirmDelete}>Confirm</Button>
                </Box>
            </Modal >
        </>
    );
};

export default ProductList;
