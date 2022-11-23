import React, { useEffect } from 'react'
import "./ProductDetails.scss"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'; 
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { getProduct } from '../../../redux/features/product/productSlice';
import { SpinnerImg } from '../../loader/Loader';
import DOMpurify from "dompurify"
import Card from '../../card/Card';


const ProductDetails = () => {
    useRedirectLoggedOutUser("/login");
    const  dispatch = useDispatch();

    const { id } = useParams()

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { product, isLoading, isError, message} = useSelector((state) => state.product);

     const stockStatus = (quantity) => {
        if(quantity > 0){
            return <span className='--color-success'>In Stock</span>
        }else {
            return <span className='--color-danger'>Out of Stock</span>
        }
     }

  useEffect(() => {
    if(isLoggedIn === true){
      dispatch(getProduct(id))
    }

    if(isError){
      console.log(message);
    }
  }, [dispatch, isLoggedIn, isError, message, id])

  return (
    <div className='product-detail'>
        <h3 className='--mt'>Product Details</h3>
        <Card cardClass="card">
            { isLoading && <SpinnerImg /> }
            { product && (
                <div className="detail">
                    <Card cardClass="group">
                        { product?.image ? (
                            <img src={product.image.filePath} alt={product.image.fileName} />
                        ) : (
                            <p>No image set for this image.</p>
                        ) }
                    </Card>

                    <h4>Product Availability: {stockStatus(product.quantity)}</h4>
                    <hr />
                    <h4>
                        <span className='badge'>Name:</span> &nbsp; { product.name }
                    </h4>

                    <p>
                        <b>&rarr; SKU: </b> {product.sku}
                    </p>
                    <p>
                        <b>&rarr; Category: </b> {product.category}
                    </p>
                    <p>
                        <b>&rarr; Price: </b> {"₹" + product.price}
                    </p>
                    <p>
                        <b>&rarr; Quantity in stock: </b> {product.quantity}
                    </p>
                    <p>
                        <b>&rarr; Total value in stock: </b> {"₹"}{product.price * product.quantity}
                    </p>
                    <hr />
                    {/* To protect it from malicious scripts */}
                  
                        <p> <b>Description: </b></p>
                    <div dangerouslySetInnerHTML={{
                        __html: DOMpurify.sanitize(product.description)
                    }}></div>
                    <hr />
                    {/* <code className='--color-dark'>Created on: {product.timestamps}</code> */}
                    {/* <code className='--color-dark'>Last updated: {product.updatedAt.toLocaleString("en-US")}</code> */}
                </div>
            ) }
        </Card>
    </div>
  )
}

export default ProductDetails