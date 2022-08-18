import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../App';
import Navbar from './navbar';



function ProductDetails(props) {
    const value = useContext(ProductContext)
    const { id } = useParams();
    const [idData, setidData] = useState()
    const [brandData, setBrandData] = useState();
    const [colorData, setColorData] = useState();
    const [catData, setCatData] = useState();
    const [modalData, setmodalData] = useState()


    useEffect(async () => {
        // if (!value.FilterProducts) {
        window.scrollTo({ top: 0 })
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/product/${id}`)
            .then((res) => {
                setidData(res.data.products[0])
                console.log(res.data.products[0]);
                axiosCalls(res.data.products[0])
            })
            .catch((err) => {
                console.log(err);
            })


        console.log(idData);


    }, [id])

    const axiosCalls = (productData) => {
        //CATEGORY
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/categories?cat=${productData.CATEGORY}`)
            .then((res) => {
                // console.log(res.data.products);
                setCatData(res.data.products.filter((e) => { return e.PRODUCT_ID != productData.PRODUCT_ID }));
            })
            .catch((err) => {
                console.log(err);
            })

        //CATGEORY + BRAND
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/categories?cat=${productData.CATEGORY}&brand=${productData.BRAND}`)
            .then((res) => {
                // console.log(res.data.products);
                setBrandData(res.data.products.filter((e) => { return e.PRODUCT_ID != productData.PRODUCT_ID }));
            })
            .catch((err) => {
                console.log(err);
            })

        //CATGEORY + COLOR
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/categories?cat=${productData.CATEGORY}&color=${productData.COLOR}`)
            .then((res) => {
                // console.log(res.data.products);
                setColorData(res.data.products.filter((e) => { return e.PRODUCT_ID != productData.PRODUCT_ID }));
            })
            .catch((err) => {
                console.log(err);
            })


    }


    return (
        <div>
            <Navbar />
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

                                                <button className="btn bag-button mt-5">ADD TO BAG</button>

                                                <Link to={`/productDetails/${modalData.PRODUCT_ID}`}><button className="btn product-button mt-4" data-bs-dismiss="modal">PRODUCT DETAILS</button> </Link>
                                            </div></> : null}

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <div className="container">
                <div className="row vh-90 align-items-center">
                    {idData ?
                        <>
                            <div className="col-md-4 offset-md-1 col-sm-6 py-3">
                                <img className="img-fluid modal-image" src={idData.IMAGE} alt={idData.NAME} />
                            </div>
                            <div className="col-md-6 col-sm-6 offset-md-1 text-center">
                                <h3>{idData.BRAND}</h3>
                                <p>{value.extractData(idData).desc}</p>
                                <h5>Rs. {idData.PRICE}</h5>
                                <p className="mt-5"> Select size</p>
                                <div>
                                    <button className="btn btn-secondary rounded-circle size-button">S</button>
                                    <button className="btn btn-secondary rounded-circle size-button">M</button>
                                    <button className="btn btn-secondary rounded-circle size-button">L</button>
                                    <button className="btn btn-secondary rounded-circle size-button">XL</button>
                                </div>

                                <button className="btn bag-button mt-5" >REMOVE FROM CART </button>

                                <button className="btn bag-button mt-4" >WISHLISTED ITEM</button>
                               

                            </div></> : null}

                </div>

            </div>


        </div>
    )
}

export default ProductDetails
