import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Footer from './components/footer';
import HomePage from './components/homePage';
import Products from './components/products';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import ProductDetails from './components/productDetails';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import SignUp from './components/signup';
import Login from './components/login'
import Contact from './components/contact';

export const ProductContext = React.createContext()


function App() {
  const [NewProducts, setNewProducts] = useState()
  const [PopularProducts, setPopularProducts] = useState()
  const [FilterProducts, setFilterProducts] = useState()
  const [count, setCount] = useState([1, 2, 3, 4, 5]);
  const [searchValue, setsearchValue] = useState();
  const [userData, setuserData] = useState()
  const [Wishlists, setWishlist] = useState([])
  const [Cart, setCart] = useState([]);
  const [Auth, setAuth] = useState(false);
  const [myToken, setMyToken] = useState(localStorage.getItem('token'));
  const [loading, setloading] = useState(true)


  const search = (searchValue, e) => {
    // e.preventDefault();
    setsearchValue(searchValue);
  }
  const authToken = useCallback(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/verify?token=${myToken}`)
      .then((res) => {
        setuserData(res.data.user);
        setWishlist(res.data.user[0].WISHLIST)
        setCart(res.data.user[0].CART);
        setAuth(true)
        setloading(false)
      })
      .catch((err) => {
        console.log(err);
        setloading(false)
      })
  }, [myToken]);

  const updateToken = (token) => {
    localStorage.setItem('token', token)
    setMyToken(token);
  }

 

  

  useEffect(() => {

    authToken();

  }, [authToken])

  const extractData = (product) => {
    let brand = "";
    let desc = "";
    let rating = product.RATING;
    brand = product.DESCRIPTION_COLOR.split(",")[1];
    let size = product.SIZE;
    let arr = product.DESCRIPTION_COLOR.split(",");
    desc = arr[arr.length - 2].replace("Buy ", "").replace(" Online in India", "").replace(brand.trim(), "").replace(size.split(" ")[0], "").replace(/fit/gi, "").replace("-", "").replace(/\s+/g, ' ');
    return { brand, desc, rating }

  }

  // const setFilterProductData = (data) => {
  //   setFilterProducts(data)
  // }
  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div class="loader1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }
  else {



    return (
      <div className="App min-vh-100">
        
        <ProductContext.Provider value={{ updateToken: updateToken, search: search, searchValue: searchValue, count: count, newProducts: NewProducts, popularProducts: PopularProducts, extractData: extractData,  FilterProducts: FilterProducts, authToken: authToken, userData: userData, Auth: Auth }}>

          <Router>

            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/product" exact component={Products} />
              <Route path="/product/:popular" exact component={Products} />
              <Route path="/productDetails/:id" exact component={ProductDetails} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/login" exact component={Login} />
              <Route path="/contact" exact component={Contact} />

              
              
            </Switch>
          </Router>
        </ProductContext.Provider>
        <Footer />
      </div>
    );
  }
}

export default App;
