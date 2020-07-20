import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import { Redirect, Link } from 'react-router-dom'
import { read, update, updateUser } from './apiUser'


const Profile = (props) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    })

    const {token} = isAuthenticated()
    const {name, email, password, error, success } = values

    const init = (userId) => {
        read(userId, token)
        .then(data => {
            if(data.error) {
                setValues({...values, error: true})
            } else {
                setValues({...values, name: data.name, email: data.email})
            }
        })
    }

    useEffect(() => {
        // to get the userID from the url. props contains the info about URL, since we are using <Link> from react-router-dom
        init(props.match.params.userId)
    }, [])

    const handleChange = name => (e) => {
        setValues({...values, error: false, [name]: e.target.value})
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        update(props.match.params.userId, token, {name, email, password})
        .then( data => {
            if(data.error) {
                console.log(data.error)
            } else {
                updateUser(data, () => {
                    setValues({...values, name: data.name, email: data.email, success: true})
                })
            }
        })
    }

    const redirectUser = (success) => {
        if(success) {
            return <Redirect to='/cart'/>
        }
    }
    const profileUpdate = (name, email, password) => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input className="form-control" value={name} type="text" onChange={handleChange('name')}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input className="form-control" value={email} type="text" onChange={handleChange('email')}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input className="form-control" value={password} type="password" onChange={handleChange('password')}/>
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </form>
        )
    }

    return(
        <Layout title="Profile" description="update your profile." className="container-fluid">
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    )
}

export default Profile