import React, { useState } from 'react';
import axios from "axios";
import './RegisterPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';

export const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
        const navigate = useNavigate();

    const [errors, setErrors] = useState({ })
    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(Validation(values));
        if( errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8080/loginpage', values, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            .then(res => {
               if(res.data.token){
                localStorage.setItem("token", JSON.stringify(res.data.token));
                navigate('/dashboard');
                console.log('values', values);
                console.log('token',res.data.token);

               }else{
                alert("No record");
               }
               
                
            })
            .catch(err => console.log(err))
            .then(() =>{
                setLoading(false);
            });
        } else {
            setLoading(false)
        }
    }
    return (
        <div className='container'>
            <div className='header_container'>
                <div className='text'>Login</div>
                <div className='underline'></div>
                <form className="login-form" action='' onSubmit={handleSubmit}>
                    <div className='inputs-form'>

                        <div className='error_class'>
                            <div className='input_text'>
                            <FontAwesomeIcon icon={faUser} />
                            <input  onChange={handleInput} type="email" placeholder="Enter Email" id="email" name="email" />
                           </div> 
                           {errors.email && <span>*{errors.email}</span>}
                        </div>
                        <div className='error_class'>
                        <div className='input_text'>
                            <FontAwesomeIcon icon={faLock} />
                            <input  onChange={handleInput} type="password" placeholder="Enter Password" id="password" name="password" />
                        </div>
                        {errors.password && <span>*{errors.password}</span>}
                        </div>
                        <span className='loginclass'>Forgot password?</span>
                        <div className="submit-container">
                            <button type='submit' className="submit"  disabled={loading}>
                            {loading ? "Submitting..." : "Login"}
                            </button>
                        </div>

                    </div>

                </form>
                <div className="forgot-password">

                    <Link to='/registerpage' className="link-btn" >Don't have an account?<span className='loginclass'> Register here.</span></Link>

                </div>

            </div>

        </div>
    )
}
