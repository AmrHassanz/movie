import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register(props) {

    let navigate = useNavigate();

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    function getUser(e) {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }
    // Register Form
    async function submitRegister(e) {
        e.preventDefault();
        setIsLoading(true);

        let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signin`, user)
        if (data.message == 'success') {
            localStorage.setItem('userToken' ,data.token)  // user Token
            props.getUserData();                           // user Token
            setIsLoading(false);
            navigate('/movie')
        }
        else {
            setError(data.message);
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className='register'>
                <div className='container d-flex align-items-center justify-content-center h-100'>


                    <form onSubmit={submitRegister} className='rounded-3 border my-5 p-4 bg-light w-75'>
                        <h2 className='text-center mb-4'>Login Form</h2>

                        {error ? <div className='alert alert-danger'>{error}</div> : ''}

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input onChange={getUser} type="email" className="form-control" name="email" id="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onChange={getUser} type="password" className="form-control" name="password" id="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}</button>
                    </form>
                </div>
            </div>
        </>
    )
}
