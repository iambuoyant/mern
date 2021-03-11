import {CREATE_STATION} from '../constants/createStation'
import {Action} from '../../types/reduxTypes'


const currentDataInitialState = {
    data: null,
    error: null 
}

const createStationReducer = (state=currentDataInitialState,action: Action) =>{

    switch (action.type) {
        case CREATE_STATION.SUCCESS:
            return{
                ...state,
                data: action.payLoad,
                error:null
            }
        case CREATE_STATION.FAILURE:
            return{
                ...state,
                data: null,
                error:action.payLoad,
            }
        default: return state
    }
}

export {
 createStationReducer
}