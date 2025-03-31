import React from 'react'
import { API_URL } from './utilities/ApiPath.js'

const Welcome = () => {
    const firmName = localStorage.getItem("firmName");
    const firmImage = localStorage.getItem("firmImage");

    // Ensure correct image URL

    return (
        <div className='welcomeSection'>
            <h2>Welcome {firmName}</h2>
            <img src={ `${API_URL}/uploads/${firmImage}`} alt={firmName} />
        </div>
    );
}

export default Welcome;
