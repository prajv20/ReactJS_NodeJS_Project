import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const MoviePage = () => {
    useEffect(() => {
        axios.get('http://localhost:8080/dashboard', {
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    }, []); // The empty dependency array means this effect runs once when the component mounts

    return (
        <><div>MoviePage</div><div><Link to='/dashboard'>Dashboard</Link></div></>
        )
}
