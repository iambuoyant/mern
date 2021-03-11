import { combineReducers } from 'redux'
import {createStationReducer} from './createStation'


export const rootReducer = (asyncReducers:any) => combineReducers(
    {
        createStationReducer,
        ...asyncReducers
    }
) 