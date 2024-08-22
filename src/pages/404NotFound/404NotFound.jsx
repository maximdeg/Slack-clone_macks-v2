import React from 'react';
import { Link } from 'react-router-dom';

import './404NotFound.css';
import { HeaderHome } from '../../components';
const NotFound = () => {
    return (
        <>
            <HeaderHome />
            <div className="not-found-container">
                <h1>⚠️ Error 404: No encontramos esta ruta 😢</h1>
                <Link to="/" className="not-found-link link">
                    Ir a inicio
                </Link>
                <div className="rotating-logo">
                    <img src="/macks-logo-black.jpg" alt="Macks Logo" />
                </div>
            </div>
        </>
    );
};

export default NotFound;
