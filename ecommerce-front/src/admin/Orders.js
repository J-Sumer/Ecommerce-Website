import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom'
import { listOrders,getStatusValues, updateOrderStatus } from './apiAdmin'
import moment from 'moment'


// **************
// if state is updaated using the second arg in useState, component will rerender
// if we want to run useEffect after some status updates, then we have to pass that state as second argument to the useEffect 

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])

    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setStatusValues(data)
            }
        })
    }

    useEffect(() => {
        loadOrders()
        loadStatusValues()
    }, [])

    const showOrdersLength = () => {
        return orders.length <1 ? <h4>No orders</h4> : <h1>Total Orders: {orders.length}</h1> ;
    }

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly/>
        </div>
    )

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
        .then(data => {
            if(data.error){
                console.log('Status update failed')
            } else {
                // this will load orders again and status will be updated in the screen
                loadOrders()
            }
        })
    }

    const showStatus = (o) => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={(e) => handleStatusChange(e, o._id)}>
                <option>Update Status</option>
                {statusValues.map((status,index) => (
                    <option key={index} value={status}>{status}</option>
                ))}
            </select>
        </div>
    )

    return (
        <Layout title="Orders" description="you can manage all the orders here" className="mb-5">
            <div className="ml-3">
                <div className="">
                    {showOrdersLength()}
                    
                    {orders.map((o, oIndex) => {
                        return (
                            <div className="mt-5" key={oIndex} style={{borderBottom: '2px solid indigo'}}>
                                <h5 className="mb-5">
                                    <span className="bg-primar">
                                        Order ID: {o._id}
                                    </span>
                                </h5>
                                <h5 className="mb-5">
                                    <span className="bg-primar">
                                        {showStatus(o)}
                                    </span>
                                </h5>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        Transaction ID : {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on: {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery Address: {o.address}
                                    </li>
                                </ul>

                                <h4 className="mt-4 mb-4 font-italic">
                                    Total products in order: {o.products.length}
                                </h4>

                                {o.products.map((p, pIndex) => (
                                    <div className="mb-4" key={pIndex} style={{padding: "20px", border: "1px solid indigo"}}>
                                        {showInput('Product name', p.name)}
                                        {showInput('Product price', p.price)}
                                        {showInput('Product qty', p.count)}
                                        {showInput('Product Id', p._id)}
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>            
        </Layout>
    )
}


export default Orders