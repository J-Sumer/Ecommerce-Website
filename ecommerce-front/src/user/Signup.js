import React, { useState } from 'react';
import Layout from '../core/Layout'
import {signup} from '../auth'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    })

    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false})
        // here we are creating an object , this means { name: name , email: email ...}
        signup({name, email, password}).then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error, success: false})
            }else{
                setValues({...values, name:'', email:'', password:'',error:'',success:true})
            }
        })
    }

    

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const showError= () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess= () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New account is created, please <Link to='/signin'>Sign in</Link>
        </div>
    )

    return(
        <Layout title="Sign up" description="Sign up to view awesome page" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup