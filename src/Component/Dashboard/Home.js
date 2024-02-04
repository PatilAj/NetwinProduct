import React from 'react';
import './home.css';
import ProductList from '../Product/Product.js';

function Home() {

    return (
        <>
            <div className="landing-page-container">
                <ProductList />
            </div>
        </>
    );
}

export default Home;