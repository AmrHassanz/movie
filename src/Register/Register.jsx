import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    let navigate = useNavigate();

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    function getUser(e) {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
        // console.log(user)
    }
    // Register Form
    async function submitRegister(e) {
        e.preventDefault();
        setIsLoading(true);

        let validationResult = validateRegisterForm(user);
        if (validationResult.error) {
            setIsLoading(false);
            setErrorList(validationResult.error.details)
        }
        else {
            let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signup`, user)
            console.log(data);
            if (data.message == 'success') {
                setIsLoading(false);
                navigate('/login')
            }
            else {
                setError(data.message);
                setIsLoading(false);
            }
        }
    }
    // Form Validation
    function validateRegisterForm(user) {
        let schema = Joi.object({
            first_name: Joi.string().alphanum().min(3).max(8).required(),
            last_name: Joi.string().alphanum().min(3).max(8).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(/^[a-z0-9]{3,8}$/).required()
        })
        return schema.validate(user, { abortEarly: false })
    }


    return (
        <>
            <div className='register'>
                <div className='container d-flex align-items-center justify-content-center h-100'>


                    <form onSubmit={submitRegister} className='rounded-3 border mt-5 p-2 bg-light w-75'>
                        <h2 className='text-center mb-4'>Register Form</h2>
                        {errorList.map((error, index) => <div key={index} className='alert alert-danger py-0'>{error.message} </div>)}

                        {error ? <div className='alert alert-danger'>{error}</div> : ''}

                        <div className="mb-3">
                            <label htmlFor="first_name" className="form-label">First Name</label>
                            <input onChange={getUser} type="text" className="form-control" name='first_name' id="first_name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last_name" className="form-label">Last Name</label>
                            <input onChange={getUser} type="text" className="form-control" name="last_name" id="last_name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input onChange={getUser} type="email" className="form-control" name="email" id="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onChange={getUser} type="password" className="form-control" name="password" id="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">{isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Register'}</button>
                    </form>
                </div>
            </div>
        </>
    )
}
