import React from 'react'
import { API_URL } from './utilities/ApiPath.js'

const Welcome = () => {
    const firmName = localStorage.getItem("firmName");
    const firmImage = localStorage.getItem("firmImage");

    // Ensure correct image URL
    const imageSrc = firmImage?.startsWith("http") ? firmImage : `${API_URL}/uploads/${firmImage}`;

    return (
        <div className='welcomeSection'>
            <h2>Welcome {firmName}</h2>
            {firmImage && <img src={imageSrc} alt={firmName} />}
        </div>
    );
}

export default Welcome;
