import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
    <>

        <div className='errorSection'>
            <h1>404</h1> 
            <div className='not'>Page is Not Found     !</div> 
            <Link to={"/"} className='link'>
                Go back to Home Page...
            </Link>
        </div>

        

    </>
        
    )
}

export default NotFound