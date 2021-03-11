import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import {Routes} from './views/Routes/Routes'
import {configureStore} from './reudx/store'

const store = configureStore()

const App = () =>{
  return(
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}

export default App ;