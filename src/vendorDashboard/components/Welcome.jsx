import React from 'react'
import { API_URL } from './utilities/ApiPath.js'

const Welcome = () => {
    const firmName = localStorage.getItem("firmName");
    const frimId = localStorage.getItem("firmId");
    const firmImage = localStorage.getItem("firmImage")
  
  return (
    <div className='welcomeSection'>
        <h2>Welcome {firmName}</h2>
        <img src={firmImage} alt={firmName} />
      
    </div>
  )
}

export default Welcome