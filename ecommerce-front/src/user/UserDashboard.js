import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'
import Orders from '../admin/Orders'
import moment from 'moment'

const Dashboard = () => {

    const [history, setHistory] = useState([])

    // isAuthenticated will return the object that contains user information
    // we are destructoring it twice here
    const {user: {_id, name, email, role}} = isAuthenticated()
    const { token } = isAuthenticated()

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setHistory(data)
            }
        })
    }

    useEffect(() => {
        init(_id, token)
    },[])

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/cart" className="nav-link">My cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/profile/${_id}`} className="nav-link">Update profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? 'Admin' : 'Registed user'}</li>
                </ul>
            </div>
        )
    }

    // we have multiple histories and each history contains multiple products
    // therefore we are looping through them twice.
    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>Product price: ${p.price}</h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout title="Dashboard" description={`Good day ${name}`} className="container mb-5">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
            
        </Layout>
    )
}

export default Dashboard