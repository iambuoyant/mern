import React from 'react'
import { Route, Switch } from "react-router-dom";
import LandingPage from '../LandingPage'


export const Routes : React.FC = () =>{
    return(
        <Switch>
            <Route exact path='/' component={LandingPage}/>
        </Switch>
    )
}