import {CREATE_STATION} from '../constants/createStation'
import {Action} from '../../types/actionsInterface'


const createStationInitialState = {
    data: null,
    isLoading:false,
    err: null,
}

export const createStationReducer = (state=createStationInitialState,action:Action) =>{

    switch (action.type) {
        case CREATE_STATION.LOADING:
            return{
                ...state,
                isLoading: true
            }
        case CREATE_STATION.SUCCESS:
            return{
                ...state,
                data: action.payLoad,
                isLoading: false,
                err: null
            }
        case CREATE_STATION.FAILURE:
            return{
                ...state ,
                isLoading: false ,
                err: action.err
            }
        default: return state
    }
}
