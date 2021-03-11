import { combineReducers } from 'redux'
import {createStationReducer} from '../reudx/reducers/createStation'


export const rootReducer = (asyncReducers:any) => combineReducers(
    {
        createStationReducer,
        ...asyncReducers
    }
) 