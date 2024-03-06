import React, { useState, useEffect } from "react";
import './RegisterPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Validation from './RegisterValidation';
import axios from "axios";

export const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            setLoading(true);
            axios.post('http://localhost:8080/registerpage', values, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
                .then(res => {
                    if(res.data.token){
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    localStorage.setItem("result", JSON.stringify(res.data.result));
                    navigate('/');
                    console.log('values', values);
                    console.log('token',res.data.token);
                    }
                
            })
                .catch(err => {
                    console.error("error", err);
                    alert("An error occurred during registration.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [errors, values, navigate]);
  
        const handleSubmit = (e) => {
                e.preventDefault();
                setErrors(Validation(values));
            }
    return (
        <div className='container'>
            <div className='header_container'>
                <div className='text'>Register</div>
                <div className='underline'></div>
                <form className="login-form" action='' onSubmit={handleSubmit}>
                    <div className='inputs-form'>
                        <div className='error_class'>
                            <div className='input_text'>
                                <FontAwesomeIcon icon={faUser} />
                                <input name="name" onChange={handleInput} id="name" placeholder="Enter Full Name" />
                            </div>
                            {errors.name && <span>*{errors.name}</span>}
                            
                        </div>
                        <div className='error_class'>
                            <div className='input_text'>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <input onChange={handleInput} type="email" placeholder="Enter Email" id="email" name="email" />
                            </div>
                            {errors.email && <span>*{errors.email}</span>}
                        </div>
                        <div className='error_class'>
                            <div className='input_text'>
                                <FontAwesomeIcon icon={faLock} />
                                <input onChange={handleInput} type="password" placeholder="Enter Password" id="password" name="password" />
                            </div>
                            {errors.password && <span>*{errors.password}</span>}
                        </div>
                        {/* <div className='error_class'>
                            <div className='input_text'>
                                <FontAwesomeIcon icon={faLock} />
                                <input onChange={handleInput} type="password" placeholder="Confirm Password" id="password" name="password" />
                            </div>
                            {errors.password && <span>*{errors.password}</span>}
                        </div> */}


                        <div className="submit-container">
                            <button type="submit" className="submit" disabled={loading}>
                                {loading ? "Submitting..." : "Register"}
                            </button>
                        </div>
                    </div>

                </form>
                <div className="forgot-password">
                    <Link to='/' className="link-btn">Already have an account? <span className="loginclass">Login here.</span> </Link>
                </div>
            </div >
        </div >
    )
}





