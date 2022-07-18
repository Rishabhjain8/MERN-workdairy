import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = (props) => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        props.showMessage("Logged out successfully", "danger");
    }
    let location = useLocation();
    return (
        <>
            <nav className={`navbar navbar-expand-lg bg-${props.mode}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{color: props.mode === 'dark'?'white':'black'}}>Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{backgroundColor: props.mode === 'dark'?'white':'transparent'}}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} style={{color: props.mode === 'dark'?'white':'black'}} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} style={{color: props.mode === 'dark'?'white':'black'}} to="/about">About</Link>
                            </li>
                        </ul>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.onToggleMode} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ color: props.mode === 'light' ? 'black' : 'white' , paddingRight: '8px'}}>Dark Mode</label>
                        </div>
                        {!localStorage.getItem('token') ? <form>

                            <Link to='/login' className='mx-2'><button type="button" className="btn btn-primary">Login</button></Link>
                            <Link to='/signup'><button type="button" className="btn btn-primary">SignUp</button></Link>
                        </form> : <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}
