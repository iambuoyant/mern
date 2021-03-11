import React from 'react'
import { Route, Switch } from "react-router-dom";
import LandingPage from '../views/LandingPage'


export const Routes : React.FC = () =>{
    return(
        <Switch>
            <Route exact path='/' component={LandingPage}/>
        </Switch>
    )
}