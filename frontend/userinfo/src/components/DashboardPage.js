import React, { useState } from 'react'
import './DashboardPage.css';
import { MOVIES } from '../assets/MovieData';
import axios from 'axios';
import { Link} from 'react-router-dom';


export const DashboardPage = () => {
    const title = "Marvel Movies";
    const description = "Explore the Marvel Universe!";
    const [movies] = useState(MOVIES);

    const handleClick = (movie) => {
        axios.get('http://localhost:8080/dashboard', {
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
       
        console.log(movie.poster_url);
        if (movie && movie.poster_url) {
            window.location.href = movie.poster_url;
        } else {
            console.error('Invalid movie data');
        }
    }

    return (

        <><header>
            <div className="marvel-header">
                <nav className="navbar">
                    <div className="logo logotext">{title}</div>
                    <ul className="nav-links">
                        <li>Home</li>
                        <li><Link to='/moviepage' >Movies</Link></li>
                    </ul>
                </nav>
                <p>{description}</p>
            </div>
        </header>
            <main>
                <div className="flex-div">
                    
                        {movies.map((movie, index) => (
                            <div
                                key={index}
                                className="flex-container clickable-div"
                                onClick={() => handleClick(movie)}
                            >

                                <div className="card">
                                    <img src={movie.poster_url} alt={movie.title} />
                                    <h3>{movie.title}</h3>
                                    <p className='para-data'>{movie.release_year}</p>
                                    <p className='para-data'>{movie.genre}</p>
                                    <p className='para-data'>{movie.rating}</p>
                                </div>
                            </div>
                        ))}

                    
                </div>
            </main>
            <footer className="footer">
                <p > &copy; 2024 Movie App. All rights reserved.</p>
            </footer></>
    )
}
