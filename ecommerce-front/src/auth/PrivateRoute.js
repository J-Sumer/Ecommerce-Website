import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticated} from './index'

// const PrivateRoute = ({ component: Component, ...rest}) => {
//     <Route {...rest} render={ props => isAuthenticated() ? (
//         <Component { ...props}/>
//     ) : (
//         <Redirect to={{pathname: '/signin', state:{from: props.location}}}/>
//     ) } />
// }

// ! important --> if from a fucntio we are returning JSX then it should be inside return (// here) or donot put {}, instead put ()
// we should put in () , only only if we are retuning JSX. If we are doing anything inside that funciton we have to put in {} and return JSX using return()


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
