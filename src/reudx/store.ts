import { rootReducer } from './rootReducer'
import { createStore , compose , applyMiddleware } from 'redux'
import thunk from "redux-thunk";


export const configureStore = () =>{
    const thunkMiddleware = [thunk]
    const store = createStore(
        rootReducer,
        applyMiddleware(...thunkMiddleware),
    )
    return store ;
}
