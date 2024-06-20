import React from 'react';
import '../styles/main.css';
import image from '../img/main.png';

const MainContent = () => {
    return (
        <main className="main-content">
            <img src={image} alt="Building Image" className="main-image" />
            <p className="main-text">
                Всё началось в тот солнечный день, когда я, прогуливаясь по узким улочкам старого города, наткнулся на заброшенное здание с потрясающей аркой. Меня охватило вдохновение, и я понял: хочу создать нечто, что оживит такие уголки, придаст им новую жизнь. Так родилась идея моей архитектурной мастерской.
            </p>
        </main>
    );
};

export default MainContent;
