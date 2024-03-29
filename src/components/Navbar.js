import React from 'react'
import { Link, useLocation } from 'react-router-dom'


// Navbar: defines the navbar component
export default function Navbar(props) {
    const location = useLocation();
    const {title} = props;


    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="/">{title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname==="/")? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname==="/about")? "active": ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        {!localStorage.getItem("token")?  
                            <div>
                                <Link className="btn btn-secondary mx-1" to="/login" role="button">Login</Link> 
                                <Link className="btn btn-secondary mx-1" to="/signup" role="button">Signup</Link>
                            </div> 
                        :
                            <Link className="btn btn-secondary mx-1" to="/login" role="button" onClick={handleLogout}>Logout</Link> 
                        }
                        
                    </form>
                </div>
            </div>
        </nav>
    )
}
