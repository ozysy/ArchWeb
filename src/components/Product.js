import React, { useState } from 'react';
import Header from './Header';
import Carousel from './Carousel';
import Filters from './Filters';
import Projects from './projects';
import Footer from './Footer';

const Product = () => {
    const [filter, setFilter] = useState('all');

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <div>
            <Header />
            <Carousel />
            <Filters onFilterChange={handleFilterChange} />
            <Projects filter={filter} />
            <Footer />
        </div>
    );
};

export default Product;
