import React from 'react';
import SearchProduct from './SearchProduct';

function Combine({productFilter}) {

    return (
        <> 
            <SearchProduct productFilter={productFilter} />
        </>
    );
}

export default Combine;
