import React, {useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // destructure user and token from local storage

    const { user, token } = isAuthenticated();

    const handleChange = (event) => {
        setError('')
        setName(event.target.value)        
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setError('')
        setSuccess(false)
        // make API request to add category

         // here name is in {} because we have to send an strigified object to request 
        createCategory(user._id, token, {name})
            .then(data => {
                if(data.error) {
                    setError(true)
                } else {
                    setError('')
                    setSuccess(true)
                }
            })
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
            </div>
            <button className="btn btn-outline-primary">
                Create Category
            </button>
        </form>
    )

    const showSuccess = () => {
        if(success) {
            return (
                <h3 className="text-success"> {name} is created</h3>
            )
        }
    }
    const showError = () => {
        if(error) {
            return (
                <h3 className="text-danger"> Category should be unique</h3>
            )
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to='/admin/dashboard' className="text-warning">Back to dashboard</Link>
        </div>
    )

    return (
        <Layout title="Add a new category" description={`Good day ${user.name}, ready to add a new category`} className="container mb-5">
            <div className="row">
                <div className="col-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>            
        </Layout>
    )
}

export default AddCategory