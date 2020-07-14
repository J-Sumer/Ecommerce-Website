import React, {Fragment} from 'react'
import { Link, withRouter} from 'react-router-dom' // using Link instead of <a> will avoid refreshing the whole page
import { signout, isAuthenticated } from '../auth'

const isActive = (history, path) => {
    if(history.location.pathname === path ) {
        return { color : "#1b455d"}
    }else {
        return { color: "#ffffff"}
    }
}

const Menu = ({ history }) => { // here history comes from  props, which comes from React-router-dom, since we have used withRouter in exports
    return (
        <div>
            <ul className="nav nav-tabs ">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Shop</Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>
                )}

                { !isAuthenticated() && (
                    <Fragment >
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                        </li>
                    </Fragment>
                )}
                { isAuthenticated() && (
                    <div>
                        <li className="nav-item">
                            <span className="nav-link" style={{ cursor: 'pointer', color: '#ff229a'}} onClick={() => signout(()=> {
                                history.push('/')
                            })}>Signout</span>
                        </li>
                    </div>
                )}                
            </ul>

        </div>
    )
}


export default withRouter(Menu)