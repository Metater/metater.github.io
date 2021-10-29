import React from 'react';
import '../css/Navbar.css';
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div className='Navbar' >
        <span><Link to="/">Home</Link></span>
        <span><Link to="/bitcoin">Bitcoin</Link></span>
    </div>
    )
}

export default Navbar