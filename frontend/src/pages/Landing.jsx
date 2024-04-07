import React from 'react';
import Login from '/src/components/Login.jsx';
import Lottie from "lottie-react"
import heart from '../assets/animations/heart.json'
import '../index.css'

function Landing() {
  return (
    <div>
      <div className="landing-container">
      <Lottie animationData={heart} style={{ width: 200, height: 200, marginTop: -50, marginBottom: -5}}/>
      <Login />
      </div>
    </div>
  )
}

export default Landing
