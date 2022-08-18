import React, { useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { ProductContext } from '../App';
import Navbar from './navbar';



function Products(props) {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const [modalData, setmodalData] = useState()
    let query = useQuery();

    let { popular } = useParams();

    const value = useContext(ProductContext)
    const [data, setData] = useState();
    const [url, setURL] = useState();

    const [color, setColor] = useState([]);
    const [brand, setBrand] = useState([]);
    const [fabric, setFabric] = useState([]);
    const [Size, setSize] = useState([]);
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState([]);


    const [colorA, setColorA] = useState([]);
    const [brandA, setBrandA] = useState([]);
    const [fabricA, setFabricA] = useState([]);
    const [SizeA, setSizeA] = useState([]);
    const [categoryA, setCategoryA] = useState([]);
    const [priceA, setPriceA] = useState([]);

    const [minmaxPrice, setminmaxPrice] = useState([]);


    const [count, setCount] = useState([1, 2, 3, 4, 5]);
    const [currPage, setcurrPage] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const offset = currPage * 50;

    const [sort, setSort] = useState("high")
    let pageCount = Math.ceil(totalProducts / 50);

    useEffect(async () => {
        let categoryU = query.get("category")
        let priceU = query.get("price")
        let fabricU = query.get("fab")
        let colorU = query.get("color")
        let brandU = query.get("brand")
        let sizeU = query.get("size")
        setData()
        setTotalProducts()
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/distinct`)
            .then((result) => {
                setCategoryA(result.data.category);
                setBrandA(result.data.brand);
                setSizeA(result.data.size);
                setFabricA(result.data.fabric);
                // console.log(result.data.brand)
            })
            .catch((e) => {
                console.log(e)
            })

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/categories?cat=${categoryU}&price=${priceU}&size=${sizeU}&brand=${brandU}&color=${colorU}&fab=${fabricU}&offset=${offset}&search=${value.searchValue}&sort=${popular},${sort}`) // backend url, not frontend url
            .then((res) => {
                setData(res.data.products);
                setTotalProducts(res.data.totalProducts);
                value.setFilterProductData(res.data.products)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [url, offset, sort, value.searchValue]);

    const checkColor = (val) => {
        const ind = color.indexOf(val);
        if (ind === -1) {
            color.push(val);
        }
        else {
            color.splice(ind, 1);
        }
    }

   

    const findMinMax = async (array) => {

        let min = array[0].split('-')[0];
        let max = array[0].split('-')[1];

        for (let i = 1; i < array.length; i++) {
            //console.log(array);
            //console.log(i, array[i].split("-")[1],max)
            if (parseInt(array[i].split("-")[0]) < parseInt(min)) {
                min = array[i].split("-")[0]
            }
            if (parseInt(array[i].split("-")[1]) > parseInt(max)) {
                console.log("true");
                max = array[i].split("-")[1];
            }

        }
        console.log("min:", min, "max:", max);
        setminmaxPrice([min, max]);


    }

    const checkBrand = (val) => {
        const ind = brand.indexOf(val);
        if (ind === -1) {
            brand.push(val);
        }
        else {
            brand.splice(ind, 1);
        }
    }




    
    return (
        <div>
            <Navbar></Navbar>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="container-fluid">
                                <div className="row">
                                    {modalData ?

                                        <>

                                            <div className="col-md-4 offset-md-1 col-sm-6">
                                                <img className="img-fluid modal-image" src={modalData.IMAGE} alt={modalData.NAME} />
                                            </div>
                                            <div className="col-md-6 col-sm-6 offset-md-1 text-center mt-5">
                                                <h3>{modalData.BRAND}</h3>
                                                <p>{value.extractData(modalData).desc}</p>
                                                <h5>Rs. {modalData.PRICE}</h5>
                                                <p className="mt-5"> Select size</p>
                                                <div>
                                                    <button className="btn btn-secondary rounded-circle size-button">S</button>
                                                    <button className="btn btn-secondary rounded-circle size-button">M</button>
                                                    <button className="btn btn-secondary rounded-circle size-button">L</button>
                                                    <button className="btn btn-secondary rounded-circle size-button">XL</button>
                                                    {/* <button className="btn btn-secondary rounded-circle size-button">XXL</button> */}
                                                </div>
                                               
                                                <Link to={`/productDetails/${modalData.PRODUCT_ID}`}><button className="btn product-button mt-4" data-bs-dismiss="modal">PRODUCT DETAILS</button> </Link>
                                            </div></> : null}

                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasBottomLabel">All Brands</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body small">
                    <div className="row row-cols-5">
                        {brandA ? brandA.map((brand) => {
                            return (
                                <div className="col" key={brand}>
                                    <div className="form-check ps-">
                                        <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand(brand)} />
                                        <label className="form-check-label" for="flexCheckDefault">
                                            {brand}
                                        </label>
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <h4>
                    Mens Fashion Store
                </h4>
                
            </div>
            <div className="container-fluid">
                <div className="d-flex justify-content-center">


                    <div className="col-md-9">
                        <div className="d-flex justify-content-end pe-5">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle btn-outline-secondary " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort by
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={e => setSort("high")}><a className="dropdown-item" href="#">Price: High to Low</a></li>
                                    <li onClick={e => setSort("low")}><a className="dropdown-item" href="#">Price: Low to High</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="row mt-3 row-cols-4">
                            {data ?
                                data.map((product) => {
                                    let obj = value.extractData(product);
                                    return (
                                        <div className="col mb-4" key={product.PRODUCT_ID}>
                                            <div className="card box-shadow">
                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}>    <img src={product.IMAGE} className="card-img-top" height="280px" width="210px" alt={product.NAME} />
                                                </Link>
                                                <button type="button" className="btn  quick-look " data-bs-toggle="modal" onClick={(e) => setmodalData(product)} data-bs-target="#exampleModal" >
                                                    <strong>Quick Look</strong>
                                                </button>
                                                

                                                <div className="card-body" style={{ height: "120px" }}>
                                                    <div className="card-body-section-one ">
                                                        <b style={{ paddingBottom: "1px" }}>{obj.brand}</b><br />
                                                        <p style={{ fontSize: "12px", paddingBottom: "0.2px" }}>{obj.desc}</p>
                                                    </div>
                                                    <div className="card-body-section-two" style={{ paddingTop: "10px" }}>
                                                        <small className="card-body-section-two">Rs {product.PRICE}</small>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : null}

                        </div>

                        
                    </div>


                </div>
            </div>
        </div>

    )
}

export default Products
