import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero-img.svg'

const Home = () => {

    return (
        <>
        <div className="hero">
            <div className="hero-left">
                <h1>Buy and Sell.</h1>
                <h1>New and Used.</h1>
                <h1>Safely.</h1>
                <h1>Affordably.</h1>
                <Link to='/listings'>
                    <button className="button-primary">See Listings</button>
                </Link>
            </div>
            <div className="hero-right">
                <img src={heroImg} className="hero-img" />
            </div>
        </div>
        </>
    )
}

export default Home