import React, { useState } from 'react'
import { API_URL } from '../utilities/ApiPath.js'

function Login({showWelcomeHandler}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginHandler = async(e) => {
        e.preventDefault()

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
                    alert("Vendor logiedIn successfully... ")
                        // storing the token in local storage
                    localStorage.setItem("loginToken", data.jwtToken)
                    // localStorage.setItem("frimName", )
                    showWelcomeHandler()
                }
                
                const vendorId = data.vendorId
                const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
                const vendorData = await vendorResponse.json();


                console.log("vendorData ====", vendorData);
                
                // localhost:4000/vendor/single-vendor/67c4303e1c8393aee1b8d6c0
                if (vendorResponse.ok) {

                    const vendorFirmId = vendorData.vendorFirmId
                    
                    const vendorFirmName = vendorData.vendor.firm[0].firmName

            
                    localStorage.setItem("firmName", vendorFirmName)
                    localStorage.setItem("firmId", vendorFirmId)
                }
        } catch (error) {
            console.error(error);
            console.log("Error while logging the vendor", error);

        }
        window.location.reload()

    }
return (
    <div className="loginSection">
        <form  className='authForm' onSubmit={loginHandler}>
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
                type="text"
                placeholder='Enter your password...'
                name='email'
                onChange={(e) => setPassword(e.target.value)}
                value={password}

            /> <br />

            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>

)
}

export default Login