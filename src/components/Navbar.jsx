import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../assets/icons'

const Navbar = () => {
    return (
        <header>
            <div className="nav">
                <div className="logo_container">
                    <img src={logo} alt="" />
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/gdd">GDD</Link>
                        </li>
                        <li>
                            <Link to="/creators">Creators</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar