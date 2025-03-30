import React from 'react'
import { API_URL } from './utilities/ApiPath.js'

const Welcome = () => {
    const firmName = localStorage.getItem("firmName")
    const firmImg = localStorage.getItem("img")

    console.log( " *** ",firmImg);
    

  return (
    <div className='welcomeSection'>
        <h2>Welcome {firmName}</h2>
        <div className="landingImage">
          <img src={`${firmImg}`} alt='welcome' />
        </div>
    </div>
  )
}

export default Welcome