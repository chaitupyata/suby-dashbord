import React, { useState } from 'react'
import { API_URL } from '../utilities/ApiPath.js'


export const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

// api function

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username, email, password})
        })
        const data = await response.json();
        if (response.ok) {
          console.log('data:', data);
          setEmail("")
          setPassword("")
          setUsername("")
          alert("Vendor registrated Succesfully....");
          showLoginHandler()
        }

    } catch (error) {
      console.error("registration failed", error)
      alert("Registration failed")
    }
  }

  return (
    <div className='registerSection'> 
      <form  className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>

        <label className='label'>Username</label> 
        <input 
            type="text"
            placeholder='Enter your name...'
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}

        />   <br />

        <label className='label'>Email</label> 
        <input 
            type="text"
            placeholder='Enter your email...'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}

        />   <br />

        <label  className='label' >Password</label> 
        <input 
            type="text"
            placeholder='Enter your password...'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}

        /> <br />
        <div className="btnSubmit">
            <button type='submit'>Submit</button>
        </div>
    </form></div>
  )
}
