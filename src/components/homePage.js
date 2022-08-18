import { Link } from 'react-router-dom';
import Navbar from './navbar';

function HomePage(props) {
    

    return (
        <>
            <Navbar />
            
            <div className="container pb-5">
                <div className="text-center headings">
                    <h2>CATEGORIES</h2>
                </div>
                <div className="row">
                    
                    <div className="col">
                        <Link to="/product?category=casual-shirts,formal-shirts"><img src="images/shirts.jpg" className="img-fluid" alt="shirts"></img></Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=Men-Casual-Trousers,Men-Formal-Trousers"><img src="images/trousers.jpg" className="img-fluid" alt="trousers"></img></Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=Jeans"><img src="images/jeans.jpg" className="img-fluid" alt="jeans"></img></Link>
                    </div>
                    
                </div>
                <div className="row">
                    
                    <div className="col">
                        <Link to="/product?category=men-suits"> <img src="images/suits.jpg" className="img-fluid" alt="suits"></img></Link>
                    </div>
                    
                    <div className="col">
                        <Link to="/product?category=track-pants"><img src="images/trackpants.jpg" className="img-fluid" alt="trackpants"></img></Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=T-Shirts"><img src="images/Tshirts.jpg" className="img-fluid" alt="t-shirts"></img></Link>
                    </div>
                </div>
            </div>

            

            
        </>
    )
}

export default HomePage
