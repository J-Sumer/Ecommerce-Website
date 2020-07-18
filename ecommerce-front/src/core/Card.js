import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Image from './ShowImage'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem, updateItem, removeItem} from './cartHelpers'

const Card = ({product, 
                showViewProductButton = true,
                showAddToCartButton = true, 
                cartUpdate=false,
                setRun = f => f, // default value of function
                run = undefined,
                showRemoveProductButton = false
            }) => {
                    
// video no 105, changed some logic here. If any issue comes up change it

    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const showViewButton = () => {
        if(showViewProductButton) {
            return(
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 btn-sm">
                        View Product
                    </button>
                </Link>
            )
        }
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart"/>
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return showAddToCartButton && (
            <button  onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 btn-sm ml-1">
                Add to Cart
            </button>
        )
    }

    const showStock = (qty) => {
        return qty>0 ? <span className="badge badge-success badge-pill">In stock</span> : <span className="badge badge-warning badge-pill">Out of stock</span>
    }

    // whenever we are calling function in onChange/onSubmit we can have higher order function containing event
    // or in function we can have it as a function instead of method 
    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
          showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
              }}
              className="btn btn-outline-danger mt-2 mb-2"
            >
              Remove Product
            </button>
          )
        );
      };

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
            </div>
        </div>
    }

    
    return (
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product"/>
                    <p className="lead mt-2">{product.description.substring(0, 50)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-5 p-0">
                        Category: {product.category && product.category.name}
                    </p>
                    {/* <p className="black-2">
                        <small>Added {moment(product.createdAt).fromNow()}</small>
                    </p> // to show the how long before this item is added      
                                   */}
                    {showViewButton()}
                    {showAddToCart(showAddToCartButton)}  <br/>
                    {showStock(product.quantity)}     
                    {showCartUpdateOptions(cartUpdate)}             
                    {showRemoveButton(showRemoveProductButton)}             
                </div>
            </div>
    )
}

export default Card