import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { IoTimeOutline } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';
import { RxQuestionMarkCircled } from 'react-icons/rx';

import './Header.css';

function Header({ workspace_name, handleChangeSearchTerm }) {
    return (
        <>
            <header className="header">
                <div className="left-half-container">
                    <Link to="/" className="link">
                        <div className="container empty-container">
                            <div className="logo-container">
                                <img src="/macks-logo-black.jpg" alt="macks-logo-black" />
                            </div>
                            <span>Macks</span>
                        </div>
                    </Link>
                    <nav className="navigator">
                        <button className="btn-navigation btn-arrow-left">
                            <HiArrowLeft />
                            <div className="hidden-container">
                                <span className="hidden-span">
                                    Este boton no funciona, esta para volver al canal anterior.
                                </span>
                            </div>
                        </button>
                        <button className="btn-navigation btn-arrow-right">
                            <HiArrowRight />
                            <div className="hidden-container ">
                                <span className="hidden-span">
                                    Este boton vuelve a donde estabas si vas para atras, pero no funciona.
                                </span>
                            </div>
                        </button>
                        <button className="btn-navigation btn-watch">
                            <IoTimeOutline className="icon-watch" />
                            <div className="hidden-container">
                                <span className="hidden-span">
                                    Con este boton vas a ver el historial de los canales que estuviste, pero no ahora.
                                </span>
                            </div>
                        </button>
                    </nav>
                </div>
                <div className="right-half-container">
                    <div className="container navigation-container">
                        <div className="search-container">
                            <input
                                className="input search-input"
                                type="text"
                                placeholder={`Buscar en ${workspace_name}`}
                                onChange={handleChangeSearchTerm}
                            />
                            <LuSearch className="search-icon" />
                        </div>
                    </div>
                    <div className="container info-container">
                        <button className="btn-navigation">
                            <RxQuestionMarkCircled className="info-icon" />
                            <div className="hidden-container">
                                <span className="hidden-span">
                                    Este boton no funciona, disculpe las molestias, pronto funcionara, algun dia...
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
