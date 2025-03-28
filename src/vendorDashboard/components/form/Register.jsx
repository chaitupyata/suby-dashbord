import React, { useState } from 'react'
import { API_URL } from '../utilities/ApiPath.js'
import { ThreeCircles } from 'react-loader-spinner'


export const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

// api function

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
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
      setError(data.error)
      console.error("registration failed", error)
      alert("Registration failed")
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className='registerSection'> 
{loading && <div className='loaderSection'>
  <ThreeCircles
    visible={loading}
    height={100}
    width={100}
    color='#4fa94d'
    ariaLabel='three-circles-loading'
    wrapperClass=''
    wrapperStyle={{}}
  />
  <p>Hi, your Registration under process...</p>
  </div>}

{!loading && 
      <form  className='authForm' onSubmit={handleSubmit} autoComplete='off'>
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
            type={showPassword ? "test" : "password"}
            placeholder='Enter your password...'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}

        /> <br />
        <span 
          className='showPassword'
          onClick={handleShowPassword}
          >
            {showPassword ? 'Hide' : "Show"}

        </span>
        <div className="btnSubmit">
            <button type='submit'>Submit</button>
        </div>
    </form>}
    </div>
  );
};
