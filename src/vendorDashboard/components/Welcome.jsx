import React from 'react'
import { API_URL } from './utilities/ApiPath.js'

const Welcome = () => {
    const firmName = localStorage.getItem("firmName")

  return (
    <div className='welcomeSection'>
        <h2>Welcome {firmName}</h2>
        <div className="landingImage">
          <img src={`${API_URL}/`} alt='welcome' />
        </div>
    </div>
  )
}

export default Welcome