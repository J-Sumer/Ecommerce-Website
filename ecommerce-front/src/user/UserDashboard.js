import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom'

const Dashboard = () => {

    // isAuthenticated will return the object that contains user information
    // we are destructoring it twice here
    const {user: {_id, name, email, role}} = isAuthenticated()

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/cart" className="nav-link">My cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/profile/update" className="nav-link">Update profile</Link>
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

    const purchaseHistory = () => {
        return (
            <div className="card">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">history</li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title="Dashboard" description={`Good day ${name}`} className="container mb-5">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
            
        </Layout>
    )
}

export default Dashboard