import React, { useState } from 'react'
import { API_URL } from '../utilities/ApiPath.js'
import { ThreeCircles } from 'react-loader-spinner';

function Login({showWelcomeHandler}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false); 
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const loginHandler = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${API_URL}/vendor/login`, 
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email, password})
                })
                
                const data  = await response.json();
                
                
                    // token also comes in above data
                if (response.ok) {
                    alert("Login success")
                    setEmail("");
                    setPassword("");
                    localStorage.setItem("loginToken", data.jwtToken)
                    showWelcomeHandler()
                }

                console.log("login data ***", data )
                
                const vendorId = data.vendorId

                console.log("checking for VendorId : ",vendorId)


                const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
                window.location.reload()

                const vendorData = await vendorResponse?.json();


                console.log("vendorData ====", vendorData);
                
                // localhost:4000/vendor/single-vendor/67c4303e1c8393aee1b8d6c0
                if (vendorResponse.ok) {

                    const vendorFirmId = vendorData.vendorFirmId;
                    
                    const vendorFirmName = vendorData.vendor.firm[0].firmName;

                    localStorage.setItem("firmName", vendorFirmName)
                    localStorage.setItem("firmId", vendorFirmId)
                }
        } catch (error) {
            console.error(error);
            console.log("LOGIN FAILED...", error);

        }finally {
            setLoading(false);
        }

    }

return (
    <div className="loginSection">

    {loading && 
        <div className='loaderSection'>
            <ThreeCircles
                visible= {loading}
                height={100}
                width={100}
                color='#4fa94d'
                ariaLabel='three-circles-loading'
                wrapperClass=""
                wrapperStyle={{}}
            />
            <p>Login in process... please wait</p>

        </div>}

    {!loading && 
        <form  className='authForm' onSubmit={loginHandler} autoComplete='off'>
        <h3>Vendor Login</h3>

            <label className='label'>Email</label> 
            <input 
                type="text"
                placeholder='Enter your email...'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}

            />   <br />

            <label className='label'>Password</label> 
            <input 
                type={showPassword ? "text": "password" }
                placeholder='Enter your password...'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}

            /> <br />
            <span 
                className='showPassword'
                onClick={handleShowPassword}
            >
                {showPassword ? "Hide" : "Show"} 
            </span>

            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>}
    </div>

)
}

export default Login