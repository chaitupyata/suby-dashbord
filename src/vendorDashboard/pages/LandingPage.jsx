import React, { useEffect } from 'react'
import NavBar from '../components/NavBar.jsx'
import SideBar from '../components/SideBar.jsx'
import Login from '../components/form/Login.jsx'
import { Register } from '../components/form/Register.jsx'
import AddForm from '../components/form/AddForm.jsx'
import AddProduct from '../components/form/AddProduct.jsx'
import { useState } from 'react'
import AllProducts from '../components/AllProducts.jsx'
import Welcome from '../components/Welcome.jsx'

export const LandingPage = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showFirm, setShowFirm] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [showLogOut, setShowLogOut] = useState(false)
    const [showFirmTitle, setShowFirmTitle] = useState(true)


    useEffect(() => {
        const loginToken = localStorage.getItem("loginToken");
        if (loginToken) {
            setShowLogOut(true)
            setShowWelcome(true)
        }
        
    }, [])

    useEffect(() => {
        const firmName = localStorage.getItem('firmName');
        const firmId = localStorage.getItem('firmId')
        if(firmName || firmId ){
            setShowFirmTitle(false)
            setShowWelcome(true)
        }

    }, [])

const logOutHandler =()=>{
    confirm("Are you sure to logout?")
        localStorage.removeItem("loginToken");
        localStorage.removeItem("firmId");
        localStorage.removeItem('firmName');
        setShowLogOut(false)
        setShowFirmTitle(true)
        setShowWelcome(false)

    }

    const showLoginHandler =()=>{
        setShowLogin(true)
        setShowRegister(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)

    }
    const showRegisterHandler = ()=>{
        setShowRegister(true)
        setShowLogin(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
    }
    
    const showFirmHandler = ()=>{
        if (showLogOut) {
        setShowRegister(false)
        setShowLogin(false)
        setShowFirm(true)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
    }else {
        alert("please login")
        setShowLogin(true)
    }
    }

    const showProductHandler = ()=>{
        if (showLogOut) {
        setShowRegister(false)
        setShowLogin(false)
        setShowFirm(false)
        setShowProduct(true)
        setShowWelcome(false)
        setShowAllProducts(false)
    }else {
        alert("please login")
        setShowLogin(true)
    }

    }

    const showWelcomeHandler = ()=>{
        setShowRegister(false)
        setShowLogin(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(true)
        setShowAllProducts(false)
    }

    const showAllProductsHandler = ()=>{
        if(showLogOut){
            setShowRegister(false)
            setShowLogin(false)
            setShowFirm(false)
            setShowProduct(false)
            setShowWelcome(false)
            setShowAllProducts(true)
        
        }else{
            alert("please login")
            setShowLogin(true)
        }
    }

    return (
    <>
    <section className='landingSection'>
    <NavBar showLoginHandler = {showLoginHandler} 
            showRegisterHandler = {showRegisterHandler} 
            showLogOut={showLogOut}
            logOutHandler = {logOutHandler}
            />

    <div className="collectionSection">
        <SideBar 
                showFirmHandler = {showFirmHandler}  
                showProductHandler = {showProductHandler} 
                showAllProductsHandler = {showAllProductsHandler}
                showFirmTitle = {showFirmTitle}
        />

        {showFirm  && showLogOut && <AddForm />}
        {showProduct && showLogOut &&<AddProduct />}
        {showWelcome && <Welcome />}
        {showAllProducts && showLogOut && <AllProducts />}
        {showLogin && <Login showWelcomeHandler ={showWelcomeHandler}/>}
        {showRegister && <Register showLoginHandler = {showLoginHandler}/>}

    </div>

    </section>
    </>
    )
}
