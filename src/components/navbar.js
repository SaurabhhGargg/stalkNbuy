import { PersonCircle, SuitHeart, Cart, Search } from "react-bootstrap-icons";
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { ProductContext } from '../App';
import React, { useContext, useState } from 'react';
import logo from '../Images/logo.png'
import Contact from "./contact";



const Navbar = () => {

    const [searchValue, setsearchValue] = useState();
    const value = useContext(ProductContext)

    const logout = () => {
        localStorage.removeItem('token')
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-navbar sticky-top">
            <div className="container-fluid">
                
                <Link to="/" className="navbar-brand"><div className="d-flex flex-column text-center"><span className="logo">Stalk&Buy</span>
                
                <span className="logo1 lead font-monospace ">FASHION FORWARD</span>
                    </div>
                    </Link>

                <div className="navbar-text float-end">
                    <form className="d-flex align-items-center pe-2" >
                        <div className="input-group me-5">
                            <input className="form-control" type="search" placeholder="Search for products, brands and more" aria-label="Search" onChange={(e) => setsearchValue(e.target.value)} />
                            <Link to="/product/search"><button className="btn bg-btn " onClick={e => value.search(searchValue, e)} type="submit"><Search /></button></Link>
                        </div>

                        <div class="dropdown ">

                            <a class=" dropdown-toggle position-relative" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <PersonCircle className="fs-4" />

                                <span class={`position-absolute top-100 start-75 translate-middle ${!value.Auth ? "bg-danger" : "bg-success"} border border-light rounded-circle`}>
                                    <span class="visually-hidden">New alerts</span>
                                </span>
                            </a>
                            <ul class="dropdown-menu shadow" aria-labelledby="dropdownMenuLink">
                                <div className="px-3">
                                    <small> <b>Welcome</b> </small> <br />
                                    {!value.Auth ?
                                        <>
                                            <small>To access account and manage orders</small><br />
                                            <Link to="/login"><button className="btn btn-outline-warning mt-3">Login / SignUp</button></Link>
                                        </>
                                        :
                                        <>
                                            {value.userData ? <p>{value.userData[0].NAME}</p> : null}
                                        </>
                                    }
                                </div><hr />
                                
                                {value.Auth ?
                                    <div className="d-grid">
                                        <button className="btn btn-logout btn-sm mt-3" onClick={logout}>Logout</button>
                                    </div>
                                    : null
                                }
                            </ul>
                        </div>
                        <span className="pe-4"></span>

                        
                        <Link to="/contact" className="position-relative ">
                            Contact us
                        </Link>
                        
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;