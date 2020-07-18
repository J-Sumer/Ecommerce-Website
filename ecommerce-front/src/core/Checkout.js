import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import { processPayment, getBraintreeClientToken, createOrder } from './apiCore'
import {emptyCart} from './cartHelpers'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react'

// *********************************************

// here in this file  data in State and data coming from getBraintreeClientToken fucntion is ovelapping
// that is they both have same naming convention
// so while setting data (setData()) data coming from getBraintreeClientToken is destructured not the data in state
// therefore that is deleted
const Checkout = ({products, setRun = f=> f, run}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })


    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data1 => {
            if(data1.error){
                setData({...data, error: data1.error})
            } else {
                setData({...data, clientToken: data1.clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const handleAddress = event => {
        setData({...data, address: event.target.value})
    }

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <button className="btn">
                <Link to="/signin">Signin</Link>
            </button>
        )
    }

    const buy = () => {
        setData({...data, loading: true})
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(data1 => {
            nonce = data1.nonce
            // once we have nonce (card type, card#, etc.,) send nonce as 'paymentMethodNonce'
            // and also total to be charged
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal()
            }
            processPayment(userId, token, paymentData)
            .then( response => {

                const createOrderData = {
                    products,
                    transaction_id: response.transaction_id,
                    amount: response.transaction.amount,
                    address: data.address
                }
                
                createOrder(userId, token, createOrderData)
                
                setData({...data, success: response.success})
                // empty the cart
                emptyCart(() => {
                    // after emptying the cart we need to rerender the cart page so that the items will get removed
                    // so to rerender we are updating the state in Cart page
                    setRun(!run); // update parent state
                    console.log('payment successfully and cart emptied')
                    setData({...data, loading: false})
                });
                // create order
            })
            .catch(error => setData({...data, loading: false}))
        }).catch(error => {
            setData({...data, error: error.message})
        })
    }


    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ''})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address</label>
                        <textarea onChange={handleAddress} className="form-control" value={data.address} placeholder="Type your address here.."></textarea>
                    </div>


                    <DropIn options={{
                        authorization: data.clientToken, 
                        paypal: {
                            flow: "vault"
                        }
                        }} 
                        onInstance={(instance) => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-outline btn-success btn-sm btn-block">Pay</button>
                </div>
            ) : null}
        </div>
    )

    const showError = error => (
        <div className="alert alert-danger" style={{display : error ? '' :'none'}}>
            {error}
        </div>
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{display : success ? '' :'none'}}>
            Thanks for shopping with us... Your payment was succesfull
        </div>
    )

    const showLoading = loading => (
        <div className="alert alert-info" style={{position: "absolute", opacity: "0.8", zIndex: "10000000", textAlign: "center" ,width: "100%", height: "100%",display : loading ? '' :'none'}}>
            Loading...
        </div>
    )
    
    return(
        <div style={{position: "relative"}}>
            <h2>Total: ${getTotal()} </h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
}

export default Checkout