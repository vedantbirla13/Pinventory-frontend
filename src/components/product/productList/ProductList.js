import React, { useEffect, useState } from 'react'
import "./ProductList.scss"
import SpinnerImg from "../../loader/Loader"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from '../../search/Search';
import { useSelector, useDispatch } from 'react-redux'
import { selectFilteredProducts } from '../../../redux/features/product/filterSlice'
import { FILTER_PRODUCTS } from '../../../redux/features/product/filterSlice';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteProduct, getAllProducts } from '../../../redux/features/product/productSlice';


const ProductList = ({ products, isLoading }) => {

    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectFilteredProducts)

    const [search, setSearch] = useState("")

    const shortenText = (text, n) => {
        if(text.length > n) {
            const shortText = text.substring(0, n).concat("...")
            return shortText
        }
        return text;
    }

    // Delete product
    const delProduct = async(id) => {
        await dispatch(deleteProduct(id))
        await dispatch(getAllProducts())
    }

    // Alert for dlete product
    const confirmDelete = (id) => {
        confirmAlert({
            title: "Delete Product",
            message: 'Are you sure you want to delete product.',
            buttons: [
              {
                label: 'Delete',
                onClick: () => delProduct(id)
              },
              {
                label: 'Cancel',
              }
            ]
          });
    }

    // Begin Pagination
    const [currentItems, setCurrentItems] = useState([])
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setpageCount] = useState(0);
    const itemsPerPage = 5

    useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setpageCount(Math.ceil(filteredProducts.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, filteredProducts])
    
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
      setItemOffset(newOffset);
    }
    // End pagination

    
    useEffect(() => {
        dispatch(FILTER_PRODUCTS({ products, search }))
    }, [products, search, dispatch])
    

  return (
    <div className='product-list'>
        <hr />
        <div className="table">
            <div className="--flex-between --flex-dir-column">
                <span>
                    <h3>Inventory Items</h3>
                </span>

                <span>
                    <Search value={search} onChange={(e) => setSearch(e.target.value) } />
                </span>
            </div>

            {isLoading && <SpinnerImg />}

            <div className="table">
                { !isLoading && products.length === 0 ? (
                    <p>No Products found, Please add a product...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Value</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                currentItems.map((product, index) => {
                                    // console.log(product);
                                    const { _id, name, category, price, quantity }  = product
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {
                                                    shortenText(name ,16)
                                                }
                                            </td>
                                            <td>{category}</td>
                                            <td>{"₹"}{price}</td>
                                            <td>{quantity}</td>
                                            <td>{"₹"}{ price * quantity }</td>
                                            <td className='icons'>
                                                <span>
                                                    <Link to={`/product-details/${_id}`}>
                                                        <AiOutlineEye size={22} color={"purple"}/>
                                                    </Link>
                                                </span>
                                                <span>
                                                    <Link to={`/edit-product/${_id}`}>
                                                         <FaEdit size={20} color={"green"}/>
                                                    </Link>
                                                </span>
                                                <span>
                                                    <FaTrashAlt size={17} color={"red"} onClick={() => confirmDelete(_id) }/>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) }
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="activePage"
            />
        </div>
    </div>
  )
}

export default ProductList