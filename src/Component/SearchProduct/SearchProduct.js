
import React from 'react';
import'./search.css';

const SearchProduct = ({ productFilter }) => {
    return (
        <section>
            <div className='container' style={{ justifyContent: "center", border:"none" }}>
                <div className="row" style={{ display: "flex", justifyContent: "center", marginTop: "3rem", gap: '3rem' }}>
                    {productFilter && productFilter.length > 0 && productFilter.map((product) => (
                        <div key={product.id} className="card col-md-3" style={{ width: '18rem' }}>
                            {product.images && <img src={product.images} className="card-img-top" alt="loading" />}
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <div className='price'>
                                    <p className='original-price'>${product.price}</p>
                                    <p className='discount-price'>${product.discountPercentage}</p>
                                </div>
                                <p className="card-text">{product.description} </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SearchProduct;
