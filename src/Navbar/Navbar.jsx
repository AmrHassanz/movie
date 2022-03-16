import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import $ from 'jquery';

export default function Navbar(props) {

    $(window).scroll(function () {
        let windowScroll = $(window).scrollTop();
        if (windowScroll >= 150) {
            $('.navbar').addClass('navbar-dark bg-dark');
            $('.navbar').removeClass('navbar-light bg-light');
        }
        else {
            $('.navbar').removeClass('navbar-dark bg-dark');
            $('.navbar').addClass('navbar-light bg-light');
        };
    });
    $('.nav-link').click(function (e) {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container">
                    <a className="navbar-brand fw-bold fs-3 text-danger me-5">Movies</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {props.userData ? <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to='movie'>Movie</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='tvshow'>Tv Show</Link>
                                </li>
                            </> : ''}
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {props.userData ? <>
                                <li className="nav-item">
                                    <h5 className='nav-link text-dark mb-0'>Hello {props.userData.first_name}</h5>
                                </li>
                                <li className="nav-item ms-5">
                                    <span className="nav-link" onClick={props.logOut}>Log out</span>
                                </li>
                            </> :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='register'>Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='login'>Login</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
