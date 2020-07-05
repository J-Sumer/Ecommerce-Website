import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom' // BrowserRouter enables to pass props to other routes as well
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Menu from './core/Menu'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes