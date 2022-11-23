import React, { useEffect } from 'react'
import "./ProductSummary.scss"
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from '../../infoBox/InfoBox';
import { useSelector, useDispatch } from 'react-redux';
import millify from "millify";
import { CALC_STORE_VALUE, selectTotalStoreValue, selectOutOfStock, CALC_OUTOFSTOCK, CALC_CATEGORY, selectCategory } from '../../../redux/features/product/productSlice';

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="fff" />
const productIcon = <BsCart4 size={40} color="fff" />
const categoryIcon = <BiCategory size={40} color="fff" />
const outOfStockIcon = <BsCartX size={40} color="fff" />

const ProductSummary = ({ products }) => {

  const dispatch = useDispatch();

  const totalStoreValue = useSelector(selectTotalStoreValue);

  const outOfStock = useSelector(selectOutOfStock);

  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products))
    dispatch(CALC_OUTOFSTOCK(products))
    dispatch(CALC_CATEGORY(products))
  }, [dispatch, products])
  

  return (
    <div className='product-summary'>
        <h3 className='--mt'>Inventory stats</h3>
        <div className="info-summary">
          <InfoBox icon={productIcon} title={"Total products"} count={products.length} bgColor="card1" />
          <InfoBox icon={earningIcon} title={"Total store value"} count={"₹" + millify(totalStoreValue)} bgColor="card2" />
          <InfoBox icon={outOfStockIcon} title={"Out of stock"} count={outOfStock} bgColor="card3" />
          <InfoBox icon={categoryIcon} title={"All Categories"} count={category.length} bgColor="card4" />
        </div>
    </div>
  )
}

export default ProductSummary