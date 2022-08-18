import React from 'react';
import Footer from './footer';
import Navbar from './navbar';

const Contact = ()=>
{
    return(
        <>
         <Navbar/>
          <div className='container'>
                <div className='d-flex flex-column align-items-center mt-5'>
                    <h3>Contact </h3>
                    <p>For any queries, please reach out to us.</p>
                    <form>
                        <label>Email address:</label>
                        <input className="w-75 mt-3 ms-4" type='text' placeholder='Enter your email address'/>
                        <label>Your message:</label>
                        <textarea className="w-75 mt-3 ms-4"  placeholder='Enter your query'/>

                        <div className='text-center mt-5'>
                            <button type="button" className='btn btn-success w-50'>Send</button>
                        </div>

                    </form>
                </div>
          </div>
        </>
    )
}

export default Contact;