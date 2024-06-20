import React, { useEffect, useState, useRef } from 'react';
import '../styles/projects.css';
import image from '../img/slide1.png';
import image2 from '../img/slide2.png';
import image3 from '../img/slide3.png';
import image4 from '../img/slide4.png';
import image5 from '../img/slide5.png';

const Carousel = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const carouselRef = useRef(null);
    const autoScrollIntervalRef = useRef(null);

    useEffect(() => {
        const carousel = carouselRef.current;
        const firstCardWidth = carousel.querySelector('.card').offsetWidth;
        const cards = carousel.querySelectorAll('.card');

        // Clone first and last few cards to create infinite loop illusion
        const firstFewCards = Array.from(cards).slice(0, 3);
        const lastFewCards = Array.from(cards).slice(-3);

        lastFewCards.forEach(card => {
            carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
        });

        firstFewCards.forEach(card => {
            carousel.insertAdjacentHTML('beforeend', card.outerHTML);
        });

        const startAutoScroll = () => {
            if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
            autoScrollIntervalRef.current = setInterval(() => {
                if (!isDragging) {
                    carousel.scrollLeft += firstCardWidth;
                }
            }, 5000); // Change slide every 3 seconds
        };

        startAutoScroll();

        const dragStart = (e) => {
            setIsDragging(true);
            setStartX(e.pageX || e.touches[0].pageX);
            setStartScrollLeft(carousel.scrollLeft);
            if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current); // Stop auto scroll while dragging
        };

        const dragging = (e) => {
            if (!isDragging) return;
            const x = e.pageX || e.touches[0].pageX;
            carousel.scrollLeft = startScrollLeft - (x - startX);
        };

        const dragStop = () => {
            setIsDragging(false);
            startAutoScroll(); // Restart auto scroll after dragging
        };

        const infiniteScroll = () => {
            if (carousel.scrollLeft === 0) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
                carousel.classList.remove("no-transition");
            } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.offsetWidth;
                carousel.classList.remove("no-transition");
            }
        };

        carousel.addEventListener('mousedown', dragStart);
        carousel.addEventListener('mousemove', dragging);
        document.addEventListener('mouseup', dragStop);
        carousel.addEventListener('touchstart', dragStart);
        carousel.addEventListener('touchmove', dragging);
        document.addEventListener('touchend', dragStop);
        carousel.addEventListener('scroll', infiniteScroll);

        return () => {
            carousel.removeEventListener('mousedown', dragStart);
            carousel.removeEventListener('mousemove', dragging);
            document.removeEventListener('mouseup', dragStop);
            carousel.removeEventListener('touchstart', dragStart);
            carousel.removeEventListener('touchmove', dragging);
            document.removeEventListener('touchend', dragStop);
            carousel.removeEventListener('scroll', infiniteScroll);
            if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
        };
    }, [isDragging]);

    return (
        <div className="wrapper">
            <i id="left" className="fa-solid fa-angle-left" onClick={() => (carouselRef.current.scrollLeft -= carouselRef.current.querySelector('.card').offsetWidth)}></i>
            <ul className="carousel" ref={carouselRef}>
                <li className="card">
                    <div className="img"><img src={image} alt="slide1" className="slide1" draggable="false" /></div>
                </li>
                <li className="card">
                    <div className="img"><img src={image2} alt="slide2" className="slide2" draggable="false" /></div>
                </li>
                <li className="card">
                    <div className="img"><img src={image3} alt="slide3" className="slide3" draggable="false" /></div>
                </li>
                <li className="card">
                    <div className="img"><img src={image4} alt="slide4" className="slide4" draggable="false" /></div>
                </li>
                <li className="card">
                    <div className="img"><img src={image5} alt="slide5" className="slide5" draggable="false" /></div>
                </li>
            </ul>
            <i id="right" className="fa-solid fa-angle-right" onClick={() => (carouselRef.current.scrollLeft += carouselRef.current.querySelector('.card').offsetWidth)}></i>
        </div>
    );
};

export default Carousel;
