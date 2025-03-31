import React from 'react'
import { API_URL } from './utilities/ApiPath.js'

const Welcome = () => {
    const firmName = localStorage.getItem("firmName");
    const frimId = localStorage.getItem("firmId");
 

  
  return (
    <div className='welcomeSection'>
        <h2>Welcome {firmName}</h2>
      
    </div>
  )
}

export default Welcome