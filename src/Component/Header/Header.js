import React, { useState } from 'react';
import { Search } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import Img1 from '../Logo/logo.js';
import Logout from '../Logout/Logout.js';
import Combine from '../SearchProduct/Combine.js';

function Header() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);

    // Function to reset search query and navigate to the specified link
    const handleLinkClick = (link) => {
        setSearchQuery('');
        setSearchResults([]);
        setIsFiltered(false);
        navigate(link);
    };

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {
            setSearchResults([]);
            setIsFiltered(false);
            navigate('/ProductList');
        } else {
            searchProducts(query);
            navigate('/SearchProduct');
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    const searchProducts = (query) => {
        fetch(`https://dummyjson.com/products/search?q=${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data.products)) {
                    const filteredProducts = data.products.filter(product =>
                        product.title.toLowerCase().includes(query.toLowerCase())
                    );
                    setSearchResults(filteredProducts);
                    setIsFiltered(true);
                } else {
                    console.error('Received data is not in the expected format:', data);
                    setSearchResults([]);
                }
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };

    return (
        <>
            <nav className="navbar navbar-expand-md bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Netwin</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link btn-link" aria-current="page" to="/" onClick={() => handleLinkClick('/')}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn-link" to="/ProductList" onClick={() => handleLinkClick('/ProductList')}>Product</Link>
                            </li>
                            <Link to='/AddProduct' style={{ textDecoration: "none" }}>
                                <li className="nav-item">
                                    <button className="nav-link btn-link" onClick={() => handleLinkClick('/AddProduct')}>Add</button>
                                </li>
                            </Link>
                            <li className='btn-link' style={{ paddingTop: "0.08rem" }}>
                                <Logout />
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            <button className="btn btn-outline-success" type="submit" ><Search style={{ color: 'white' }} /></button>
                        </form>
                    </div>
                </div>
            </nav>
            <section>
                <div className='home-contanier'>
                    <div id="carouselExampleIndicators" className="carousel slide">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={Img1.Alex} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={Img1.marvin} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={Img1.laptop} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={Img1.pexels} className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>
            {
                isFiltered && searchResults.length > 0 ? <Combine productFilter={searchResults} /> : null
            }
        </>
    );
};

export default Header;
